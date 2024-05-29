<template>
  <div class='main'>
    <div class="head">
      <div class="row-head">
        <p class="head-text">{{ headTitle }}</p>
      </div>
    </div>

    <q-form
      @submit="submit"
      ref="myForm"
      class="q-gutter-md q-pb-xl">

      <div class="row">
        <div class="col-xs-1 col-sm-2 col-md-2">
          <div class="return-btn flex justify-center q-pt-md">
            <ReturnButton />
          </div>
        </div>
        <div class="col-xs-10 col-sm-8 col-8 q-pt-md">
          <div class="block-container">
            <div class="row row-mobile">
              <div class="col-12">
                <div class="row">
                  <h6>Taper le nom de votre organisme</h6>
                  <p class="obligatory">*</p>
                </div>
                <div class="row">
                </div>
                <p>si votre organisme est présent dans la liste il est déjà enregistré sur le guide</p>
              </div>
              <div class="col-12">
                <SearchOrganismeForm @name="getName" :reset="reset" :inputMess="organisme.title"/>
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="row row-mobile">
              <div class="col-12">
                <div class="row">
                  <h6>Choisir le réseau dont l'organisme fait partie</h6>
                </div>
                <p>rechercher un réseau associé à votre organisme</p>
              </div>
              <h5>Actuellement : {{ organisme.defaultDescription?.data?.attributes?.nom }}</h5>
              <div class="col-12">
                <SearchNetworkForm @network="getNetwork" :reset="reset"/>
              </div>
            </div>
          </div>
          <div class="block-container">
            <div class="row row-mobile">
              <div class="col-12">
                <div class="row">
                  <h6>Taper l'url du site de l'organisme</h6>
                  <p class="obligatory">*</p>
                </div>
                <p>Site de référence (pour nous aider à récupérer le plus d'informations possibles sur l'organisme proposé)</p>
              </div>
              <div class="col-12">
                <UrlInputForm @url="getUrl" :reset="reset" :inputMess="organisme.website"/>
              </div>
            </div>
          </div>
              <div class="block-container">
                <div class="row row-mobile">
                  <div class="col-12">
                    <div class="row">
                      <h6>Commune</h6>
                      <p class="obligatory">*</p>
                    </div>
                    <p>Entrer le code postal de votre adresse</p>
                  </div>
                  <div class="col-12">
                    <PostalCodeForm @address="getAddress" :reset="reset" :inputMess="organisme.postalCode"/>
                  </div>
                </div>
              </div>
          <div class="block-container-btn">
            <div class="row row-mobile">
              <div class="col-12">
                <div class="row">
                  <h6>Sélectionner le périmètre d'action de l'organisme</h6>
                </div>
              </div>
              <div class="col-12">
                <div class="row row-btn q-pt-xs">
                  <div v-for="perimeter in perimeters" :key="perimeter.id">
                    <EditOrganismeFilterButton
                      :urlIcon="perimeter.url"
                      :buttonText="perimeter.tooltip"
                      :category="'perimeter'"
                      :inputMess="organisme.perimeter"
                      @update="updatePerimeter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="block-container-btn">
            <div class="row row-mobile">
              <div class="col-12">
                <div class="row">
                  <h6>Sélectionner les âges auxquels l'organisme peut intervenir</h6>
                </div>
              </div>
              <div class="col-12">
                <div class="row row-btn q-pt-xs">
                  <div v-for="age in ages" :key="age.id">
                    <EditOrganismeFilterButton
                      :urlIcon="age.url"
                      :buttonText="age.text"
                      :category="'age'"
                      :inputMess="organisme.age"
                      @update="updateAge"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="block-container-btn">
            <div class="row row-mobile">
              <div class="col-12">
                <div class="row">
                  <h6>Sélectionner les thématiques sur lesquelles l'organisme intervient</h6>
                </div>
              </div>
              <div class="col-12">
                <div class="row row-btn q-pt-xs">
                  <div v-for="thematique in thematiques" :key="thematique.id">
                    <EditOrganismeFilterButton
                      :urlIcon="thematique.url"
                      :buttonText="thematique.text"
                      :category="'thematique'"
                      :inputMess="organisme.thematique"
                      @update="updateThematique"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-1 col-sm-2 col-md-2">
        </div>
      </div>

      <div class="flex justify-center">
        <ReCaptcha ref="captchaRef" @captcha="getCaptcha" :reset="reset"/>
      </div>

      <div class="absolute-bottom send-btn">
        <q-btn class="absolute-center button q-mt-xl"
              type="submit"
              rounded
              :disable="!isFormValid"
              size="md">
          <p class="submit-text">MODIFIER</p>
        </q-btn>
      </div>

    </q-form>

    <div class="footer q-mt-xl"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

import axios from 'axios';
import {
  computed,
  ref,
  onMounted,
} from 'vue';

import { useQuasar } from 'quasar';

