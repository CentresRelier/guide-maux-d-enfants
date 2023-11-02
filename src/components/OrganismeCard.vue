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
            <p class="title-perimeter title-underline q-pt-sm">Périmètre</p>
            <br>
            <div class="col-xs-0 col-md-1">
            </div>
            <div class="col-xs-12 col-md-10">
              <div class="row row-icons" v-if="organisme.perimeter">
                <div v-for="perimeter in perimeters" :key="perimeter.id">
                  <OrganismeCardIcon
                    v-if="organisme.perimeter.includes(perimeter.name)"
                    :organisme="perimeter" :category="'perimeter'" :tooltip="true"
                  />
                </div>
              </div>
            </div>
            <div class="col-xs-0 col-md-1">
            </div>
          </div>
          <div class="col-xs-12 col-md-12">
            <p class="title-coordinates title-underline">Coordonnées</p>
            <br>
            <p class="coordinates">{{ organisme.coordinate }}</p>
            <p class="coordinates">{{ organisme.code_postal }}</p>
            <p class="coordinates">{{ organisme.ville }}</p>
          </div>
          <div class="col-xs-12 col-md-12 q-mb-md">
            <p class="title-thematique title-underline">Thématiques</p>
            <br>
            <div v-if="organisme.thematique.length <= 3" class="row">
              <div class="col-xs-0 col-md-1">
              </div>
              <div class="col-xs-12 col-md-10">
                <div class="row row-icons">
                  <div v-for="thematique in thematiques" :key="thematique.id">
                    <OrganismeCardIcon
                      v-if="organisme.thematique.includes(thematique.name)"
                      :organisme="thematique" :category="'thematique'" :tooltip="true"
                    />
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
                  <div v-for="thematique in thematiques" :key="thematique.id">
                    <OrganismeCardIcon
                      v-if="organisme.thematique.includes(thematique.name)"
                      :organisme="thematique" :category="'thematique'" :tooltip="true"
                    />
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
            <p class="title-description title-underline">Description</p>
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

<script setup>
import { ref } from 'vue';
import OrganismeCardIcon from 'components/OrganismeCardIcon.vue';

defineProps({
  organisme: {},
});

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

.title-underline {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 2px;
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
