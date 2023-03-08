<template>
  <div class="container">

    <div class="head">
      <Head :title="homeTitle"/>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 title">
        <h5 class="page-title">Detail de l’organisme </h5>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row q-mb-sm">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-4 img-container">
            <img class="img" :src="$basePath + organisme.img" />
          </div>
          <div class="col-md-8">
            <div class="col-md-12 q-mb-sm">
              <div class="name q-ml-sm block-container">
                <p class="name-text">{{ organisme.title }}</p>
              </div>
            </div>
            <div class="col-md-12">
              <div class="website-container q-ml-sm block-container">
                <p class="block-title">Site web</p>
                <a :href="organisme.website" target="_blank" class="website">
                  {{ organisme.website }}
                </a>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
      </div>
    </div>

    <div class="row q-pb-xl">
      <div class="col-md-3">
      </div>
      <div class="col-md-6">
        <div class="row">
          <div class="col-md-4 coordinate-container block-container">
            <div class="col-md-12">
              <p class="block-title perimeter">Périmètre</p>
              <div class="row row-perimeter">
                <div class="row row-perimeter">
                  <div v-if="municipal" class="perimeter-container">
                    <div class="perimeter-icon-container">
                      <q-img src="../assets/perimeter-icons/municipal.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Municipal</p>
                  </div>
                </div>
                <div class="row row-perimeter">
                  <div v-if="national" class="perimeter-container">
                    <div class="perimeter-icon-container">
                      <q-img src="../assets/perimeter-icons/national.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">National</p>
                  </div>
                </div>
                <div class="row row-perimeter">
                  <div v-if="regional" class="perimeter-container">
                    <div class="perimeter-icon-container">
                      <q-img src="../assets/perimeter-icons/region.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Regional</p>
                  </div>
                </div>
                <div v-if="departemental" class="perimeter-container">
                  <div class="perimeter-icon-container">
                    <q-img src="../assets/perimeter-icons/departemental.png"
                           height="55px"
                           width="55px"/>
                  </div>
                  <p class="thematique-texte">departemental</p>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <p class="block-title coordinate">Coordonées</p>
              <p class="coordinate-texte">{{ organisme.coordinate }}</p>
            </div>
            <div class="col-md-12">
              <p class="block-title contact">Contact</p>
              <p class="coordinate-texte">{{ organisme.contact }}</p>
            </div>
            <div class="col-md-12">
              <p class="block-title email">Email</p>
              <p class="coordinate-texte">{{ organisme.email }}</p>
            </div>
          </div>
          <div class="col-md-8">
            <div class="col-md-12 q-pb-sm">
              <div class="q-ml-sm block-container">
                <p class="block-title title-description">Description</p>
                <p class="description">{{ organisme.description }}</p>
              </div>
            </div>
            <div class="col-md-12 q-pb-sm">
              <div class="q-ml-sm block-container">
                <p class="block-title thematique">Thématique</p>
                <div class="row row-thematique">
                  <div v-if="addiction" class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="../assets/thematique-icons/addiction.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Addiction</p>
                  </div>
                  <div v-if="violence" class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="../assets/thematique-icons/violence.png"
                             height="55px"
                             width="55px"/>

                    </div>
                    <p class="thematique-texte">Violence</p>
                  </div>
                  <div v-if="discrimination" class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="../assets/thematique-icons/discrimination.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">discrimination</p>
                  </div>
                  <div v-if="harassment" class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="../assets/thematique-icons/harcèlement.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Harcèlement</p>
                  </div>
                  <div v-if="mentalHealth" class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="../assets/thematique-icons/santémentale.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="headSick">Santé<br>mentale</p>
                  </div>
                  <div v-if="sexuality" class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="../assets/thematique-icons/sexualité.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Sexualité</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="q-ml-sm block-container">
                <p class="block-title age">Tranche d'age</p>
                <div class="row row-age">
                  <div v-if="earlyChildhood" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="../assets/age-icons/petiteenfance.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Petite enfance</p>
                  </div>
                  <div v-if="primaire" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="../assets/age-icons/primaire.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Primaire</p>
                  </div>
                  <div v-if="college" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="../assets/age-icons/collège2.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Collège</p>
                  </div>
                  <div v-if="lycee" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="../assets/age-icons/ado.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Lycée</p>
                  </div>
                  <div v-if="youngAdulte" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="../assets/age-icons/jeuneadulte.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Jeune adulte</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
      </div>
    </div>
      <Social :title="socialTitle"/>
      <Footer :title="footerTitle" :url="footerUrl" :buttonText="footerTexteButton"/>
  </div>
</template>

<script>
export default {
  name: 'OrganismeDetail.vue',
  props: ['id'],
};
</script>
<script setup>
import {
  onMounted, ref,
} from 'vue';
import { useRoute } from 'vue-router';
import Social from 'components/Social.vue';
import Footer from 'components/Footer.vue';
import Head from 'components/Head.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const $basePath = `http://${window.location.hostname}:1337`;

const homeTitle = ref('Le guide Maux d\'enfants mode d\'emploi Des organismes gratuits pour accompagner vos enfants');
const socialTitle = ref('Partagez ces résultats avec les réseaux ou encapsulé sur mon site </>');
const footerTitle = ref('Ces informations sont recueillies automatiquement depuis le site internet de l\'organisme. \n'
  + 'Aidez nous à mettre à jour les informations.');
const footerUrl = ref('subscribe');
const footerTexteButton = ref('Mettre à jour l\'organisme');

const route = useRoute();

