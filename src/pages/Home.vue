<template>
  <q-page class="">

    <div class="head">
      <Head :title="homeTitle"/>
    </div>

    <div class="row q-pt-md">
      <div class="col-md-2">
        <div class="q-pt-xl ellipse-left-home">
          <q-img src="../assets/ellipse-home-left.png" height="280" width="124"></q-img>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row row-filter">
          <div class="categories-container q-pr-sm">
            <Categories />
          </div>
          <div class="age-range-container">
            <AgeRange />
          </div>
        </div>
        <div class="q-pt-lg">
          <div class="col-md-4">
          </div>
          <div class="col-md-4 col-search">
            <SearchBar />
            {{ organismesNumber.number }} organisme(s) trouvés
          </div>
          <div class="col-md-4">
          </div>
        </div>
        <div class="row row-card" v-for="organisme in organismes" :key="organisme.id">
          <OrganismeCard :organisme="organisme"/>
        </div>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 pagination-container q-pb-lg q-pt-md">
        <q-pagination
          v-model="current"
          class=""
          :max="5"
          :round="true"
          color="light-blue"
        />
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

const $q = useQuasar();

const current = ref(1);
const organismes = ref([]);
const organismesNumber = reactive({ number: computed(() => organismes.value.length) });
const homeTitle = ref('Le guide Maux d\'enfants mode d\'emploi Des organismes gratuits pour accompagner vos enfants');
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

const getData = async () => {
  try {
    const dataOrganismes = await axios.get('http://localhost:1337/api/organismes?populate=*');
    organismes.value = dataOrganismes.data.data.map((organisme) => ({
      ...organisme,
      title: organisme.attributes.nom,
      img: organisme.attributes.img.data[0].attributes.url,
      description: organisme.attributes.description,
      website: organisme.attributes.website,
      coordinate: organisme.attributes.coordonees,
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
      perimeter: Object.values(organisme.attributes.perimeters.data.map((perimeter) => ({
        ...perimeter,
        name: perimeter.attributes.perimetres,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), {})),
    }));
    console.log(organismes.value);
  } catch (error) {
    $q.notify({
      message: 'Erreur lors du chargement des organismes',
      caption: 'Merci de réesayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
  }
};

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
