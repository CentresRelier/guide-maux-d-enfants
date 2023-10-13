<template>
  <q-card class="card-categories q-pr-sm q-pl-sm q-hoverable">
    <div class="row-categories row q-pt-lg">
      <FilterButton
        :buttonText="'Addiction'"
        :urlIcon="addictionUrl"
        :tooltip="'Drogue, écrans, tabac, alcool, pornographie, sexe...'"
        v-on:filterSelected="isNotInLocalStorage('Addiction')"
        v-on:isInLocaleStorage="isInLocalStorage('Addiction')"/>
      <FilterButton
        :buttonText="'Violence'"
        :urlIcon="violenceUrl"
        :tooltip="'Violences physiques, sexuelles, psychologiques, cyber-violences...'"
        v-on:filterSelected="isNotInLocalStorage('Violence')"
        v-on:isInLocaleStorage="isInLocalStorage('Violence')"/>
      <FilterButton
        :buttonText="'Sexualité'"
        :urlIcon="sexualityUrl"
        :tooltip="'Prévention, genre, orientation sexuelle, prostitution...'"
        v-on:filterSelected="isNotInLocalStorage('Sexualité')"
        v-on:isInLocaleStorage="isInLocalStorage('Sexualité')"/>
      <FilterButton
        :buttonText="'Harcèlement'"
        :urlIcon="harasmentUrl"
        :tooltip="'Scolaire, périscolaire, cyberharcèlement, intrafamilial, harcèlement de rue...'"
        v-on:filterSelected="isNotInLocalStorage('Harcèlement')"
        v-on:isInLocaleStorage="isInLocalStorage('Harcèlement')"/>
      <FilterButton
        :buttonText="'Santé mentale'"
        :urlIcon="mentalHealthUrl"
        :tooltip="'Dépression, phobies, envies suicidaires, anxiété, isolement...'"
        v-on:filterSelected="isNotInLocalStorage('Santé mentale')"
        v-on:isInLocaleStorage="isInLocalStorage('Santé mentale')"/>
      <FilterButton
        :buttonText="'Discrimination'"
        :urlIcon="discriminationUrl"
        :tooltip="`Raciale, sociale, religieuse, sexiste, culturelle, transphobie,
                basée sur l'orientation sexuelle, l'apparence physique, le handicap...`"
        v-on:filterSelected="isNotInLocalStorage('Discrimination')"
        v-on:isInLocaleStorage="isInLocalStorage('Discrimination')"/>
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

const addictionUrl = ref('statics/thematique-icons/addiction.png');
const violenceUrl = ref('statics/thematique-icons/violence.png');
const discriminationUrl = ref('statics/thematique-icons/discrimination.png');
const harasmentUrl = ref('statics/thematique-icons/harcelement.png');
const mentalHealthUrl = ref('statics/thematique-icons/santementale.png');
const sexualityUrl = ref('statics/thematique-icons/sexualite.png');

const selectedFilters = ref([]);
const emit = defineEmits(['filtersUpdated']);

const updateFilters = (filter) => {
  if (selectedFilters.value.includes(filter)) {
    selectedFilters.value.splice(selectedFilters.value.indexOf(filter), 1);
  } else {
    selectedFilters.value.push(filter);
  }
  const SELECTED_FILTERS = selectedFilters.value;
  emit('filtersUpdated', SELECTED_FILTERS);
};

function isInLocalStorage(ageFilter) {
  updateFilters(ageFilter);
}

function isNotInLocalStorage(ageFilter) {
  updateFilters(ageFilter);
  localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters.value));
}
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
