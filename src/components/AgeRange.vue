<template>
  <div>
    <q-card class="card-range q-pr-sm q-pl-sm">
      <div class="row q-pt-lg">
        <FilterButton :urlIcon="enfance" :buttonTexte="'Petite enfance'"
                  v-on:filterSelected="updateFilters('Petite enfance')"/>
        <FilterButton :urlIcon="primaire" :buttonTexte="'Primaire'"
                  v-on:filterSelected="updateFilters('Enfance')"/>
        <FilterButton :urlIcon="college" :buttonTexte="'Collège'"
                  v-on:filterSelected="updateFilters('Collège')"/>
        <FilterButton :urlIcon="lycee" :buttonTexte="'Lycée'"
                  v-on:filterSelected="updateFilters('Lycée')"/>
        <FilterButton :urlIcon="adulte" :buttonTexte="'Jeune adulte'"
                  v-on:filterSelected="updateFilters('Jeune adulte')"/>
      </div>
    </q-card>
  </div>
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

const enfance = ref('src/assets/age-icons/petiteenfance.png');
const primaire = ref('src/assets/age-icons/primaire.png');
const college = ref('src/assets/age-icons/college.png');
const lycee = ref('src/assets/age-icons/ado.png');
const adulte = ref('src/assets/age-icons/jeuneadulte.png');
</script>

<style lang="scss" scoped>
.card-range {
  height: 125px;
  border-radius: 15px;
  border: 3px solid $secondary;
}
</style>
