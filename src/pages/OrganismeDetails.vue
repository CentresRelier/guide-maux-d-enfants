<template>
  <div class="container">

    <div class="head">
      <Head :title="homeTitle"/>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 title">
        <h5 class="page-title">Détails de l’organisme </h5>
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
            <img class="img" :src="organisme.img" />
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
                <!-- website url is absolute -->
                <a v-if="organisme.website.startsWith('http')" :href="`${organisme.website}`"
                          target="_blank" class="website">
                  <img class="img" src="/statics/hyperlink-logo.png"
                          height="35" width="35" />
                </a>
                <!-- website url is relative -->
                <a v-else :href="`//${organisme.website}`" target="_blank" class="website">
                  <img class="img" src="/statics/hyperlink-logo.png"
                          height="35" width="35" />
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
                  <div v-if="organisme.perimeter.includes('Municipal')" class="perimeter-container">
                    <div class="perimeter-icon-container">
                      <q-img src="statics/perimeter-icons/municipal.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Municipal</p>
                  </div>
                </div>
                <div class="row row-perimeter">
                  <div v-if="organisme.perimeter.includes('National')" class="perimeter-container">
                    <div class="perimeter-icon-container">
                      <q-img src="statics/perimeter-icons/national.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">National</p>
                  </div>
                </div>
                <div class="row row-perimeter">
                  <div v-if="organisme.perimeter.includes('Régional')" class="perimeter-container">
                    <div class="perimeter-icon-container">
                      <q-img src="statics/perimeter-icons/region.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Régional</p>
                  </div>
                </div>
                <div v-if="organisme.perimeter.includes('Départemental')"
                          class="perimeter-container">
                  <div class="perimeter-icon-container">
                    <q-img src="statics/perimeter-icons/departemental.png"
                           height="55px"
                           width="55px"/>
                  </div>
                  <p class="thematique-texte">Départemental</p>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <p class="block-title coordinate">Coordonnées</p>
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
                <p v-if="organisme.thematique.length <= 1" class="block-title thematique">
                  Thématique
                </p>
                <p v-else class="block-title thematique">Thématiques</p>
                <div class="row row-thematique">
                  <div v-if="organisme.thematique.includes('Addiction')"
                            class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="statics/thematique-icons/addiction.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Addiction</p>
                  </div>
                  <div v-if="organisme.thematique.includes('Violence')"
                            class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="statics/thematique-icons/violence.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Violence</p>
                  </div>
                  <div v-if="organisme.thematique.includes('Discrimination')"
                            class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="statics/thematique-icons/discrimination.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Discrimination</p>
                  </div>
                  <div v-if="organisme.thematique.includes('Harcèlement')"
                            class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="statics/thematique-icons/harcelement.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Harcèlement</p>
                  </div>
                  <div v-if="organisme.thematique.includes('Santé mentale')"
                            class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="statics/thematique-icons/santementale.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="headSick">Santé<br>mentale</p>
                  </div>
                  <div v-if="organisme.thematique.includes('Sexualité')"
                            class="thematique-container">
                    <div class="thematique-icon-container">
                      <q-img src="statics/thematique-icons/sexualite.png"
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
                <p v-if="organisme.age.length <= 1" class="block-title age">Tranche d'âge</p>
                <p v-else class="block-title age">Tranches d'âge</p>
                <div class="row row-age">
                  <div v-if="organisme.age.includes('Petite enfance')" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="statics/age-icons/petiteenfance.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Petite enfance</p>
                  </div>
                  <div v-if="organisme.age.includes('Primaire')" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="statics/age-icons/primaire.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Primaire</p>
                  </div>
                  <div v-if="organisme.age.includes('Collège')" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="statics/age-icons/college.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Collège</p>
                  </div>
                  <div v-if="organisme.age.includes('Lycée')" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="statics/age-icons/ado.png"
                             height="55px"
                             width="55px"/>
                    </div>
                    <p class="thematique-texte">Lycée</p>
                  </div>
                  <div v-if="organisme.age.includes('Jeune adulte')" class="thematique-container">
                    <div class="age-icon-container">
                      <q-img src="statics/age-icons/jeuneadulte.png"
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
// const $BASEPATH = `http://${window.location.hostname}:1337`;
const SERVER_PATH = 'http://guide-maux-d-enfants.centresrelier.org';

const homeTitle = ref('Le guide Maux d\'enfants mode d\'emploi \n Des organismes gratuits pour accompagner vos enfants');
const socialTitle = ref('Partagez ces résultats avec les réseaux ou encapsulé sur mon site </>');
const footerTitle = ref('Ces informations sont recueillies automatiquement depuis le site internet de l\'organisme. \n'
  + 'Aidez nous à mettre à jour les informations.');
const footerUrl = ref('subscribe');
const footerTexteButton = ref('Mettre à jour l\'organisme');

const route = useRoute();

const organisme = ref({
  title: '',
  description: '',
  website: '',
  coordinate: '',
  contact: '',
  email: '',
  thematique: '',
  age: '',
  perimeter: '',
  img: '',
});

function getOrganismeImage(dataOrganisme) {
  if (dataOrganisme.data.data.attributes.img.data !== null) {
    organisme.value.img = `${SERVER_PATH}${dataOrganisme.data.data.attributes.img.data.attributes.url}`;
  } else {
    organisme.value.img = '/statics/default-organisme-image.png';
  }
}

const getData = async () => {
  try {
    const dataOrganisme = await axios.get(`${SERVER_PATH}/api/organismes/${route.params.id}?populate=*`)
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
    organisme.value.title = dataOrganisme.data.data.attributes.nom;
    organisme.value.description = dataOrganisme.data.data.attributes.description;
    organisme.value.website = dataOrganisme.data.data.attributes.website;
    organisme.value.coordinate = dataOrganisme.data.data.attributes.coordonnees;
    organisme.value.contact = dataOrganisme.data.data.attributes.contact;
    organisme.value.email = dataOrganisme.data.data.attributes.email;
    organisme.value.thematique = Object.values(dataOrganisme.data.data.attributes.thematiques.data
      .map((age) => ({
        ...age,
        name: age.attributes.thematiques,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), []));
    organisme.value.age = Object.values(dataOrganisme.data.data.attributes.ages.data
      .map((age) => ({
        ...age,
        name: age.attributes.age,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), []));
    organisme.value.perimeter = dataOrganisme.data.data.attributes.perimetre
      .data.attributes.perimetre;
    getOrganismeImage(dataOrganisme);
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

onMounted(() => {
  getData();
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
    url( 'statics/perimeter-icons/round-yellow.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 0 20px;
  text-align: center;
}

.thematique-icon-container {
  background-image:
    url( 'statics/thematique-icons/round-blue.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 10px 20px;
}

.age-icon-container {
  background-image:
    url( 'statics/age-icons/round-green.svg' );
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
