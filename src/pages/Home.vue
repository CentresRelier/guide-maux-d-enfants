<template>
  <q-page class="">

    <div class="head">
      <Head />
    </div>

    <div class="row q-pt-md row-categories">
      <div class="col-xs-0 col-sm-1 col-md-1">
        <div v-if="$q.screen.gt.sm" class="q-pt-xl ellipse-left-home">
          <q-img src="statics/ellipse-home-left.png" height="280" width="124"></q-img>
        </div>
      </div>
      <div class="col-xs-12 col-sm-10 col-md-10">
        <div class="row row-filter">
          <div class="categories-container">
            <Categories :filterCards="filterCards" @reset="refreshData(1)"/>
          </div>
          <div class="age-range-container">
            <AgeRange :filterCardsWithAge="filterCardsWithAge" @reset="refreshData(1)"/>
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class=" col-xs-0 col-sm-2 col-md-4">
          </div>
          <div class="col-xs-8 col-sm-8 col-md-4 col-search">
            <SearchBarAdress :filterInput="filterInput" @reset="refreshData(1)"/>
            <p v-if="organismesTotal > 1" class="flex justify-center">
              {{ organismesTotal }} organismes trouvés
            </p>
            <p v-else class="flex justify-center">
              {{ organismesTotal }} organisme trouvé
            </p>
          </div>
          <div class="col-xs-1 col-sm-2 col-md-4">
            <HelpButton />
          </div>
        </div>
        <div class="row row-card" v-for="organisme in organismes" :key="organisme.id">
          <OrganismeCard :organisme="organisme" />
        </div>
      </div>
      <div class="col-xs-0 col-sm-1 col-md-1">
        <div v-if="$q.screen.gt.sm" class="q-pt-xl ellipse-right-home">
          <q-img src="statics/ellipse-home-right.png" height="280" width="124"></q-img>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-0 col-md-2">
      </div>
      <div class="col-xs-12 col-md-8 pagination-container q-pb-lg q-pt-md">
        <PaginationCounter v-model="current" :organismesTotal="organismesTotal"
                  :pagination="pagination" @click="refreshData(current)"/>
      </div>
      <div class="col-xs-0 col-md-2">
      </div>
    </div>

    <div class="social">
      <Social />
    </div>

    <div class="footer">
      <Footer />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'home-page',
  emits: ['inputSubmitted'],
};
</script>

<script setup>
import { useMeta, useQuasar } from 'quasar';
import {
  ref,
  onMounted,
} from 'vue';
import axios from 'axios';
import Head from 'components/HeadBar.vue';
import Categories from 'components/Categories.vue';
import AgeRange from 'components/AgeRange.vue';
import SearchBarAdress from 'components/SearchBarAdress.vue';
import OrganismeCard from 'components/OrganismeCard.vue';
import Social from 'components/SocialFooter.vue';
import Footer from 'components/FooterBar.vue';
import PaginationCounter from 'src/components/PaginationCounter.vue';
import HelpButton from 'components/HelpButton.vue';
import { useFiltersStore } from 'stores/filterButton';
import { useSearchBarStore } from 'stores/searchBar';
import associationMetaTags from '../utils/associationMetaTags';

// SEO //
const associationDetails = {
  name: 'Centres Relier',
  description: 'Des organismes gratuits pour accompagner vos enfants',
  imageUrl: 'https://guide-maux-d-enfants.centresrelier.org/uploads/CR_logo_6ba168299b.svg',
};
const generateKeywords = () => {
  const associationKeywords = associationMetaTags.join(', ');
  return `${associationKeywords}`;
};
const generateTitle = (baseTitle) => `${baseTitle} - Des organismes gratuits pour accompagner vos enfants`;

useMeta(() => ({
  title: associationDetails.name,
  titleTemplate: (title) => generateTitle(title),
  meta: [
    {
      name: 'description',
      content: associationDetails.description,
    },
    {
      name: 'keywords',
      content: generateKeywords(),
    },
    {
      property: 'og:title',
      content: associationDetails.name,
    },
    {
      property: 'og:description',
      content: associationDetails.description,
    },
    {
      property: 'og:image',
      content: associationDetails.imageUrl,
    },
  ],
}));

const $q = useQuasar();

