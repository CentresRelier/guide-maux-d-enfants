<template>
  <q-card class="card q-mt-lg q-mb-sm">
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <div class="row row-mobile">
          <div class="col-xs-12 col-md-12 col col-mobile">
            <div class="img-container q-mt-md q-ml-md">
              <img class="img" :src="organisme.img" alt="organisme-logo"/>
            </div>
          </div>
          <div v-if="$q.screen.lt.md" class="col-xs-12 col-md-12">
            <div class="row">
              <div class="col-xs-0 col-md-5"></div>
              <div class="col-xs-12 col-md-7">
                <p class="title q-pt-lg  q-pr-lg q-ml-lg">{{ organisme.title }}</p>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-12">
            <p class="title-perimeter">Périmètre :</p>
            <br>
            <div class="col-xs-0 col-md-1">
            </div>
            <div class="col-xs-12 col-md-10">
              <div class="row row-icons" v-if="organisme.perimeter">
                <div v-if="organisme.perimeter.includes('1-Municipal')"
                     class="icon-container-perimeter"
                >
                  <q-img src="statics/perimeter-icons/municipal.png"
                         height="55px"
                         width="55px"/>
                  <q-tooltip class="tooltip bg-secondary"
                             anchor="top middle"
                             self="bottom middle"
                             :offset="[0, 5]">
                    <strong>Municipal</strong>
                  </q-tooltip>
                </div>
                <div v-if="organisme.perimeter.includes('2-Départemental')"
                     class="icon-container-perimeter"
                >
                  <q-img src="statics/perimeter-icons/region.png"
                         height="55px"
                         width="55px"/>
                  <q-tooltip class="tooltip bg-secondary"
                             anchor="top middle"
                             self="bottom middle"
                             :offset="[0, 5]">
                    <strong>Départemental</strong>
                  </q-tooltip>
                </div>
                <div v-if="organisme.perimeter.includes('3-Régional')"
                     class="icon-container-perimeter"
                >
                  <q-img src="statics/perimeter-icons/region.png"
                         height="55px"
                         width="55px"/>
                  <q-tooltip class="tooltip bg-secondary"
                             anchor="top middle"
                             self="bottom middle"
                             :offset="[0, 5]">
                    <strong>Régional</strong>
                  </q-tooltip>
                </div>
                <div v-if="organisme.perimeter.includes('4-National')"
                     class="icon-container-perimeter"
                >
                  <q-img src="statics/perimeter-icons/national.png"
                         height="55px"
                         width="55px"/>
                  <q-tooltip class="tooltip bg-secondary"
                             anchor="top middle"
                             self="bottom middle"
                             :offset="[0, 5]">
                    <strong>National</strong>
                  </q-tooltip>
                </div>
              </div>
            </div>
            <div class="col-xs-0 col-md-1">
            </div>
          </div>
          <div class="col-xs-12 col-md-12">
            <p class="title-coordinates">Coordonnées :</p>
            <br>
            <p class="coordinates">{{ organisme.coordinate }}</p>
          </div>
          <div class="col-xs-12 col-md-12 q-mb-md">
            <p class="title-thematique">Thématiques :</p>
            <br>
            <div v-if="organisme.thematique.length <= 3" class="row">
              <div class="col-xs-0 col-md-1">
              </div>
              <div class="col-xs-12 col-md-10">
                <div class="row row-icons">
                  <div v-if="organisme.thematique.includes('Addiction')" class="icon-container">
                    <q-img src="statics/thematique-icons/addiction.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Addiction</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Violence')" class="icon-container">
                    <q-img src="statics/thematique-icons/violence.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Violence</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Discrimination')"
                          class="icon-container">
                    <q-img src="statics/thematique-icons/discrimination.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Discrimination</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Harcèlement')" class="icon-container">
                    <q-img src="statics/thematique-icons/harcelement.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Harcèlement</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Santé mentale')" class="icon-container">
                    <q-img src="statics/thematique-icons/santementale.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Santé mentale</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Sexualité')" class="icon-container">
                    <q-img src="statics/thematique-icons/sexualite.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Sexualité</strong>
                    </q-tooltip>
                  </div>
                </div>
              </div>
              <div class="col-xs-0 col-md-1">
              </div>
            </div>

            <div v-if="organisme.thematique.length > 3" class="row">
              <div class="col-xs-1 col-md-2">
              </div>
              <div class="col-xs-10 col-md-8">
                <div class="row row-icons">
                  <div v-if="organisme.thematique.includes('Addiction')" class="icon-container">
                    <q-img src="statics/thematique-icons/addiction.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Addiction</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Violence')" class="icon-container">
                    <q-img src="statics/thematique-icons/violence.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Violence</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Discrimination')"
                          class="icon-container">
                    <q-img src="statics/thematique-icons/discrimination.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Discrimination</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Harcèlement')" class="icon-container">
                    <q-img src="statics/thematique-icons/harcelement.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Harcèlement</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Santé mentale')" class="icon-container">
                    <q-img src="statics/thematique-icons/santementale.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Santé mentale</strong>
                    </q-tooltip>
                  </div>
                  <div v-if="organisme.thematique.includes('Sexualité')" class="icon-container">
                    <q-img src="statics/thematique-icons/sexualite.png"
                           height="55px"
                           width="55px"/>
                    <q-tooltip class="tooltip bg-secondary"
                               anchor="top middle"
                               self="bottom middle"
                               :offset="[0, 5]">
                      <strong>Sexualité</strong>
                    </q-tooltip>
                  </div>
                </div>
              </div>
              <div class="col-xs-1 col-md-2">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-8">
        <div class="row">
          <div v-if="$q.screen.gt.sm" class="col-md-12">
            <div class="row">
              <div class="col-xs-0 col-md-5"></div>
              <div class="col-xs-12 col-md-7">
                <p class="title q-pt-lg  q-pr-lg q-ml-lg">{{ organisme.title }}</p>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-12 texte-container">
            <p class="title-description">Description :</p>
            <br>
            <p class="description">{{ organisme.description }}</p>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-md-12 q-mb-md button-container">
        <router-link
          class="link"
          :to="{ name: 'organismeDetail', params: { id: organisme.id } }">
          <q-btn
            class="button"
            rounded
            size="md">
            En savoir +
          </q-btn>
        </router-link>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'organisme-card-component',
  props: {
    organisme: {},
  },
};