import SearchOrganismeForm from 'components/organismeForm/SearchOrganismeForm.vue';
import SearchNetworkForm from 'components/organismeForm/SearchNetworkForm.vue';
import UrlInputForm from 'components/organismeForm/UrlInputForm.vue';
import PostalCodeForm from 'components/organismeForm/AddressForm.vue';
import ReCaptcha from 'components/hCaptcha.vue';
import ReturnButton from 'components/ReturnButton.vue';
import EditOrganismeFilterButton from 'components/EditOrganismeFilterButton.vue';
import { useFiltersStore } from 'stores/filterButtonEditPage';

const store = useFiltersStore();

const SERVER_PATH = 'https://guide.centresrelier.org';

const $q = useQuasar();

const headTitle = ref('Modifier un organisme existant\n'
  + 'Le guide maux d\'enfants mode d\'emploi est réservé aux services gratuits');

const organismeValidation = ref({
  nom: false,
  websrc: false,
  code_postal: false,
  commune: false,
  catcha: false,
  reseau: false,
});

const reset = ref(false);

function areAllValuesTrue(obj) {
  return Object.values(obj).every((value) => value === true);
}

const isFormValid = computed(() => areAllValuesTrue(organismeValidation.value));

const thematiques = ref([
  {
    id: 1,
    text: 'Addiction',
    tooltip: 'Addiction',
    url: 'statics/thematique-icons/addiction.png',
  },
  {
    id: 2,
    text: 'Violence',
    tooltip: 'Violence',
    url: 'statics/thematique-icons/violence.png',
  },
  {
    id: 3,
    text: 'Discrimination',
    tooltip: 'Discrimination',
    url: 'statics/thematique-icons/discrimination.png',
  },
  {
    id: 4,
    text: 'Harcèlement',
    tooltip: 'Harcèlement',
    url: 'statics/thematique-icons/harcelement.png',
  },
  {
    id: 5,
    text: 'Santé mentale',
    tooltip: 'Santé mentale',
    url: 'statics/thematique-icons/santementale.png',
  },
  {
    id: 6,
    text: 'Sexualité',
    tooltip: 'Sexualité',
    url: 'statics/thematique-icons/sexualite.png',
  },
]);

const perimeters = ref([
  {
    id: 1,
    text: 'Municipal',
    tooltip: 'Municipal',
    url: 'statics/perimeter-icons/municipal.png',
  },
  {
    id: 2,
    text: 'Départemental',
    tooltip: 'Départemental',
    url: 'statics/perimeter-icons/departemental.png',
  },
  {
    id: 3,
    text: 'Régional',
    tooltip: 'Régional',
    url: 'statics/perimeter-icons/region.png',
  },
  {
    id: 4,
    text: 'National',
    tooltip: 'National',
    url: 'statics/perimeter-icons/national.png',
  },
]);

const ages = ref([
  {
    id: 1,
    text: 'Petite enfance',
    tooltip: 'Petite enfance',
    url: 'statics/age-icons/petiteenfance.png',
  },
  {
    id: 2,
    text: 'Primaire',
    tooltip: 'Primaire',
    url: 'statics/age-icons/primaire.png',
  },
  {
    id: 3,
    text: 'Collège',
    tooltip: 'Collège',
    url: 'statics/age-icons/college.png',
  },
  {
    id: 4,
    text: 'Lycée',
    tooltip: 'Lycée',
    url: 'statics/age-icons/ado.png',
  },
  {
    id: 5,
    text: 'Jeune adulte',
    tooltip: 'Jeune adulte',
    url: 'statics/age-icons/jeuneadulte.png',
  },
]);

const organisme = ref({
  nom: '',
  reseau: null,
  websrc: '',
  code_postal: '',
  commune: '',
  perimetre: { connect: [] },
  ages: { connect: [] },
  thematiques: { connect: [] },
  publishedAt: null,
});

const logs = ref({
  nom: '',
  reseau: null,
  websrc: '',
  code_postal: '',
  commune: '',
  perimetre: { connect: [] },
  ages: { connect: [] },
  thematiques: { connect: [] },
  publishedAt: null,
});

function updateArray(array, item, selected) {
  const index = array.indexOf(item);
  if (selected && index === -1) {
    array.push(item);
  } else if (!selected && index !== -1) {
    array.splice(index, 1);
  }
}

const selectedPerimeter = ref('');

function updatePerimeter(buttonText) {
  selectedPerimeter.value = buttonText;
  organisme.value.perimetre = { connect: [buttonText] };
}

function updateAge({ text, selected }) {
  updateArray(organisme.value.age, text, selected);
}

function updateThematique({ text, selected }) {
  updateArray(organisme.value.thematique, text, selected);
}

function getName(data) {
  organisme.value.nom = data.data;
  organismeValidation.value.nom = data.isValid === true;
}

function getNetwork(data) {
  organisme.value.reseau = data.data;
  organismeValidation.value.reseau = data.isValid === true;
}
function getUrl(data) {
  organisme.value.websrc = data.data;
  organismeValidation.value.websrc = data.isValid === true;
}

function getAddress(data) {
  organisme.value.code_postal = data.data.code_postal;
  organisme.value.commune = data.data.commune;
  organismeValidation.value.code_postal = data.isValid === true;
  organismeValidation.value.commune = data.isValid === true;
}

