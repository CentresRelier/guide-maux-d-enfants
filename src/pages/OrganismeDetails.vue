<template>
  <div class="container">

    <div class="head">
      <Head :title1="homeTitle1" :title2="homeTitle2"/>
    </div>

    <div class="row">
      <div class="col-xs-0 col-md-2">
      </div>
      <div class="col-xs-12 col-md-8 title">
        <div class="row">
          <div class="col-xs-2 col-md-1 return-btn">
            <ReturnButton />
          </div>
          <div class="col-xs-10 col-md-10">
            <h5 class="page-title">Détails de l’organisme </h5>
          </div>
        </div>
      </div>
      <div class="col-xs-0 col-md-1">
      </div>
    </div>

    <div class="row q-mb-sm row-main">
      <div class="col-xs-0 col-md-2 col-lg-3">
      </div>
      <div class="col-xs-12 col-md-8 col-lg-6">
        <div class="row row-mobile">
          <div class="col-xs-12 col-md-5 img-container">
            <img class="img-organisme" :src="'https://guide.centresrelier.org/bd' + organisme.image" />
          </div>
          <div class="col-xs-12 col-md-7">
            <div class="col-xs-12 col-md-12 q-mb-sm">
              <div class="name q-ml-sm block-container">
                <p class="name-text">{{ organisme.title }}</p>
              </div>
            </div>
            <div class="col-xs-12 col-md-12">
              <div class="website-container q-ml-sm block-container">
                <p class="block-title">Site web</p>
                <!-- website url is absolute -->
                <a v-if="organisme.website" :href="`${organisme.website}`"
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
      <div class="col-xs-0 col-md-2 col-lg-3">
      </div>
    </div>

    <div class="row q-pb-xl">
      <div class="col-xs-0 col-md-2 col-lg-3">
      </div>
      <div class="col-xs-12 col-md-8 col-lg-6">
        <div class="row row-coordinate">
          <div class="col-xs-12 col-md-5 coordinate-container">
            <div class="col-xs-12 col-md-12">
              <p class="block-title perimeter">Périmètre</p>
              <div class="row row-perimeter">
                <div class="row row-perimeter">
                  <div v-for="perimeter in perimeters" :key="perimeter.id">
                    <OrganismeCardIcon
                      v-if="organisme.perimeter.includes(perimeter.name)"
                      :organisme="perimeter" :category="'perimeter'" :tooltip="false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-md-12">
              <p class="block-title coordinate">Coordonnées</p>
              <p class="coordinate-texte">
                {{ organisme.coordinate + ' ' + organisme.postalCode + ' ' + organisme.commune }}
              </p>
            </div>
            <div class="col-xs-12 col-md-12">
              <p class="block-title contact">Contact</p>
              <ContactPlus :formated="formattedContacts" :name="'tel'"/>
            </div>
            <div class="col-xs-12 col-md-12">
              <p class="block-title email">Email</p>
              <ContactPlus :formated="formattedEmails" :name="'mailto'"/>
            </div>
          </div>
          <div class="col-xs-12 col-md-7">
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
                  <div v-for="thematique in thematiques" :key="thematique.id">
                    <OrganismeCardIcon
                      v-if="organisme.thematique.includes(thematique.name)"
                      :organisme="thematique" :category="'thematique'" :tooltip="false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-md-12">
              <div class="q-ml-sm block-container">
                <p v-if="organisme.age.length <= 1" class="block-title age">Tranche d'âge</p>
                <p v-else class="block-title age">Tranches d'âge</p>
                <div class="row row-age">
                  <div v-for="age in ages" :key="age.id">
                    <OrganismeCardIcon
                      v-if="organisme.age.includes(age.name)"
                      :organisme="age" :category="'ages'" :tooltip="false"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-0 col-md-2 col-lg-3">
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
  onMounted, ref, watchEffect,
} from 'vue';
import { useRoute } from 'vue-router';
import Social from 'components/SocialFooter.vue';
import Footer from 'components/FooterBar.vue';
import ReturnButton from 'components/ReturnButton.vue';
import Head from 'components/HeadBar.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import OrganismeCardIcon from 'components/OrganismeCardIcon.vue';
import ContactPlus from 'components/ContactPlus.vue';