// Currently selectioned and displayed page of Organismes
const current = ref(1);
// Number of organismes per page
const pagination = ref(10);
const SERVER_PATH = 'https://guide.centresrelier.org/bd';
const BASE_URL = ref(`${SERVER_PATH}/api/organismes?populate=reseau.logo,thematiques,perimetre,ages,img&pagination[pageSize]=${pagination.value}`);

// Text input from SearchBarStore
const finalSearchObject = ref({});

const organismes = ref([]);
// Total number of organismes
const organismesTotal = ref(0);

// show every thematic & age initially
const selectedFilters = ref([]);
const selectedAgeFilters = ref([]);
// update the following arrays each time an additional filter is created
const ALL_FILTERS = ['Addiction', 'Violence', 'Discrimination', 'Harcèlement', 'Santé mentale', 'Sexualité'];
const ALL_AGE_FILTERS = ['Petite enfance', 'Primaire', 'Collège', 'Lycée', 'Jeune adulte'];

const filterStore = useFiltersStore();
const searchStore = useSearchBarStore();
/*
Loads the Organisme's image and description in the array organismes.
If no image or description is found for an Organisme, an image and description is given by default.
*/
function setDefaultImages() {
  organismes.value.forEach((organisme) => {
    const defaultImgName = organisme.imageDefault.data.attributes.name;
    const defaultImgUrl = organisme.imageDefault.data.attributes.url;
    const defaultImgReseau = organisme.imageReseau;

    let final = '';

    if (defaultImgName !== 'no_image.svg') {
      final = defaultImgUrl;
    }
    if (defaultImgName === 'no_image.svg') {
      final = defaultImgReseau;
    }
    organisme.image = final;
  });
}

function setDefaultDescription() {
  organismes.value.forEach((organisme) => {
    if (organisme.description === null) {
      const reseauDescription = organisme.defaultDescription.data.attributes.description;
      organisme.description = reseauDescription;
    }
  });
}

