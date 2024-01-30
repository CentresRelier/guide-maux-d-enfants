<template>

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
      <div class="col-2">
      </div>
      <div class="col-8 q-pt-md">
        <div class="block-container">
          <div class="row row-mobile">
            <div class="col-12">
              <div class="row">
                <h6>Taper le nom de votre organisme</h6>
                <p class="obligatory">*</p>
              </div>
              <p>si votre organisme est présent dans la liste il est déjà enregistré sur le guide</p>
            </div>
            <div class="col-12">
              <SearchOrganismeForm @name="getName"/>
            </div>
          </div>
        </div>
        <div class="block-container">
          <div class="row row-mobile">
            <div class="col-12">
              <div class="row">
                <h6>Trouver le reseau de l'organisme</h6>
              </div>
              <p>rechercher un réseau associé à votre organisme</p>
            </div>
            <div class="col-12">
              <SearchNetworkForm @network="getNetwork"/>
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
              <UrlInputForm @url="getUrl"/>
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
                  <PostalCodeForm @address="getAddress"/>
                </div>
              </div>
            </div>
        <div class="block-container">
          <div class="row row-mobile">
            <div class="col-12">
              <div class="row">
                <h6>Sélectionner un périmetre relatifs à votre organisme</h6>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div v-for="perimeter in perimeters" :key="perimeter.id">
                  <FilterButton
                    :urlIcon="perimeter.url"
                    :buttonText="perimeter.text"
                    :tooltip="perimeter.tooltip"
                    :category="'perimeter'"
                    :filterFunction="getPerimeters"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-container">
          <div class="row row-mobile">
            <div class="col-12">
              <div class="row">
                <h6>Sélectionner les âges relatifs à votre organisme</h6>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div v-for="age in ages" :key="age.id">
                  <FilterButton
                    :urlIcon="age.url"
                    :buttonText="age.text"
                    :tooltip="age.tooltip"
                    :category="'age'"
                    :filterFunction="getAges"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-container">
          <div class="row row-mobile">
            <div class="col-12">
              <div class="row">
                <h6>Sélectionner les thématiques relatifs à votre organisme</h6>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div v-for="thematique in thematiques" :key="thematique.id">
                  <FilterButton
                    :urlIcon="thematique.url"
                    :buttonText="thematique.text"
                    :tooltip="thematique.tooltip"
                    :category="'thematique'"
                    :filterFunction="getThematiques"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2">
      </div>
    </div>

    <div class="absolute-bottom send-btn">
      <q-btn class="absolute-center button q-mt-xl"
             type="submit"
             rounded
             :disable="!isFormValid"
             size="md">
        <p class="submit-text">ENVOYER</p>
      </q-btn>
    </div>

  </q-form>

  <div class="footer q-mt-xl">
  </div>
</template>

<script setup>
import axios from 'axios';
import {
  computed,
  ref,
} from 'vue';

import { useQuasar } from 'quasar';

import SearchOrganismeForm from 'components/SearchOrganismeForm.vue';
import SearchNetworkForm from 'components/SearchNetworkForm.vue';
import UrlInputForm from 'components/UrlInputForm.vue';
import PostalCodeForm from 'components/AddressForm.vue';
import FilterButton from 'components/FilterButton.vue';

import { useFiltersStore } from 'stores/filterButton';

const filtersStore = useFiltersStore();

const $q = useQuasar();

const headTitle = ref('Inscrire un organisme\n'
  + 'Le guide maux d\'enfants mode d\'emploi est réservé aux services gratuits');

const organismeValidation = ref({
  nom: false,
  websrc: false,
  code_postal: false,
  commune: false,
});

function areAllValuesTrue(obj) {
  console.log(Object.values(obj).every((value) => value === true));
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
    text: '1-Municipal',
    tooltip: 'Municipal',
    url: 'statics/perimeter-icons/municipal.png',
    selected: false,
  },
  {
    id: 2,
    text: '2-Départemental',
    tooltip: 'Départemental',
    url: 'statics/perimeter-icons/departemental.png',
    selected: false,
  },
  {
    id: 3,
    text: '3-Régional',
    tooltip: 'Régional',
    url: 'statics/perimeter-icons/region.png',
    selected: false,
  },
  {
    id: 4,
    text: '4-National',
    tooltip: 'National',
    url: 'statics/perimeter-icons/national.png',
    selected: false,
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
  reseau: [],
  websrc: '',
  code_postal: '',
  commune: '',
  perimetre: [],
  age: [],
  thematique: [],
});

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

function getFilteredValues(selectedButtons, sourceArray, targetProperty) {
  const matchingValues = sourceArray.filter((item) => selectedButtons.includes(item.text));
  const matchingIds = matchingValues.map((item) => item.id);
  organisme.value[targetProperty] = matchingIds;
}

function getPerimeters() {
  const selectedPerimetersButtons = filtersStore.getSelectedPerimeterButtons;
  getFilteredValues(selectedPerimetersButtons, perimeters.value, 'perimetre');
}

function getAges() {
  const selectedAgeButtons = filtersStore.getSelectedAgeButtons;
  getFilteredValues(selectedAgeButtons, ages.value, 'age');
}

function getThematiques() {
  const selectedThematiqueButtons = filtersStore.getSelectedThematiqueButtons;
  getFilteredValues(selectedThematiqueButtons, thematiques.value, 'thematique');
}
function resetForm() {
  const formComponent = this.$refs.myForm;
  formComponent.resetValidation();
  formComponent.reset();
}

async function submit() {
  const data = organisme.value;

  await axios.post('https://guide.centresrelier.org/bd/api/organismes', { data }, {
    headers: {
      Authorization: 'Bearer ae3f26a266e9c1706664308a89c59b38304dcd7032107456993136c14181b395764737e2d52acd7efe69bdf1b1f390566127e40ee356f879cb2aa35d1d1d64c84751088e7d6e26d7bec61f34c0fa34707213d2ec7c2860599e4c55713b8ead5d0f8b996d57942ed6b188f5639cd77100e9e7197d3235a86434626da98458c737',
    },
  }).then(() => {
    $q.notify({
      message: 'L\'organisme a bien été créé',
      caption: 'Vous pouvez créé un nouvelle organisme',
      color: 'green-9',
      position: 'top',
    });
    resetForm();
  }, (error) => {
    console.log('Un problème est survenu. Nous vous demandons de réessayer ultérieurement', error);
  });
  console.log(organisme.value);
}
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
  margin-right: 10px;
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
</style>
