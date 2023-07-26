<template>
  <q-page class="">

    <div class="head">
      <Head :title1="homeTitle1" :title2="homeTitle2"/>
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
            <Categories v-on:filtersUpdated="filterCards" />
          </div>
          <div class="age-range-container">
            <AgeRange v-on:ageFiltersUpdated="filterCardsWithAge" />
          </div>
        </div>
        <div class="row justify-center q-pt-lg">
          <div class=" col-xs-0 col-sm-2 col-md-4">
          </div>
          <div class="col-xs-12 col-sm-8 col-md-4 col-search">
            <SearchBar v-on:inputSubmitted="filterInput" />
            <p v-if="organismesTotal > 1" class="flex justify-center">
              {{ organismesTotal }} organismes trouvés,
              {{ organismesNumber.number }} affichés
            </p>
            <p v-else class="flex justify-center">
              {{ organismesTotal }} organisme trouvé,
              {{ organismesNumber.number }} affiché
            </p>
          </div>
          <div class="col-xs-0 col-sm-2 col-md-4">
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
      <Social :title="socialTitle"/>
    </div>

    <div class="footer">
      <Footer :title="footerTitle" :url="footerUrl" :buttonText="footerTexteButton"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'home-page',
};
</script>

<script setup>
import { useMeta, useQuasar } from 'quasar';
import {
  ref,
  onMounted,
  computed,
  reactive,
} from 'vue';
import axios from 'axios';
import Head from 'components/Head.vue';
import Categories from 'components/Categories.vue';
import AgeRange from 'components/AgeRange.vue';
import SearchBar from 'components/SearchBar.vue';
import OrganismeCard from 'components/OrganismeCard.vue';
import Social from 'components/Social.vue';
import Footer from 'components/Footer.vue';
import PaginationCounter from 'src/components/PaginationCounter.vue';
import HelpButton from 'components/HelpButton.vue';

useMeta(() => ({
  title: "GUIDE MAUX D'ENFANTS",
  titleTemplate: (title) => `${title} - Des organismes gratuits pour accompagner vos enfants`,
  // meta tags
  meta: {
    keywords: { name: 'keywords', content: 'ENFANTS GUIDE MAUX HARCELEMENT' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
  },
}));

const $q = useQuasar();

// Currently selectioned and displayed page of Organismes
const current = ref(1);
// Number of organismes per page
const pagination = ref(10);
const SERVER_PATH = 'http://guide-maux-d-enfants.centresrelier.org';
const BASE_URL = ref(`${SERVER_PATH}/api/organismes?populate=*&pagination[pageSize]=${pagination.value}`);

// Text input from SearchBar
const textInput = ref('');

const organismes = ref([]);
// Total number of organismes
const organismesTotal = ref(0);
// Number of organisme on this page, defined by pagination but might be less than that
const organismesNumber = reactive({ number: computed(() => organismes.value.length) });

const homeTitle1 = ref('Le guide Maux d\'enfants mode d\'emploi');
const homeTitle2 = ref('Des organismes gratuits pour accompagner vos enfants');
const socialTitle = ref('Partagez ces résultats avec les réseaux ou encapsulé sur mon site </>');
const footerTitle = ref('Un organisme est manquant ?\n J\'inscris un organisme');
const footerUrl = ref('subscribe');
const footerTexteButton = ref('Inscrire mon organisme');

// show every thematic & age initially
const selectedFilters = ref(['Addiction', 'Violence', 'Discrimination', 'Harcèlement', 'Santé mentale', 'Sexualité']);
const selectedAgeFilters = ref(['Petite enfance', 'Primaire', 'Collège', 'Lycée', 'Jeune adulte']);
// update the following arrays each time an additional filter is created
const ALL_FILTERS = ['Addiction', 'Violence', 'Discrimination', 'Harcèlement', 'Santé mentale', 'Sexualité'];
const ALL_AGE_FILTERS = ['Petite enfance', 'Primaire', 'Collège', 'Lycée', 'Jeune adulte'];

/*
Loads the Organisme's image in the array organismes.
If no image is found for an Organisme, an image is given by default.
*/
function getOrganismesImages(dataOrganismes) {
  for (let i = 0; i < dataOrganismes.data.data.length; i += 1) {
    const found = organismes.value.find((organisme) => organisme.id === dataOrganismes
      .data.data[i].id);
    if (dataOrganismes.data.data[i].attributes.img.data !== null) {
      found.img = `${SERVER_PATH}${dataOrganismes.data.data[i].attributes.img.data.attributes.url}`;
    } else {
      found.img = '/statics/CR_logo-svg.svg';
    }
  }
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
        website: organisme.attributes.website,
        coordinate: organisme.attributes.coordonnees,
        postalCode: organisme.attributes.code_postal.substring(0, 2),
        contact: organisme.attributes.contact,
        email: organisme.attributes.email,
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
    getOrganismesImages(dataOrganismes);
  } catch (error) {
    $q.notify({
      message: 'Erreur lors du chargement des organismes',
      caption: 'Merci de réessayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
  }
};

/*
Update the baseQuery parameter with the selected filters
Returns the URL that can be used to update the global variable organismes
https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
https://docs.strapi.io/dev-docs/api/rest/parameters
*/
function updateQueryWithFilters(baseQuery) {
  let query = baseQuery;
  if (selectedFilters.value.length === 1) {
    query = `${query}&filters[thematiques][thematiques][$contains]=${selectedFilters.value[0]}`;
  }
  if (selectedFilters.value.length > 1
            && selectedFilters.value.length < ALL_FILTERS.length) {
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
  if (textInput.value !== '') {
    query = `${query}&filters[$or][0][commune][$containsi]=${textInput.value}&filters[$or][1][code_postal][$startsWith]=${textInput.value}`;
  }
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
function filterCards(filters) {
  if (filters.length === 0) {
    selectedFilters.value = ALL_FILTERS;
  } else {
    selectedFilters.value = filters;
  }
  refreshData(current.value);
}

// Filters organismes cards according to selected age filters
function filterCardsWithAge(ageFilters) {
  if (ageFilters.length === 0) {
    selectedAgeFilters.value = ALL_AGE_FILTERS;
  } else {
    selectedAgeFilters.value = ageFilters;
  }
  refreshData(current.value);
}

function filterInput(text) {
  textInput.value = text;
  getData(updateQueryWithFilters(`${BASE_URL.value}&pagination[page]=${current.value}`));
}

onMounted(() => {
  getData(BASE_URL.value);
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

@media only screen and (min-device-width : 343px) and (max-device-width : 440px) {
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
