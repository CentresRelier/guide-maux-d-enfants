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
      <div class="row"
         v-if="!Array.isArray(organismeField)"
        :class="{'q-pb-xl': index === organismeFieldsList.length - 1}">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 q-mb-md block-container"
          :class="{'q-mt-xl': index === 0, 'q-mb-md': index < organismeFieldsList.length - 1}">
        <div class="texte-container">
          <div class="row">
            <h6>{{organismeField.title}}</h6>
            <p class="obligatory">*</p>
          </div>
          <div class="row">
            <p>{{organismeField.description}}</p>
          </div>
          <div class="row">
            <q-input
              hide-bottom-space
              borderless
              rounded
              dense
              standout="none"
              model-value=""
              class="input shadow-3"
              :placeholder="organismeField.placeholder"
              v-model="organismeField.model"
              @keydown.esc="resetData(organismeField.model)">
              <template v-slot:append>
                <q-icon color="positive" name="check" class="q-pl-sm"/>
                <q-icon color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
      <div class="col-md-2">
      </div>
      </div>
      <template v-if="Array.isArray(organismeField)">
      <div class="row" :class="{'q-pb-xl': index === organismeFieldsList.length - 1}">
      <div class="col-md-2">
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6"
                 v-for="(org, i) in organismeField"
                 :key="org.name">
            <div class="block-container"
                 v-bind:class="{
                 'q-mr-sm': i === 0,
                 'q-ml-sm': i === organismeField.length - 1,
                 'q-mt-xl' : index === 0,
                 'q-mb-md' : index < organismeFieldsList.length - 1
                 }">
              <div class="row">
                <h6>{{org.title}}</h6>
                <p class="obligatory">*</p>
              </div>
              <div class="row">
                <p>{{org.description}}</p>
              </div>
              <div class="row">
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
      <div class="col-md-2">
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
      organismeName: '',
      organismeUrl: '',
      organismeAddress: '',
      organismePhone: '',
      organismeEmail: '',
      organismeImg: '',
      organismeAge: '',
      organismePerimetre: '',
      organismeThématiques: '',
      organismePostalCode: '',
      organismeMunicipalities: '',
      organismeCity: '',
      organismeDept: '',
      organismeState: '',
    };
  },
  methods: {
    resetData(toBeReset) {
      if (toBeReset === 'organismeName') {
        this.organismeName = '';
      }
      if (toBeReset === 'organismeUrl') {
        this.organismeUrl = '';
      }
    },
  },
};
</script>
<script setup>
import { defineProps, ref } from 'vue';

const headTitle = ref('Inscrire un organisme\n'
  + 'Le guide maux d\'enfants mode d\'emploi est réservé aux services gratuits');
const props = defineProps({
  organismeName: String,
  organismeUrl: String,
});

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
    model: props.organismeName,
  },
  {
    title: 'Site web',
    description: 'URL de la page de l\'organisme ou de l\'agence. Cette page sera utilisée'
            + 'pour recueillir les informations. Si vous êtes propriétaires du site,'
            + 'mettez à jour vos métadonnées, votre logo et les informations de contact.,',
    placeholder: 'Url du site web de votre organisme',
    model: props.organismeUrl,
  },
  {
    title: 'Adresse',
    description: 'Renseignez l\'adresse de l\'organisme',
    placeholder: 'adresse de l\'organisme',
    model: props.organismeAddress,
  },
  [
    {
      title: 'Téléphone',
      description: 'Renseignez le téléphone de l\'organisme',
      placeholder: 'Téléphone de votre organisme',
      model: props.organismePhone,
    },
    {
      title: 'Email',
      description: 'Renseignez l\'email de l\'organisme',
      placeholder: 'Email de votre organisme',
      model: props.organismeEmail,
    },
  ],
  {
    title: 'Logo',
    description: 'Renseignez le logo de votre organisme',
    placeholder: 'Logo de l\'organisme',
    model: props.organismeImg,
  },
  {
    title: 'Age',
    description: 'Renseignez l\'âge de votre organisme',
    placeholder: 'Age de l\'organisme',
    model: props.organismeAge,
  },
  {
    title: 'Périmètre',
    description: 'Renseignez le périmètre de votre organisme',
    placeholder: 'Périmètre de l\'organisme',
    model: props.organismePerimetre,
  },
  {
    title: 'Thématiques',
    description: 'Renseignez les thématiques de votre organisme',
    placeholder: 'Thématiques de l\'organisme',
    model: props.organismeThématiques,
  },
  [
    {
      title: 'Code postal',
      description: 'Renseignez le code postal de l\'organisme',
      placeholder: 'Code postal',
      model: props.organismePostalCode,
    },
    {
      title: 'Commune',
      description: 'Renseignez la commune de l\'organisme',
      placeholder: 'Commune de votre organisme',
      model: props.organismeMunicipalities,
    },
  ],
  {
    title: 'Ville',
    description: 'Renseignez la ville de l\'organisme',
    placeholder: 'Ville de l\'organisme',
    model: props.organismeCity,
  },
  {
    title: 'Département',
    description: 'Renseignez le département de l\'organisme',
    placeholder: 'Département de l\'organisme',
    model: props.organismeDept,
  },
  {
    title: 'Region',
    description: 'Renseignez la région de l\'organisme',
    placeholder: 'Région de l\'organisme',
    model: props.organismeState,
  },
]);
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
}
</style>
