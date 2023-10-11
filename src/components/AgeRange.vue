<template>
  <q-card class="card-range q-pr-sm q-pl-sm">
    <div class="row row-age q-pt-lg">
      <FilterButton :urlIcon="enfance"
                :buttonTexte="'Petite enfance'"
                :tooltip="'Petite enfance'"
                v-on:filterSelected="updateFilters('Petite enfance')"/>
      <FilterButton :urlIcon="primaire"
                :buttonTexte="'Primaire'"
                :tooltip="'Primaire'"
                v-on:filterSelected="updateFilters('Primaire')"/>
      <FilterButton :urlIcon="college"
                :buttonTexte="'Collège'"
                :tooltip="'Collège'"
                v-on:filterSelected="updateFilters('Collège')"/>
      <FilterButton :urlIcon="lycee"
                :buttonTexte="'Lycée'"
                :tooltip="'Lycée'"
                v-on:filterSelected="updateFilters('Lycée')"/>
      <FilterButton :urlIcon="adulte"
                :buttonTexte="'Jeune adulte'"
                :tooltip="'Jeune adulte'"
                v-on:filterSelected="updateFilters('Jeune adulte')"/>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'agerange-component',
  data() {
    return {
      selectedAgeFilters: [],
    };
  },
  methods: {
    updateFilters(ageFilter) {
      if (this.selectedAgeFilters.includes(ageFilter)) {
        this.selectedAgeFilters.splice(this.selectedAgeFilters.indexOf(ageFilter), 1);
      } else {
        this.selectedAgeFilters.push(ageFilter);
      }
      const SELECTED_AGE_FILTERS = this.selectedAgeFilters;
      this.$emit('ageFiltersUpdated', SELECTED_AGE_FILTERS);
    },
  },
};
</script>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import { ref } from 'vue';

const enfance = ref('statics/age-icons/petiteenfance.png');
const primaire = ref('statics/age-icons/primaire.png');
const college = ref('statics/age-icons/college.png');
const lycee = ref('statics/age-icons/ado.png');
const adulte = ref('statics/age-icons/jeuneadulte.png');

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
