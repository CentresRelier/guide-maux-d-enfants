<template>

  <div class="head">
    <div class="row-head">
      <p class="head-text">{{ headTitle }}</p>
    </div>
  </div>

  <q-form
    @submit="submit"
    class="q-gutter-md q-pb-xl">

    <template v-for="(organismeField, index) in organismeFieldsList"
                    :key="organismeField.title">
      <div class="row row-mobile"
         v-if="!Array.isArray(organismeField)"
        :class="{'q-pb-xl': index === organismeFieldsList.length - 1}">
        <div v-if="windowWidth > 1023" class="col-md-2">
        </div>
        <div class=" block-container"
            :class="{'q-mt-xl': index === 0,
                      'q-mb-md': index < organismeFieldsList.length - 1,
                      'col-md-8': windowWidth > 1023,
                      'col-md-12 card-organism q-mr-sm q-ml-sm': windowWidth <= 1023,
                      }">
          <div class="texte-container">
            <div class="row row-mobile">
              <h6>{{organismeField.title}}</h6>
              <p class="obligatory">*</p>
            </div>
            <div class="row row-mobile">
              <p>{{organismeField.description}}</p>
            </div>
            <div class="row row-mobile">
              <q-input
                v-if="!organismeField.logo"
                hide-bottom-space
                borderless
                rounded
                dense
                standout="none"
                model-value=""
                class="input shadow-3"
                :class="{'card-organism': windowWidth <= 553}"
                :placeholder="organismeField.placeholder"
                v-model="organismeField.model"
                @keydown.esc="resetData(organismeField.model)">
                <template v-slot:append>
                  <q-icon color="positive" name="check" class="q-pl-sm"/>
                  <q-icon color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
                </template>
              </q-input>
              <template v-if="organismeField.logo">
                  <div
                        v-for="img in organismeField.logo" :key="img.buttonText">
                    <FilterButton
                      :urlIcon="img.urlIcon"
                      :buttonTexte="img.buttonText"
                      :tooltip="img.tooltip"
                      v-on:filterSelected="updateFilters(img.id, organismeField.function)"/>
                  </div>
              </template>
            </div>
          </div>
        </div>
        <div class="col-md-2" v-if="windowWidth > 1023">
        </div>
      </div>
      <template v-if="Array.isArray(organismeField)">
        <div class="row row-mobile" :class="{'q-pb-xl': index === organismeFieldsList.length - 1}">
          <div class="col-md-2" v-if="windowWidth > 1023">
          </div>
          <div
          :class="{
            'col-md-8': windowWidth > 1023,
            'col-xs-12': windowWidth <= 1023,
          }">
            <div class="row row-mobile">
              <div
              :class="{
                'col-md-6': windowWidth > 1023,
                'col-xs-12': windowWidth <= 1023,
              }"
                    v-for="(org, i) in organismeField"
                    :key="org.name">
                <div class="block-container"
                    v-bind:class="{
                    'q-mr-sm': i % 2 === 0 && windowWidth > 1023,
                    'q-ml-sm': i % 2 !== 0 && windowWidth > 1023,
                    'q-mt-md': (i > 1 && windowWidth > 1023) || (i > 0 && windowWidth <= 1023),
                    'q-mr-sm q-ml-sm': windowWidth <= 1023,
                    'q-mt-xl' : index === 0,
                    'q-mb-md' : index < organismeFieldsList.length - 1
                    }">
                  <div class="row row-mobile">
                    <h6>{{org.title}}</h6>
                    <p class="obligatory">*</p>
                  </div>
                  <div class="row row-mobile">
                    <p>{{org.description}}</p>
                  </div>
                  <div class="row row-mobile">
                    <q-input
                      hide-bottom-space
                      borderless
                      rounded
                      dense
                      standout="none"
                      model-value=""
                      class="input shadow-3"
                      :placeholder="org.placeholder"
                      v-model="org.model">
                      <template v-slot:append>
                        <q-icon color="positive" name="check" class="q-pl-sm"/>
                        <q-icon color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2" v-if="windowWidth > 1023">
          </div>
        </div>
      </template>

    </template>

    <div class="absolute-bottom send-btn">
      <q-btn class="absolute-center button"
             type="submit"
             rounded
             size="md">
        <p class="submit-text">ENVOYER</p>
      </q-btn>
    </div>

  </q-form>

  <div class="footer">
  </div>
</template>

