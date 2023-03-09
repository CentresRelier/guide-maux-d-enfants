<template>

  <div class="head">
    <div class="row-head">
      <p class="head-text">{{ headTitle }}</p>
    </div>
  </div>

  <q-form
    @submit="submit"
    class="q-gutter-md">

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 q-mt-xl q-mb-md block-container">
        <div class="texte-container">
          <div class="row">
            <h6>Nom de l'organisme (et agence si applicable)</h6>
            <p class="obligatory">*</p>
          </div>
          <div class="row">
            <p>Ajouter le nom de la commune de l'agence à référencer
              (il faut donc faire une fiche par agence). Par exemple,
              les Points Accueil Ecoute Jeunes sont partout en France :
              Point Accueil Ecoute Jeunes - Antibes, puis Point Accueil
              Ecoute Jeunes - Meudon, etc... Si l'organisme à plusieurs
              agences, merci de renseigner une fiche par agence avec
              l'url de chaque agence</p>
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
              placeholder="votre réponse">
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

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 q-mb-md block-container">
        <div class="row">
          <h6>Site web</h6>
          <p class="obligatory">*</p>
        </div>
        <div class="row">
          <p>URL de la page de l'organisme ou de l'agence. Cette page sera utilisé
            pour recueillir les informations. Si vous êtes propriétaires du site
            mettez à jour vos métadonnées, votre logo et les informations de contact</p>
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
            placeholder="votre réponse">
            <template v-slot:append>
              <q-icon color="positive" name="check" class="q-pl-sm"/>
              <q-icon color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 q-mb-md block-container">
        <div class="row">
          <h6>Thématique</h6>
          <p class="obligatory">*</p>
        </div>
        <div class="row">
        </div>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 q-mb-md block-container">
        <div class="row">
          <h6>Tranche d'age</h6>
          <p class="obligatory">*</p>
        </div>
        <div class="row">
        </div>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8 q-mb-md block-container">
        <div class="row">
          <h6>Périmètre d'action</h6>
          <p class="obligatory">*</p>
        </div>
        <div class="row">
          <p>Sélectionner la couverture territorial de l'organisme.
            Par défaut le service sera présenté également aux
            communes limitrophes</p>
        </div>
      </div>
      <div class="col-md-2">
      </div>
    </div>

    <div class="row q-pb-xl">
      <div class="col-md-2">
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6">
            <div class="block-container q-mr-sm">
              <div class="row">
                <h6>Commune</h6>
                <p class="obligatory">*</p>
              </div>
              <div class="row">
                <p><br></p>
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
                  placeholder="votre réponse">
                  <template v-slot:append>
                    <q-icon color="positive" name="check" class="q-pl-sm"/>
                    <q-icon color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="block-container q-ml-sm">
              <div class="row">
                <h6>Code postal</h6>
                <p class="obligatory">*</p>
              </div>
              <div class="row">
                <p>Entrer le code postal au format xxxxx </p>
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
                  placeholder="votre réponse">
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

    <div>
      <q-btn label="Submit" type="submit" color="accent"/>
    </div>

  </q-form>

  <div class="footer">
  </div>
</template>

<script>
export default {
  name: 'subscribe-page',
};
</script>
<script setup>
import { ref } from 'vue';

const headTitle = ref('Inscrire un organisme\n'
  + 'Le guide maux d\'enfants mode d\'emploi est réservé aux services gratuits');
</script>

<style lang="scss" scoped>
.head {
  height: 128px;
  margin-top: 100px;
  background-color: $green;
  background-image:
    url( 'statics/ellipse1-green-head-left.svg' ),
    url( 'statics/ellipse1-green-head-right.svg' );
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
    url( 'statics/ellipse1-green-left-svg.svg' ),
    url( 'statics/ellipse2-green-right-svg.svg' );
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