const $q = useQuasar();
// const $BASEPATH = `http://${window.location.hostname}:1337`;
const SERVER_PATH = 'https://guide.centresrelier.org';

const homeTitle1 = ref('Le guide Maux d\'enfants mode d\'emploi');
const homeTitle2 = ref('Des organismes gratuits pour accompagner vos enfants');
const socialTitle = ref('Partagez ces résultats avec les réseaux ou encapsulé sur mon site </>');
const footerTitle = ref('Ces informations sont recueillies automatiquement depuis le site internet de l\'organisme. \n'
  + 'Aidez nous à mettre à jour les informations.');
const footerUrl = ref('subscribe');
const footerTexteButton = ref('Mettre à jour l\'organisme');

const route = useRoute();

const thematiques = ref([
  { name: 'Addiction', tooltip: 'Addiction', url: 'statics/thematique-icons/addiction.png' },
  { name: 'Violence', tooltip: 'Violence', url: 'statics/thematique-icons/violence.png' },
  { name: 'Discrimination', tooltip: 'Discrimination', url: 'statics/thematique-icons/discrimination.png' },
  { name: 'Harcèlement', tooltip: 'Harcèlement', url: 'statics/thematique-icons/harcelement.png' },
  { name: 'Santé mentale', tooltip: 'Santé mentale', url: 'statics/thematique-icons/santementale.png' },
  { name: 'Sexualité', tooltip: 'Sexualité', url: 'statics/thematique-icons/sexualite.png' },
]);

const perimeters = ref([
  { name: '1-Municipal', tooltip: 'Municipal', url: 'statics/perimeter-icons/municipal.png' },
  { name: '2-Départemental', tooltip: 'Départemental', url: 'statics/perimeter-icons/region.png' },
  { name: '3-Régional', tooltip: 'Régional', url: 'statics/perimeter-icons/region.png' },
  { name: '4-National', tooltip: 'National', url: 'statics/perimeter-icons/national.png' },
]);

const ages = ref([
  { name: 'Petite enfance', tooltip: 'Petite enfance', url: 'statics/age-icons/petiteenfance.png' },
  { name: 'Primaire', tooltip: 'Primaire', url: 'statics/age-icons/primaire.png' },
  { name: 'Collège', tooltip: 'Collège', url: 'statics/age-icons/college.png' },
  { name: 'Lycée', tooltip: 'Lycée', url: 'statics/age-icons/ado.png' },
  { name: 'Jeune adulte', tooltip: 'Jeune adulte', url: 'statics/age-icons/jeuneadulte.png' },
]);

const organisme = ref({
  title: '',
  description: '',
  defaultDescription: '',
  website: '',
  coordinate: '',
  contact: '',
  email: '',
  thematique: '',
  age: '',
  perimeter: '',
  img: '',
});

function setDefaultImages() {
  const defaultImgName = organisme.value.imageDefault.data.attributes.name;
  const defaultImgUrl = organisme.value.imageDefault.data.attributes.url;
  const defaultImgReseau = organisme.value.imageReseau;

  let final = '';

  if (defaultImgName !== 'no_image.svg') {
    final = defaultImgUrl;
  }
  if (defaultImgName === 'no_image.svg') {
    final = defaultImgReseau;
  }
  organisme.value.image = final;
  console.log(organisme.value.image);
}

function setDefaultDescription() {
  if (organisme.value.description === null) {
    const data = organisme.value.defaultDescription.data.attributes.description;
    organisme.value.description = data;
  }
}

