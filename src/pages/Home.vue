<template>
  <q-page class="">

    <div class="head">
      <Head :title1="homeTitle1" :title2="homeTitle2"/>
    </div>

    <div class="row q-pt-md">
      <div class="col-md-2">
        <div class="q-pt-xl ellipse-left-home">
          <q-img src="statics/ellipse-home-left.png" height="280" width="124"></q-img>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row row-filter">
          <div class="categories-container q-pr-sm">
            <Categories v-on:filtersUpdated="filterCards" />
          </div>
          <div class="age-range-container">
            <AgeRange v-on:ageFiltersUpdated="filterCardsWithAge" />
          </div>
        </div>
        <div class="q-pt-lg">
          <div class="col-md-4">
          </div>
          <div class="col-md-4 col-search">
            <SearchBar v-on:inputSubmitted="filterInput" />
            <p v-if="organismesFoundNumber > 1">
              {{ organismesFoundNumber }} organismes trouvés,
              {{ organismesNumber.number }} affichés
            </p>
            <p v-else>
              {{ organismesTotal }} organisme trouvé,
              {{ organismesNumber.number }} affiché
            </p>
          </div>
          <div class="col-md-4">
          </div>
        </div>
        <div class="row row-card" v-for="organisme in organismes" :key="organisme.id">
          <OrganismeCard v-if="organisme.thematique.some(r=> selectedFilters.includes(r))
                    && organisme.age.some(r=> selectedAgeFilters.includes(r))"
                    :organisme="organisme" />
          <OrganismeCard v-else class="hidden" :organisme="organisme" />
        </div>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 pagination-container q-pb-lg q-pt-md">
        <PaginationCounter v-model="current" :organismesTotal="organismesTotal"
                  :pagination="pagination" @click="refreshData(current)"/>
      </div>
      <div class="col-md-2">
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
  data() {
    return {
      // show every thematic & age initially
      selectedFilters: ['Addiction', 'Violence', 'Discrimination', 'Harcèlement', 'Santé mentale', 'Sexualité'],
      selectedAgeFilters: ['Petite enfance', 'Primaire', 'Collège', 'Lycée', 'Jeune adulte'],
      // update the following arrays each time an additional filter is created
      ALL_FILTERS: ['Addiction', 'Violence', 'Discrimination', 'Harcèlement', 'Santé mentale', 'Sexualité'],
      ALL_AGE_FILTERS: ['Petite enfance', 'Primaire', 'Collège', 'Lycée', 'Jeune adulte'],
    };
  },
  methods: {
    filterCards(selectedFilters) {
      if (selectedFilters.length === 0) {
        this.selectedFilters = this.ALL_FILTERS;
      } else {
        this.selectedFilters = selectedFilters;
      }
    },
    filterCardsWithAge(selectedAgeFilters) {
      if (selectedAgeFilters.length === 0) {
        this.selectedAgeFilters = this.ALL_AGE_FILTERS;
      } else {
        this.selectedAgeFilters = selectedAgeFilters;
      }
    },
    filterInput(text) {
      console.log(text); // TODO
    },
  },
};
</script>

<script setup>
import { useQuasar } from 'quasar';
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

const $q = useQuasar();
// const $BASEPATH = `http://${window.location.hostname}:1337`;
const SERVER_PATH = 'http://guide-maux-d-enfants.centresrelier.org';

// Currently selectioned and displayed page of Organismes
const current = ref(1);
const organismes = ref([]);
// Total number of organismes
const organismesTotal = ref(0);
// Number of organisme on this page, defined by pagination but might be less than that
const organismesNumber = reactive({ number: computed(() => organismes.value.length) });
// Number of organismes per page
const pagination = ref(10);
const homeTitle1 = ref('Le guide Maux d\'enfants mode d\'emploi');
const homeTitle2 = ref('Des organismes gratuits pour accompagner vos enfants');
const socialTitle = ref('Partagez ces résultats avec les réseaux ou encapsulé sur mon site </>');
const footerTitle = ref('Un organisme est manquant ?\n J\'inscris un organisme');
const footerUrl = ref('subscribe');
const footerTexteButton = ref('Inscrire mon organisme');

// const filterCards = computed({
//   get() {
//     return currentTab.value
//       ? cards.value.filter((card) => card.tag.includes(currentTab.value))
//       : cards.value;
//   },
//   set(val) {
//     currentTab.value = val;
//   },
// });

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
      found.img = '/statics/default-organisme-image.png';
    }
  }
}

const getData = async () => {
  try {
    // const dataOrganismes = await axios.get(`${$BASEPATH}/api/organismes?populate=*`)
    const dataOrganismes = await axios.get(`${SERVER_PATH}/api/organismes?populate=*&pagination[page]=${current.value}&pagination[pageSize]=${pagination.value}`)
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
      perimeter: organisme.attributes.perimetre.data.attributes.perimetre,
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

function refreshData(currentTab) {
  current.value = currentTab;
  getData();
}

onMounted(() => {
  getData();
});

</script>
<style scoped>
.col-search {
  text-align: -webkit-center;
}

.head {
  padding-top: 100px;
}

.row-filter {
  justify-content: center;
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