<script>
export default {
  name: 'subscribe-page',
  data() {
    return {
      name: '',
      url: '',
      age: '',
      perimetre: '',
      thematiques: '',
      postalCode: '',
      municipalities: '',
      selectedAgeFilters: [],
      selectedThematiquesFilters: [],
      selectedPerimetreFilters: [],
    };
  },
  methods: {
    resetData(toBeReset) {
      if (toBeReset === 'name') {
        this.name = '';
      }
      if (toBeReset === 'url') {
        this.url = '';
      }
    },
    updateFilters(ageFilter, functionName) {
      if (this[`selected${functionName}Filters`].includes(ageFilter)) {
        this[`selected${functionName}Filters`].splice(this[`selected${functionName}Filters`].indexOf(ageFilter), 1);
      } else {
        this[`selected${functionName}Filters`].push(ageFilter);
      }
    },
  },
};
</script>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import axios from 'axios';
import {
  defineProps, ref, onMounted, onUnmounted, getCurrentInstance, toRaw,
} from 'vue';

const headTitle = ref('Inscrire un organisme\n'
  + 'Le guide maux d\'enfants mode d\'emploi est réservé aux services gratuits');
const props = defineProps({
  name: String,
  url: String,
  thematiques: String,
  age: String,
  perimetre: String,
  postalCode: String,
  municipalities: String,
});

const fieldsList = ref(['nom', 'website', 'thematiques', 'age', 'perimetre', 'code_postal', 'commune']);
const addictionUrl = ref('statics/thematique-icons/addiction.png');
const violenceUrl = ref('statics/thematique-icons/violence.png');
const discriminationUrl = ref('statics/thematique-icons/discrimination.png');
const harasmentUrl = ref('statics/thematique-icons/harcelement.png');
const mentalHealthUrl = ref('statics/thematique-icons/santementale.png');
const sexualityUrl = ref('statics/thematique-icons/sexualite.png');
const enfance = ref('statics/age-icons/petiteenfance.png');
const primaire = ref('statics/age-icons/primaire.png');
const college = ref('statics/age-icons/college.png');
const lycee = ref('statics/age-icons/ado.png');
const adulte = ref('statics/age-icons/jeuneadulte.png');