const getData = async () => {
  try {
    const dataOrganisme = await axios.get(`${SERVER_PATH}/bd/api/organismes/${route.params.id}?populate=reseau.logo,thematiques,perimetre,ages,img`);
    const data = dataOrganisme.data.data.attributes;
    organisme.value.title = data.nom;
    organisme.value.description = data.description;
    organisme.value.defaultDescription = data.reseau;
    organisme.value.website = data.website;
    organisme.value.coordinate = data.coordonnees;
    organisme.value.contact = data.contact ? data.contact : '';
    organisme.value.email = data.email ? data.email : '';
    organisme.value.image = '';
    organisme.value.imageDefault = data.img;
    organisme.value.imageReseau = data.reseau.data.attributes.logo.data.attributes.url;
    organisme.value.postalCode = data.code_postal;
    organisme.value.commune = data.commune;
    organisme.value.thematique = Object.values(data.thematiques.data
      .map((age) => ({
        ...age,
        name: age.attributes.thematiques,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), []));
    organisme.value.age = Object.values(data.ages.data
      .map((age) => ({
        ...age,
        name: age.attributes.age,
      })).reduce((a, b) => ({ ...a, [b.id]: b.name }), []));
    organisme.value.perimeter = data.perimetre
      .data.attributes.perimetre;
    setDefaultImages();
    setDefaultDescription();
  } catch (error) {
    $q.notify({
      message: 'Erreur lors du chargement des organismes',
      caption: 'Merci de réesayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
  }
};

const formattedContacts = ref([]);
const formattedEmails = ref([]);

function separateContactInfos(data) {
  const { contact, email } = organisme.value;
  if (contact.includes('----')) {
    const modifiedContact = contact.replace(/----/g, '\n');
    const contactsArray = modifiedContact.split('\n');
    formattedContacts.value = contactsArray;
    data.contact = modifiedContact;
  }
  if (email.includes('----')) {
    const modifiedEmail = email.replace(/----/g, '\n');
    const emailArray = modifiedEmail.split('\n');
    formattedEmails.value = emailArray;
    data.email = modifiedEmail;
  }
}

watchEffect(() => {
  separateContactInfos(organisme.value);
});

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

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  object-fit: contain;
  overflow: hidden;
  background-color: #EDF9FF;
  border: 4px solid $accent;
}

.img-organisme {
  height: 100%;
  min-height: 197px;
  max-height: 197px;
  object-fit: contain;
  border-radius: 10px;
}

.block-container {
  border: 4px solid $accent;
  border-radius: 15px;
  background-color: #EDF9FF;
}

.coordinate-container {
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
  overflow-wrap: break-word;
  white-space: pre-line;
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
    url( '/statics/perimeter-icons/round-yellow.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 0 20px;
  text-align: center;
}

.thematique-icon-container {
  background-image:
    url( '/statics/thematique-icons/round-blue.png' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 20px 10px 20px;
}

.age-icon-container {
  background-image:
    url( '/statics/age-icons/round-green.svg' );
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

.return-btn {
  align-self: center;
}

@media only screen and (min-device-width : 500px) and (max-device-width : 1024px) {
  .name {
    margin: 0;
  }
  .website-container {
    margin: 0;
  }
  .block-container {
    margin: 0;
  }
  .img-container {
    margin-bottom: 32px;
    max-width:100%;
    max-height:100%;
  }
  .row-mobile {
    padding-right: 32px;
    padding-left: 32px;
    justify-content: center;
  }
  .row-coordinate {
    padding-right: 32px;
    padding-left: 32px;
  }
  .coordinate-container {
    margin-bottom: 8px;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 500px) {
  .name {
    margin: 0;
  }
  .website-container {
    margin: 0;
  }
  .block-container {
    margin: 0;
  }
  .img-container {
    margin-bottom: 8px;
    max-width:100%;
    max-height:100%;
  }
  .row-mobile {
    padding-right: 16px;
    padding-left: 16px;
    justify-content: center;
  }
  .row-coordinate {
    padding-right: 16px;
    padding-left: 16px;
  }
  .coordinate-container {
    margin-bottom: 8px;
  }

  .img-organisme {
    max-width:100%;
    max-height:100%;
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

.row-main {
  place-content: center;
}
</style>