function getCaptcha(data) {
  if (data.isValid === true) {
    organismeValidation.value.catcha = true;
  }
  if (data.isValid === false) {
    organismeValidation.value.catcha = false;
  }
}

/* function checkNewDataLogs() {

} */

// TEST JS:
// PUT pour modifs
async function submit() {
  const data = organisme.value;
  // const logs = data.attributes;
  axios.all([
    await axios.put(`https://guide.centresrelier.org/bd/api/organismes/${route.params.id}`, { data }, {
      headers: {
        // Authorization: process.env.VITE_API_TOKEN,
        Authorization: import.meta.env.VITE_PUT_KEY,
      },
    }),
    // Ecriture des logs:
    await axios.post(`https://guide.centresrelier.org/bd/api/organismes/${route.params.id}`, { logs }, {
      headers: {
        Authorization: process.env.VITE_API_TOKEN,
      },
    }),
  ])
    .then(() => {
      $q.notify({
        message: 'L\'organisme a bien été modifié',
        caption: 'Votre organisme est soumis à la validation et sera en ligne rapidement',
        color: 'green-9',
        position: 'top',
        timeout: 8000,
      });
    }, (error) => {
      if (error) {
        $q.notify({
          message: 'L\'organisme n\'a pas été modifié',
          caption: 'Un problème est survenu',
          color: 'red-9',
          position: 'top',
        });
      }
    });
}

function setDefaultDescription() {
  if (organisme.value.description === null) {
    const data = organisme.value.defaultDescription.data.attributes.description;
    organisme.value.description = data;
  }
}

function setButtonsStates() {
  const initialData = {
    ages: organisme.value.age,
    thematiques: organisme.value.thematique,
    perimetre: organisme.value.perimeter,
  };
  store.setInitialSelectedButtons(initialData);
}

const getDataById = async () => {
  try {
    const dataOrganisme = await axios.get(`${SERVER_PATH}/bd/api/organismes/${route.params.id}?populate=reseau.logo,thematiques,perimetre,ages,img`);
    const data = dataOrganisme.data.data.attributes;
    organisme.value.title = data.nom;
    organisme.value.defaultDescription = data.reseau;
    organisme.value.website = data.website;
    organisme.value.imageDefault = data.img;
    organisme.value.postalCode = data.code_postal;
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
    setDefaultDescription();
    setButtonsStates();
  } catch (error) {
    $q.notify({
      message: 'Erreur lors du chargement des données',
      caption: 'Merci de réesayer ultérieurement',
      color: 'red-9',
      position: 'top',
    });
  }
};
onMounted(() => {
  getDataById();
});

</script>
<style lang="scss" scoped>
.head {
  height: 128px;
  margin-top: 100px;
  background-color: $green;
  background-image:
    url( 'public/statics/ellipse1-green-head-left.svg' ),
    url( 'public/statics/ellipse1-green-head-right.svg' );
  background-repeat: no-repeat;
  background-position: left, 100%, 0%;
}

.head-text {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: $secondary;
  padding-top: 40px;
  white-space: pre-line;
}

.footer {
  height: 250px;
  background-color: $green;
  background-image:
    url( 'public/statics/ellipse1-green-left-svg.svg' ),
    url( 'public/statics/ellipse2-green-right-svg.svg' );
  background-repeat: no-repeat;
  background-position: left, 100%, 0%;
}

.row-head {
  height: 145px;
  justify-content: center;
}

.block-container {
  border: 4px solid $accent;
  border-radius: 15px;
  background-color: $green;
  padding: 5px 0 15px 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

.block-container-btn {
  border: 4px solid $accent;
  border-radius: 15px;
  background-color: $green;
  padding: 5px 0 0 10px;
  margin-bottom: 10px;
  margin-right: 10px;
}

p {
  font-size: 18px;
  color: $accent;
  line-height: normal;
  user-select: none;
}

h6 {
  margin: 5px 0 5px 0;
  font-size: 22px;
  font-weight: bold;
  color: $accent;
  user-select: none;
}

h5 {
  margin: 5px 0 5px 0;
  font-size: 18px;
  font-weight: bold;
  color: $accent;
  user-select: none;
}

.obligatory {
  color: red;
  font-size: 24px;
  margin: 0;
  padding-left: 1px;
  padding-top: 3px;
}

.input {
  border: 4px solid $secondary;
  background-color: white;
  border-radius: 35px;
  max-width: 500px;
  font-size: 18px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;
  overflow: hidden;
}

.card-organism {
  width: 100%;
}

.button {
  text-transform: none;
  border: 3px solid $accent;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  color: $accent;
  transition: 0.3s;
}

.button:hover {
  background-color: $accent;

  .submit-text {
    color: white;
  }
}

.submit-text {
  color: $accent;
  font-size: 22px;
  font-family: 'Montserrat', sans-serif;
  margin: 10px 15px 10px 15px;
}

.send-btn {
  margin-bottom: 48px;
}

@media only screen and (min-device-width : 32px) and (max-device-width : 768px) {
  .head-text {
    padding-top: 20px;
  }
  .row-btn {
    place-content: center;
  }
  h6 {
    padding-right: 5px;
  }
  .return-btn {
    display: none;
  }
}
</style>