const organismeFieldsList = ref([
  {
    title: 'Nom de l\'organisme (et agence si applicable)',
    description: 'Ajoutez le nom de la commune de l\'agence à référencer'
              + '(il faut donc faire une fiche par agence). Par exemple,'
              + 'les Points Accueil Ecoute Jeunes sont partout en France :'
              + 'Point Accueil Ecoute Jeunes - Antibes, puis Point Accueil'
              + 'Ecoute Jeunes - Meudon, etc... Si l\'organisme a plusieurs'
              + 'agences, merci de renseigner une fiche par agence avec'
              + 'l\'url de chaque agence',
    placeholder: 'Nom de l\'organisme',
    model: props.name,
  },
  {
    title: 'Site web',
    description: 'URL de la page de l\'organisme ou de l\'agence. Cette page sera utilisée'
            + 'pour recueillir les informations. Si vous êtes propriétaires du site,'
            + 'mettez à jour vos métadonnées, votre logo et les informations de contact.,',
    placeholder: 'Url du site web de votre organisme',
    model: props.url,
  },
  {
    title: 'Thématiques',
    placeholder: 'Thématiques de l\'organisme',
    model: props.thematiques,
    function: 'Thematiques',
    logo: [
      {
        buttonText: 'Addiction',
        urlIcon: addictionUrl,
        tooltip: 'Drogue, écrans, tabac, alcool, pornographie, sexe...',
        id: 1,
      },
      {
        buttonText: 'Violence',
        urlIcon: violenceUrl,
        tooltip: 'Violences physiques, sexuelles, psychologiques, cyber-violences...',
        id: 2,
      },
      {
        buttonText: 'Discrimination',
        urlIcon: discriminationUrl,
        tooltip: `Raciale, sociale, religieuse, sexiste, culturelle, transphobie,
                basée sur l'orientation sexuelle, l'apparence physique, le handicap...`,
        id: 3,
      },
      {
        buttonText: 'Harcèlement',
        urlIcon: harasmentUrl,
        tooltip: 'Scolaire, périscolaire, cyberharcèlement, intrafamilial, harcèlement de rue...',
        id: 4,
      },
      {
        buttonText: 'Santé mentale',
        urlIcon: mentalHealthUrl,
        tooltip: 'Dépression, phobies, envies suicidaires, anxiété, isolement...',
        id: 5,
      },
      {
        buttonText: 'Sexualité',
        urlIcon: sexualityUrl,
        tooltip: 'Prévention, genre, orientation sexuelle, prostitution...',
        id: 6,
      },
    ],
  },
  {
    title: 'Age',
    placeholder: 'Age de l\'organisme',
    model: props.age,
    function: 'Age',
    logo: [
      {
        buttonText: 'Petite enfance',
        urlIcon: enfance,
        tooltip: 'Petite enfance',
        id: 1,
      },
      {
        buttonText: 'Primaire',
        urlIcon: primaire,
        tooltip: 'Primaire',
        id: 2,
      },
      {
        buttonText: 'Collège',
        urlIcon: college,
        tooltip: 'Collège',
        id: 3,
      },
      {
        buttonText: 'Lycée',
        urlIcon: lycee,
        tooltip: 'Lycée',
        id: 4,
      },
      {
        buttonText: 'Jeune adulte',
        urlIcon: adulte,
        tooltip: 'Jeune adulte',
        id: 5,
      },
    ],
  },
  {
    title: 'Périmètre d\'action',
    description: 'Sélectionner la couverture territorial de l\'organisme. Par défaut le service sera présenté également aux communes limitrophes',
    placeholder: 'Périmètre de l\'organisme',
    model: props.perimetre,
    function: 'Perimetre',
    logo: [
      {
        buttonText: 'Municipal',
        urlIcon: 'statics/perimeter-icons/municipal.png',
        tooltip: 'Municipal',
        id: 1,
      },
      {
        buttonText: 'Départemental',
        urlIcon: 'statics/perimeter-icons/departemental.png',
        tooltip: 'Départemental',
        id: 2,
      },
      {
        buttonText: 'Régional',
        urlIcon: 'statics/perimeter-icons/region.png',
        tooltip: 'Régional',
        id: 3,
      },
      {
        buttonText: 'National',
        urlIcon: 'statics/perimeter-icons/national.png',
        tooltip: 'National',
        id: 4,
      },
    ],
  },
  [
    {
      title: 'Code postal',
      description: 'Renseignez le code postal de l\'organisme',
      placeholder: 'Code postal',
      model: props.postalCode,
    },
    {
      title: 'Commune',
      description: 'Renseignez la commune de l\'organisme',
      placeholder: 'Commune de votre organisme',
      model: props.municipalities,
    },
  ],
]);

const instance = getCurrentInstance();

const windowWidth = ref(window.innerWidth);
function onWidthChange() {
  windowWidth.value = window.innerWidth;
}

async function submit() {
  const data = {};

  organismeFieldsList.value.forEach((org, i) => {
    if (!Array.isArray(org)) {
      if (!org.function) {
        data[fieldsList.value[i]] = org.model;
      } else {
        data[fieldsList.value[i]] = toRaw(instance.proxy[`selected${org.function}Filters`]);
      }
    } else {
      org.forEach((littlefields) => {
        data[fieldsList.value[i]] = littlefields.model;
        i += 1;
      });
    }
  });
  await axios.post('http://guide-maux-d-enfants.centresrelier.org/api/organismes', { data }, {
    headers: {
      Authorization: 'Bearer 38c4a09fa35e3020ab337146cdeb05a02cbe7df60fd84eebff2f5200a5093bb17849c933b59d179e0fd1229d11c37abf50b5035a3c690d281d476f975acb4dd6dd44b17e882cb944b8dfe946b1b224a4efbf86b4290d2afe27851061bd075dfa3aa0e3e35f96b4dbdb1df301c1ad0252d4faa40711c18c439296c2cb87f7a85d',
    },
  }).then((response) => {
    console.log('L\'organisme a bien été créé', response);
  }, (error) => {
    console.log('Un problème est survenu. Nous vous demandons de réessayer ultérieurement', error);
  });
}

onMounted(() => {
  window.addEventListener('resize', onWidthChange);
});

onUnmounted(() => window.removeEventListener('resize', onWidthChange));
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
}
p {
  font-size: 18px;
  color: $accent;
  line-height: normal;
}

h6 {
  margin: 5px 0 5px 0;
  font-size: 22px;
  font-weight: bold;
  color: $accent;
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
  width: 500px;
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