</script>

<style lang="scss" scoped>
.card {
  border: 4px solid $accent;
  border-radius: 15px;
  width: 980px;
  background-image: url( 'public/statics/background-card.png' );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center, 100%, 0%;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  object-fit: contain;
  overflow: hidden;
  margin-right: 25px;
}

.img {
  height: 100%;
  max-height: 172px;
  min-height: 172px;
  object-fit: contain;
  border-radius: 10px;
}

.title-coordinates {
  font-weight: 900;
  color: $accent;
  font-size: 18px;
  text-align: center;
  margin: 10px 24px 0 24px;
}

.title-perimeter {
  font-weight: 900;
  color: $accent;
  font-size: 18px;
  text-align: center;
  margin: 10px 24px 0 24px;
}

.coordinates {
  white-space: pre-line;
  font-weight: 500;
  color: #26256C;
  font-size: 18px;
  text-align: center;
  margin: 0 24px 15px 24px;
}

.title-thematique, .title-age {
  font-weight: 900;
  color: $accent;
  font-size: 18px;
  text-align: center;
  margin: 10px 24px 0 24px;
}

.title {
  font-size: 24px;
  font-weight: bolder;
  color: $accent;
  text-align: center;
}

.title-description {
  font-weight: 900;
  color: $accent;
  font-size: 18px;
  margin: 0;
}

.texte-container {
  overflow-wrap: break-word;
  padding-right: 24px;
}

.description {
  white-space: pre-line;
  font-weight: 500;
  color: $accent;
  font-size: 18px;
}

.button-container {
  text-align: center;
}

.button {
  text-transform: none;
  border: 3px solid $accent;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  font-size: 28px;
  color: $accent;
  transition: 0.3s;
}

.button:hover {
  background-color: $accent;
  color: white;
}

.link {
  text-decoration: none;
}

.row-icons {
  justify-content: center;
}

.icon-container {
  background-image:
    url( 'public/statics/thematique-icons/round-blue.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 5px 10px 5px;
}

.icon-container-perimeter {
  background-image:
    url( 'public/statics/perimeter-icons/round-yellow.svg' );
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 5px 10px 5px;
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
  .texte-container {
    padding-right: 24px;
    padding-left: 24px;
    text-align: center;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 768px) {
  .card {
    border: 4px solid $accent;
    border-radius: 15px;
    width: 100%;
    margin-right: 20px;
    margin-left: 20px;
    background-image: url('public/statics/background-card.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center, 100%, 0%;
  }
  .row-mobile {
    flex-direction: column;
  }
  .texte-container {
    padding: 0 16px 0 16px;
    margin: 0;
  }
  .title {
    padding-top: 25px;
    font-size: 28px;
  }
  .title-coordinates {
    font-weight: bold;
    font-size: 24px;
    padding-top: 24px;
  }
  .title-thematique {
    font-weight: bold;
    font-size: 24px;
    padding-top: 24px;
  }
  .title-perimeter {
    font-weight: bold;
    font-size: 24px;
    padding-top: 24px;
  }
  .title-description {
    font-weight: bold;
    font-size: 24px;
    padding-top: 24px;
    text-align: center;
  }
  .img-container {
    margin-right: 18px;
  }
  .img {
    height: 100%;
    min-height: 200px;
    object-fit: cover;
    border-radius: 10px;
    max-width: 80vw;
  }
  .row-icons {
    justify-content: center;
    place-content: center;
  }
  .col-mobile {
    min-height: 220px;
  }
  .button-container {
    margin-top: 16px;
    margin-bottom: 32px;
  }
  .button {
    height: 45px;
    width: 170px;
  }
}
</style>
