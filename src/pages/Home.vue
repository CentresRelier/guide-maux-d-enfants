<template>
  <q-page class="">

    <div class="head">
      <Head :title1="homeTitle1" :title2="homeTitle2"/>
    </div>

    <div class="row q-pt-md">
      <div class=" col-sm-0 col-md-2">
        <div v-if="windowWidth > 768" class="q-pt-xl ellipse-left-home">
          <q-img src="statics/ellipse-home-left.png" height="280" width="124"></q-img>
        </div>
      </div>
      <div class="col-sm-12 col-md-8">
        <div class="row row-filter">
          <div class="categories-container q-pr-sm">
            <Categories v-on:filtersUpdated="filterCards" />
          </div>
          <div class="age-range-container">
            <AgeRange v-on:ageFiltersUpdated="filterCardsWithAge" />
          </div>
        </div>
        <div class="q-pt-lg">
          <div class=" col-xs-0 col-sm-0 col-md-4">
          </div>
          <div class="col-xs-12 col-sm-12 col-md-4 col-search">
            <SearchBar v-on:inputSubmitted="filterInput" />
            <p v-if="organismesTotal > 1">
              {{ organismesTotal }} organismes trouvés,
              {{ organismesNumber.number }} affichés
            </p>
            <p v-else>
              {{ organismesTotal }} organisme trouvé,
              {{ organismesNumber.number }} affiché
            </p>
          </div>
          <div class="col-xs-0 col-md-4">
          </div>
        </div>
        <div class="row row-card" v-for="organisme in organismes" :key="organisme.id">
          <OrganismeCard :organisme="organisme" />
        </div>
      </div>
      <div class="col-sm-0 col-md-2">
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
  reactive, onUnmounted,
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

const windowWidth = ref(window.innerWidth);

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
    const dataOrganismes = await axios.get(URL)
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    organismesTotal.value = dataOrganismes.data.meta.pagination.total;
    organismes.value = dataOrganismes.data.data.map((organisme) => ({
      ...organisme,
      title: organisme.attributes.nom,
      description: organisme.attributes.description,
      website: organisme.attributes.website,
      coordinate: organisme.attributes.coordonnees,
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
      caption: 'Merci de réesayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
    console.log(error, error.message);
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
    query = `${query}&filters[$or][0][commune][$containsi]=${textInput.value}&filters[$or][1][code_postal][$eq]=${textInput.value}`;
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

function onWidthChange() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  getData(BASE_URL.value);
  window.addEventListener('resize', onWidthChange);
});

onUnmounted(() => window.removeEventListener('resize', onWidthChange));
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

@media only screen and (min-device-width : 320px) and (max-device-width : 768px) {
  .row-filter {
    justify-content: center;
    flex-direction: column;
    max-width: 432px;
  }
  .col-search {
    text-align: center;
    text-align: -webkit-center;
  }
  .head {
    margin-bottom: 0;
  }
  .categories-container {
    margin-left: 8px;
    margin-bottom: 8px;
  }
  .age-range-container {
    align-self: center;
    width: 416px;
  }
}

.ellipse-left-home {
  width: 124px;
  height: 280px;
}

.row-card {
  place-content: center;
}

.pagination-container {
  display: flex;
  place-content: center;
}
</style>
