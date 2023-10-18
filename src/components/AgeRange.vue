<template>
  <q-card class="card-range q-pr-sm q-pl-sm">
    <div class="row row-age q-pt-lg">
      <div v-for="button in Buttons" :key="button.id">
        <FilterButton :urlIcon="button.url"
                      :buttonText="button.text"
                      :tooltip="button.tooltip"
                      v-on:filterSelected="isNotInLocalStorage(button.text)"
                      v-on:isInLocaleStorage="isInLocalStorage(button.text)"
                      :category="'age'"
        />
      </div>
    </div>
  </q-card>
</template>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import { ref } from 'vue';

const Buttons = ref([
  {
    text: 'Petite enfance',
    url: 'statics/age-icons/petiteenfance.png',
    tooltip: 'Petite enfance',
  },
  {
    text: 'Primaire',
    url: 'statics/age-icons/primaire.png',
    tooltip: 'Primaire',
  },
  {
    text: 'Collège',
    url: 'statics/age-icons/college.png',
    tooltip: 'Collège',
  },
  {
    text: 'Lycée',
    url: 'statics/age-icons/ado.png',
    tooltip: 'Lycée',
  },
  {
    text: 'Jeune adulte',
    url: 'statics/age-icons/jeuneadulte.png',
    tooltip: 'Jeune adulte',
  },
]);

const selectedAgeFilters = ref([]);
const emit = defineEmits(['filtersUpdated']);

const updateFilters = (ageFilter) => {
  if (selectedAgeFilters.value.includes(ageFilter)) {
    selectedAgeFilters.value.splice(selectedAgeFilters.value.indexOf(ageFilter), 1);
  } else {
    selectedAgeFilters.value.push(ageFilter);
  }
  const SELECTED_AGE_FILTERS = selectedAgeFilters.value;
  emit('ageFiltersUpdated', SELECTED_AGE_FILTERS);
};

function isInLocalStorage(ageFilter) {
  updateFilters(ageFilter);
}

function isNotInLocalStorage(ageFilter) {
  updateFilters(ageFilter);
  localStorage.setItem('selectedAgeFilters', JSON.stringify(selectedAgeFilters.value));
}
</script>

<style lang="scss" scoped>
.card-range {
  height: 135px;
  border-radius: 15px;
  border: 3px solid $secondary;
}

@media only screen and (min-device-width : 440px) and (max-device-width : 768px) {
  .button-container {
    height: 50px;
    max-width: 412px;
    text-align: center;
  }
  .card-range {
    display: flex;
    justify-content: center;
    padding-top: 8px;
    height: 120px;
    margin-top: 8px;
  }
  .texte {
    padding-top: 0;
  }
  .row-age {
    padding-top: 0;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (min-device-width : 343px) and (max-device-width : 440px) {
  .button-container {
    height: 50px;
    max-width: 412px;
    text-align: center;
  }
  .card-range {
    padding-top: 8px;
    margin-right: 16px;
    margin-left: 16px;
    height: 120px;
  }
  .texte {
    padding-top: 0;
  }
  .row-age {
    padding-top: 0;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 343px) {
  .texte {
    width: 45px;
  }
  .button-container {
    height: 50px;
    max-width: 412px;
    text-align: center;
  }
  .card-range {
    padding-top: 8px;
    margin-right: 16px;
    margin-left: 16px;
    height: 120px;
  }
  .texte {
    padding-top: 0;
    width: 80px;
  }
  .row-age {
    padding-top: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