const getData = async (URL) => {
  try {
    const dataOrganismes = await axios.get(URL);
    organismesTotal.value = dataOrganismes.data.meta.pagination.total;
    organismes.value = dataOrganismes.data.data
      .map((organisme) => ({
        ...organisme,
        title: organisme.attributes.nom,
        description: organisme.attributes.description,
        defaultDescription: organisme.attributes.reseau,
        image: '',
        imageDefault: organisme.attributes.img,
        imageReseau: organisme.attributes.reseau.data.attributes.logo.data.attributes.url,
        website: organisme.attributes.website,
        coordinate: organisme.attributes.coordonnees,
        postalCode: organisme.attributes.code_postal,
        commune: organisme.attributes.commune,
        contact: organisme.attributes.contact ? organisme.attributes.contact : '',
        email: organisme.attributes.email ? organisme.attributes.email : '',
        thematique: Object.values(organisme.attributes.thematiques.data.map((thematique) => ({
          ...thematique,
          name: thematique.attributes.thematiques,
        })).reduce((a, b) => ({ ...a, [b.id]: b.name }), {})),
        age: Object.values(organisme.attributes.ages.data.map((age) => ({
          ...age,
          name: age.attributes.age,
        })).reduce((a, b) => ({ ...a, [b.id]: b.name }), {})),
        perimeter: organisme.attributes.perimetre.data?.attributes?.perimetre,
      }));
    setDefaultImages();
    setDefaultDescription();
  } catch (error) {
    $q.notify({
      message: 'Erreur lors du chargement des organismes',
      caption: 'Merci de réessayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
  }
};

function updateQueryWithFilters(baseQuery) {
  let query = baseQuery;
  if (selectedFilters.value.length === 1) {
    query = `${query}&filters[thematiques][thematiques][$contains]=${selectedFilters.value[0]}`;
  }
  if (selectedFilters.value.length > 1 && selectedFilters.value.length <= ALL_FILTERS.length) {
    for (let i = 0; i < selectedFilters.value.length; i += 1) {
      query = `${query}&filters[$and][${i}][thematiques][thematiques][$contains]=${selectedFilters.value[i]}`;
    }
  }
  if (selectedAgeFilters.value.length === 1) {
    query = `${query}&filters[ages][age][$contains]=${selectedAgeFilters.value[0]}`;
  }
  if (selectedAgeFilters.value.length > 1
            && selectedAgeFilters.value.length < ALL_AGE_FILTERS.length) {
    for (let j = 0; j < selectedAgeFilters.value.length; j += 1) {
      query = `${query}&filters[$and][${j}][ages][age][$contains]=${selectedAgeFilters.value[j]}`;
    }
  }
  if (Object.keys(finalSearchObject.value).length !== 0) {
    query += `&filters[$or][0][$and][0][commune][$startsWith]=${finalSearchObject.value.ville}`;
    query += `&filters[$or][0][$and][1][perimetre][id][$eq]=1&filters[$or][1][$and][0][departement][$eq]=${finalSearchObject.value.department}`;
    query += `&filters[$or][1][$and][1][perimetre][id][$eq]=2&filters[$or][2][$and][0][region][$eq]=${finalSearchObject.value.region}`;
    query += '&filters[$or][2][$and][1][perimetre][id][$eq]=3&filters[$or][3][$and][0][perimetre][id][$eq]=4';
    query += '&sort=perimetre.id:ASC';
  }
  // TODO remove after data of backend is ready filter all organisme with no completed data
  query += '&filters[$and][2][$or][0][contact][$null]=false&filters[$and][2][$or][1][email][$null]=false&filters[$and][2][$or][2][coordonnees][$null]=false';
  return query;
}

function refreshData(currentTab) {
  current.value = currentTab;
  getData(updateQueryWithFilters(`${BASE_URL.value}&pagination[page]=${current.value}`));
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

// Filters organismes cards according to selected thematic filters
function filterCards() {
  const selectedThematiqueButtons = filterStore.getSelectedThematiqueButtons;
  if (selectedThematiqueButtons.length === 0) {
    selectedFilters.value = [];
  } else {
    selectedFilters.value = selectedThematiqueButtons;
  }
  refreshData(current.value);
}

// Filters organismes cards according to selected age filters
function filterCardsWithAge() {
  const selectedAgeButtons = filterStore.getSelectedAgeButtons;
  if (selectedAgeButtons.length === 0) {
    selectedAgeFilters.value = [];
  } else {
    selectedAgeFilters.value = selectedAgeButtons;
  }
  refreshData(current.value);
}

function filterInput() {
  const selectedSearch = searchStore.getSearchResult;
  finalSearchObject.value = selectedSearch;
  refreshData(current.value);
}

function checkIfFilterActive() {
  const selectedThematiqueButtons = filterStore.getSelectedThematiqueButtons;
  const selectedAgeButtons = filterStore.getSelectedAgeButtons;
  const selectedSearch = searchStore.getSearchResult;
  // eslint-disable-next-line max-len
  // Correction ligne ci-dessous sinon retourne une erreur
  // if (selectedAgeButtons.length || selectedThematiqueButtons.length !== 0 || selectedSearch !== {}) {
  if (selectedAgeButtons.length || selectedThematiqueButtons.length !== 0 || selectedSearch) {
    filterCardsWithAge();
    filterCards();
    filterInput();
  }
  refreshData(current.value);
}

onMounted(() => {
  checkIfFilterActive();
});
</script>

<style scoped>
.col-search {
  text-align: -webkit-center;
}

.head {
  padding-top: 100px;
  margin-bottom: 25px;
}

.row-filter {
  justify-content: center;
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1383px) {
  .categories-container {
    margin-bottom: 16px;
  }
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1393px) {
  .age-range-container {
    margin-top: 16px;
  }
}

@media only screen and (min-device-width : 440px) and (max-device-width : 768px) {
  .row-filter {
    min-width: 434px;
  }
  .col-search {
    text-align: center;
    text-align: -webkit-center;
  }
  .head {
    margin-bottom: 0;
  }
  .categories-container {
    margin-bottom: 8px;
  }
  .age-range-container {
    align-self: center;
    width: 412px;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 440px) {
  .categories-container {
    max-width: 97vw;
    align-self: center;
    margin-bottom: 16px;
    margin-left: 0;
    margin-right: 0;
  }
  .row-categories {
    padding-top: 0;
  }
  .head {
    margin-bottom: 16px;
  }
}

.ellipse-left-home {
  width: 124px;
  height: 280px;
}

.ellipse-right-home {
  width: 124px;
  height: 280px;
  display: block;
  margin-left: auto;
}

.row-card {
  place-content: center;
}

.pagination-container {
  display: flex;
  place-content: center;
}
</style>
