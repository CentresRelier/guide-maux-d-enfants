<template>
  <div class="container">
    <Head class="header" :title1="homeTitle1" :title2="homeTitle2"/>
    <div class="row q-pt-md row-categories">
      <div class="col-xs-0 col-sm-2 col-md-2">
        <ReturnButton class="return"/>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-8">
        <div class="row q-col-gutter-lg  row-card">
          <div class="col-12">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Infos pratiques</p>
                <p class="description">{{ text1 }}</p>
                <p class="description">{{ text2 }}</p>

              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-lg  row-card">
          <div class="col-12">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Thèmes/sous thèmes abordés</p>
                <div class="col-12">
                  <div class="row q-ml-md q-pb-sm">
                    <q-img :src="addictionUrl" class="img"/>
                    <p class="theme">
                      Addiction : Drogues, alcool, tabac, pornographie, sexe…
                    </p>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row q-ml-md q-pb-sm">
                    <q-img :src="violenceUrl" class="img"/>
                    <p class="theme">
                      Violences : Violences physiques, sexuelles, psychologiques, cyberviolences…
                    </p>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row q-ml-md q-pb-sm">
                    <q-img :src="discriminationUrl" class="img"/>
                    <p class="theme">
                      Sexualité : Prévention, genre, orientations sexuelles, prostitution…
                    </p>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row q-ml-md q-pb-sm">
                    <q-img :src="harasmentUrl" class="img"/>
                    <p class="theme">
                      Harcèlement : Scolaire, périscolaire, cyberharcèlement, intrafamilial,
                      harcèlement de rue…
                    </p>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row q-ml-md q-pb-sm">
                    <q-img :src="mentalHealthUrl" class="img"/>
                    <p class="theme">
                      Santé mentale : Dépression, phobies, envies suicidaires, anxiété, isolement…
                    </p>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row q-ml-md q-pb-sm">
                        <q-img :src="sexualityUrl" class="img"/>
                        <p class="theme2">
                          Discrimination : Raciale, sociale, religieuses, sexistes, culturelle,
                          transphobie, basée sur l’orientation sexuelle, l’apparence physique,
                          le handicap…
                        </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-lg row-card">
          <div class="col-6">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Localisation</p>
                <p class="description">{{ localisation }}</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Informations présentes</p>
                <p class="description">{{ info }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-lg  row-card">
          <div class="col-6">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Signaler une structure</p>
                <p class="description">{{ structure }}</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Ajouter/modifier une structure</p>
                <p class="description">{{ modifyStructure }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-col-gutter-lg  row-card">
          <div class="col-6">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">Intégrer le guide</p>
                <p class="description">{{ guide }}</p>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="card">
              <div class="q-ml-sm block-container">
                <p class="block-title">A propos</p>
                <p class="description">{{ propose }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-0 col-sm-2 col-md-2">
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Head from 'components/Head.vue';
import ReturnButton from 'components/ReturnButton.vue';

const homeTitle1 = ref('Le guide Maux d\'enfants mode d\'emploi');
const homeTitle2 = ref('Des organismes gratuits pour accompagner vos enfants');

const text1 = ref('Il y a de nombreux services gratuits pour accompagner les souffrances des jeunes au sein d’un territoire qui sont méconnus.');
const text2 = ref('Ce guide a été conçu pour aider les familles et les professionnels de l’enfance à trouver des solutions pour soutenir les jeunes en souffrance qu’ils accompagnent.');
const localisation = ref('La recherche affiche les organismes situés dans un rayon de 5 km autour de la ville recherchée puis les organismes du département et de la région correspondante et enfin les structures nationales');
const info = ref('Les informations collectées sont automatiquement récupérées sur les sites internet des organismes et mises à jour à une fréquence de xx jours.\n'
  + 'Le classement des structures dans les différents thèmes a été réalisé par l’équipe des Centres Relier.');
const structure = ref('Malgré le soin que nous avons apporté à la sélection des structures, si vous détecter un organisme inapproprié signaler le et notre équipe prendre en compte ce signalement.');
const modifyStructure = ref('Si vous souhaitez proposer l’ajout ou la modification d’une structure vous pouvez le faire en complétant le formulaire proposé. Notre équipe étudiera votre proposition et l’intégrera. Si les contenus de certaines structures sont à mettre à jour, nous recommandons de mettre à jour la page du site internet afin que nos informations se mettent à jour automatiquement');
const guide = ref('Ce guide est un bien commun et vous pouvez l’intégrer sur directement sur votre site internet afin d’en faire profiter vos visiteurs.\n'
  + 'Si vous souhaitez intégré seulement les organismes d’une ville et/ou d’un thème, il vous suffit de réaliser la recerche souhaité et de cliquer sur l’icône en bas de page pour obtenir le code permettant ');
const propose = ref('Ce guide a été conçu par l’association les Centres Relier dont l’objet est d’aider les jeunes en souffrance victimes de discrimination, intimidation, harcèlement à se relier à leur environnement. Pour cela, elle développe des dispositifs d’accompagnement des jeunes et des adultes qui les entourent . \n'
  + 'Il a été mis en œuvre grâce au soutien en mécénat de compétence de la Société de Service ASTEK et de Make.org Fundation dans le cadre de la grande cause “Comment protéger les enfants et adolescents contre toutes les formes de violences ? »\n'
  + 'Un grand merci à tous ceux qui ont donné de leurs temps, leur énergie pour que ce guide soit utile au plus grand nombre de jeunes en souffrance.\n');

const addictionUrl = ref('statics/thematique-icons/addiction.png');
const violenceUrl = ref('statics/thematique-icons/violence.png');
const discriminationUrl = ref('statics/thematique-icons/discrimination.png');
const harasmentUrl = ref('statics/thematique-icons/harcelement.png');
const mentalHealthUrl = ref('statics/thematique-icons/santementale.png');
const sexualityUrl = ref('statics/thematique-icons/sexualite.png');

</script>

<style lang="scss" scoped>
.card {
  border: 4px solid $accent;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  padding-right: 20px;
  background-image: url( 'public/statics/background-card.png' );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center, 100%, 0%;
}

.header {
  margin-top: 100px;
}

.row-card {
  padding-bottom: 20px;
}

.block-title {
  font-size: 22px;
  font-weight: bolder;
  color: $accent;
  margin-bottom: 10px;
  margin-top: 15px;
  margin-left: 15px;
}

.description {
  font-size: 18px;
  color: $accent;
  padding: 0 15px 0 15px;
  overflow-wrap: break-word;
  white-space: pre-line;
}

.theme {
  font-size: 18px;
  color: $accent;
  padding: 0 15px 0 15px;
  overflow-wrap: break-word;
  white-space: pre-line;
  margin: 0;
  align-self: center;
}

.theme2 {
  font-size: 18px;
  color: $accent;
  padding: 0 15px 0 15px;
  overflow-wrap: break-word;
  white-space: pre-line;
  margin: 0;
  align-self: center;
  max-width: 95%;
}

.footer {
  height: 128px;
  background-color: $primary;
  background-image:
    url( 'statics/ellipse1.svg' ),
    url( 'statics/ellipse2.svg' );
  background-repeat: no-repeat;
  background-position: left, 100%, 0%;
}

.img {
  height: 58px;
  width: 58px;
}

</style>
