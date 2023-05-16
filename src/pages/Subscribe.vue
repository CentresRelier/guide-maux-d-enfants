<template>

  <div class="head">
    <div class="row-head">
      <p class="head-text">{{ headTitle }}</p>
    </div>
  </div>

  <q-form
    @submit="submit"
    class="q-gutter-md">

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
                      v-on:filterSelected="updateFilters(img.buttonText)"/>
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
                      :placeholder="org.placeholder">
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

    <div class="absolute-bottom">
      <q-btn class="absolute-center" label="Submit" type="submit" color="accent"/>
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
      address: '',
      phone: '',
      email: '',
      img: '',
      age: '',
      perimetre: '',
      thematiques: '',
      postalCode: '',
      municipalities: '',
      city: '',
      dept: '',
      state: '',
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

    updateFilters(selectedButton) {
      console.log(selectedButton);
    },
  },
};
</script>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import {
  defineProps, ref, onMounted, onUnmounted,
} from 'vue';

const headTitle = ref('Inscrire un organisme\n'
  + 'Le guide maux d\'enfants mode d\'emploi est réservé aux services gratuits');
const props = defineProps({
  name: String,
  url: String,
  address: String,
  phone: String,
  email: String,
  img: String,
  age: String,
  perimetre: String,
  thematiques: String,
  postalCode: String,
  municipalities: String,
  city: String,
  dept: String,
  state: String,
});

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
    title: 'Adresse',
    description: 'Renseignez l\'adresse de l\'organisme',
    placeholder: 'adresse de l\'organisme',
    model: props.address,
  },
  [
    {
      title: 'Téléphone',
      description: 'Renseignez le téléphone de l\'organisme',
      placeholder: 'Téléphone de votre organisme',
      model: props.phone,
    },
    {
      title: 'Email',
      description: 'Renseignez l\'email de l\'organisme',
      placeholder: 'Email de votre organisme',
      model: props.email,
    },
  ],
  {
    title: 'Logo',
    description: 'Renseignez le logo de votre organisme',
    placeholder: 'Logo de l\'organisme',
    model: props.img,
  },
  {
    title: 'Thématiques',
    placeholder: 'Thématiques de l\'organisme',
    model: props.thematiques,
    logo: [
      {
        buttonText: 'Addiction',
        urlIcon: addictionUrl,
        tooltip: 'Drogue, écrans, tabac, alcool, pornographie, sexe...',
      },
      {
        buttonText: 'Violence',
        urlIcon: violenceUrl,
        tooltip: 'Violences physiques, sexuelles, psychologiques, cyber-violences...',
      },
      {
        buttonText: 'Discrimination',
        urlIcon: discriminationUrl,
        tooltip: `Raciale, sociale, religieuse, sexiste, culturelle, transphobie,
                basée sur l'orientation sexuelle, l'apparence physique, le handicap...`,
      },
      {
        buttonText: 'Harcèlement',
        urlIcon: harasmentUrl,
        tooltip: 'Scolaire, périscolaire, cyberharcèlement, intrafamilial, harcèlement de rue...',
      },
      {
        buttonText: 'Santé mentale',
        urlIcon: mentalHealthUrl,
        tooltip: 'Dépression, phobies, envies suicidaires, anxiété, isolement...',
      },
      {
        buttonText: 'Sexualité',
        urlIcon: sexualityUrl,
        tooltip: 'Prévention, genre, orientation sexuelle, prostitution...',
      },
    ],
  },
  {
    title: 'Age',
    placeholder: 'Age de l\'organisme',
    model: props.age,
    logo: [
      {
        buttonText: 'Petite enfance',
        urlIcon: enfance,
        tooltip: 'Petite enfance',
      },
      {
        buttonText: 'Primaire',
        urlIcon: primaire,
        tooltip: 'Primaire',
      },
      {
        buttonText: 'Collège',
        urlIcon: college,
        tooltip: 'Collège',
      },
      {
        buttonText: 'Lycée',
        urlIcon: lycee,
        tooltip: 'Lycée',
      },
      {
        buttonText: 'Jeune adulte',
        urlIcon: adulte,
        tooltip: 'Jeune adulte',
      },
    ],
  },
  {
    title: 'Périmètre d\'action',
    description: 'Sélectionner la couverture territorial de l\'organisme. Par défaut le service sera présenté également aux communes limitrophes',
    placeholder: 'Périmètre de l\'organisme',
    model: props.perimetre,
    logo: [
      {
        buttonText: 'Municipal',
        urlIcon: 'statics/perimeter-icons/municipal.png',
        tooltip: 'Municipal',
      },
      {
        buttonText: 'Départemental',
        urlIcon: 'statics/perimeter-icons/departemental.png',
        tooltip: 'Départemental',
      },
      {
        buttonText: 'Régional',
        urlIcon: 'statics/perimeter-icons/region.png',
        tooltip: 'Régional',
      },
      {
        buttonText: 'National',
        urlIcon: 'statics/perimeter-icons/national.png',
        tooltip: 'National',
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
    {
      title: 'Ville',
      description: 'Renseignez la ville de l\'organisme',
      placeholder: 'Ville de l\'organisme',
      model: props.city,
    },
    {
      title: 'Département',
      description: 'Renseignez le département de l\'organisme',
      placeholder: 'Département de l\'organisme',
      model: props.dept,
    },
    {
      title: 'Region',
      description: 'Renseignez la région de l\'organisme',
      placeholder: 'Région de l\'organisme',
      model: props.state,
    },
  ],
]);

const windowWidth = ref(window.innerWidth);
function onWidthChange() {
  windowWidth.value = window.innerWidth;
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
</style>