const organisme = ref([]);

const addiction = ref(false);
const violence = ref(false);
const discrimination = ref(false);
const harassment = ref(false);
const mentalHealth = ref(false);
const sexuality = ref(false);

const municipal = ref(false);
const regional = ref(false);
const departemental = ref(false);
const national = ref(false);

const earlyChildhood = ref(false);
const primaire = ref(false);
const college = ref(false);
const lycee = ref(false);
const youngAdulte = ref(false);

function isThematiqueTrue() {
  const thematiques = organisme.value.thematique;
  if (thematiques.includes('addiction')) {
    addiction.value = true;
  }
  if (thematiques.includes('violence')) {
    violence.value = true;
  }
  if (thematiques.includes('discrimination')) {
    discrimination.value = true;
  }
  if (thematiques.includes('harcèlement')) {
    harassment.value = true;
  }
  if (thematiques.includes('santé mentale')) {
    mentalHealth.value = true;
  }
  if (thematiques.includes('sexualité')) {
    sexuality.value = true;
  }
}

function isPerimeterTrue() {
  const perimeters = organisme.value.perimeter;
  if (perimeters.includes('municipal')) {
    municipal.value = true;
  }
  if (perimeters.includes('regional')) {
    regional.value = true;
  }
  if (perimeters.includes('departemental')) {
    departemental.value = true;
  }
  if (perimeters.includes('national')) {
    national.value = true;
  }
}

function isAgeTrue() {
  const ages = organisme.value.age;
  if (ages.includes('petite enfance')) {
    earlyChildhood.value = true;
  }
  if (ages.includes('primaire')) {
    primaire.value = true;
  }
  if (ages.includes('collège')) {
    college.value = true;
  }
  if (ages.includes('lycée')) {
    lycee.value = true;
  }
  if (ages.includes('jeune adulte')) {
    youngAdulte.value = true;
  }
}

const getData = async () => {
  try {
    const dataOrganismes = await axios.get(`${$basePath}/api/organismes/${route.params.id}?populate=*`);
    const arr = [];
    const datas = dataOrganismes.data.data;
    arr.push(datas);
    const finalData = arr.map((data) => ({
      ...data,
      title: data.attributes.nom,
      img: data.attributes.img.data[0].attributes.url,
      description: data.attributes.description,
      website: data.attributes.website,
      coordinate: data.attributes.coordonees,
      contact: data.attributes.contact,
      email: data.attributes.email,
      thematique: Object.values(data.attributes.thematiques.data.map((age) => ({
        ...age,
        name: age.attributes.thematiques,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), [])),
      age: Object.values(data.attributes.ages.data.map((age) => ({
        ...age,
        name: age.attributes.age,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), [])),
      perimeter: Object.values(data.attributes.perimeters.data.map((perimeter) => ({
        ...perimeter,
        name: perimeter.attributes.perimetres,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), [])),
    }));
    // eslint-disable-next-line prefer-destructuring
    organisme.value = finalData[0];
    console.log(organisme.value);
  } catch (error) {
    $q.notify({
      message: 'Erreur lors du chargement de l\'organisme',
      caption: 'Merci de réesayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
  }
};

onMounted(() => {
  getData();
  setTimeout(() => {
    isThematiqueTrue();
    isPerimeterTrue();
    isAgeTrue();
  }, 1000);
});

</script>

<style lang="scss" scoped>
.head {
  padding-top: 100px;
}

.title {
  text-align: center;
}

.page-title {
  color: $accent;
}

.img {
  max-height: 197px;
  max-width: 300px;
  object-fit: contain;
  border-radius: 10px;
}

.img-container {
  height: 205px;
  text-align: center;
  justify-content: center;
  background-color: white;
  border: 4px solid $accent;
  border-radius: 15px;
}

.block-container {
  border: 4px solid $accent;
  border-radius: 15px;
  background-color: #EDF9FF;
}

.coordinate-container {
}

.name,
.website-container,
.perimeter,
.coordinate,
.contact,
.email,
.website,
.title-description,
.age,
.thematique,
.headSick
{
  text-align: center;
}

.headSick {
  margin-bottom: 5px;
}

.name {
  min-height: 98px;
  max-height: 98px;
}

.website-container {
  height: 98px;
}

.perimeter {
}

.coordinate {
}

.contact {
}

.email {
}

.website {
  font-size: 18px;
  color: $accent;
  padding: 0 15px 0 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.description {
  font-size: 18px;
  color: $accent;
  padding: 0 15px 0 15px;
}

.age {
}

.thematique {
  padding-bottom: 5px;
}

.block-title {
  font-size: 22px;
  font-weight: bolder;
  color: $accent;
  margin-bottom: 10px;
  margin-top: 5px;
}

.row-age,
.row-perimeter,
.row-thematique {
  justify-content: center;
}

.perimeter-icon-container {
  background-image:
    url( '../assets/perimeter-icons/round-yellow.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 0 20px;
  text-align: center;
}

.thematique-icon-container {
  background-image:
    url( '../assets/thematique-icons/round-blue.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 10px 20px;
}

.age-icon-container {
  background-image:
    url( '../assets/age-icons/round-green.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 10px 20px;
}

.thematique-texte {
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
}

.coordinate-texte {
  text-align: center;
  margin: 8px 15px 15px 15px;
  font-size: 16px;
}

.name-text {
  font-size: 22px;
  color: $accent;
  padding: 0 15px 0 15px;
  margin: 0;
  font-weight: bolder;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 90px;
}

</style>
