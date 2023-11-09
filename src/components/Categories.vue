<template>
  <q-card class="card-categories q-pr-sm q-pl-sm q-hoverable">
    <div class="row-categories row q-pt-lg">
      <div v-for="button in Buttons" :key="button.id">
        <FilterButton
          :buttonText="button.text"
          :urlIcon="button.url"
          :tooltip="button.tooltip"
          :filterFunction="filterCards"
        />
      </div>
    </div>
    <div class="button-container row">
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'categories-component',
};
</script>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import { ref } from 'vue';

defineProps({
  filterCards: Function,
});

const Buttons = ref([
  {
    text: 'Addiction',
    url: 'statics/thematique-icons/addiction.png',
    tooltip: 'Drogue, écrans, tabac, alcool, pornographie, sexe...',
  },
  {
    text: 'Violence',
    url: 'statics/thematique-icons/violence.png',
    tooltip: 'Violences physiques, sexuelles, psychologiques, cyber-violences...',
  },
  {
    text: 'Sexualité',
    url: 'statics/thematique-icons/discrimination.png',
    tooltip: 'Prévention, genre, orientation sexuelle, prostitution...',
  },
  {
    text: 'Harcèlement',
    url: 'statics/thematique-icons/harcelement.png',
    tooltip: 'Scolaire, périscolaire, cyberharcèlement, intrafamilial, harcèlement de rue...',
  },
  {
    text: 'Santé mentale',
    url: 'statics/thematique-icons/santementale.png',
    tooltip: 'Dépression, phobies, envies suicidaires, anxiété, isolement...',
  },
  {
    text: 'Discrimination',
    url: 'statics/thematique-icons/sexualite.png',
    tooltip: `Raciale, sociale, religieuse, sexiste, culturelle, transphobie,
             basée sur l'orientation sexuelle, l'apparence physique, le handicap...`,
  },
]);
</script>

<style lang="scss" scoped>
.card-categories {
  height: 135px;
  border-radius: 15px;
  border: 3px solid $secondary;
  margin-right: 16px;
}

.q-checkbox {
  display: none;
}

.texte {
  font-size: 12px;
  font-weight: bolder;
  color: #26256C;
}

@media only screen and (min-device-width : 440px) and (max-device-width : 768px) {
  .img {
    display: none;
  }
  .row {
    padding-top: 16px;
  }
  .card-categories {
    height: 120px;
    max-width: 412px;
    border-radius: 15px;
    border: 3px solid $secondary;
    margin-right: 0;
  }
  .row-categories {
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
}

@media only screen and (min-device-width : 338px) and (max-device-width : 440px) {
  .img {
    display: none;
  }
  .card-categories {
    height: 120px;
    border-radius: 15px;
    border: 3px solid $secondary;
    margin-right: 8px;
    margin-left: 8px;
  }
  .row-categories {
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
}

@media only screen and (min-device-width : 280px) and (max-device-width : 338px) {
  .img {
    display: none;
  }
  .row {
    padding-top: 16px;
  }
  .card-categories {
    height: 120px;
    border-radius: 15px;
    border: 3px solid $secondary;
    margin-right: 8px;
    margin-left: 8px;
    padding-right: 0;
    padding-left: 0;
  }
  .row-categories {
    display: flex;
    justify-content: center;
    padding-top: 8px;
  }
}

</style>
