<template>
  <div>
    <q-card class="card-range q-pr-sm q-pl-sm">
      <div class="row q-pt-lg">
        <FilterButton :urlIcon="enfance" :buttonTexte="'Petite enfance'"/>
        <FilterButton :urlIcon="primaire" :buttonTexte="'Primaire'"/>
        <FilterButton :urlIcon="college" :buttonTexte="'Collège'"/>
        <FilterButton :urlIcon="lycee" :buttonTexte="'Lycée'"/>
        <FilterButton :urlIcon="adulte" :buttonTexte="'Jeune adulte'"/>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'agerange-component',
};
</script>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import { ref } from 'vue';

const enfance = ref('src/assets/age-icons/petiteenfance.png');
const primaire = ref('src/assets/age-icons/primaire.png');
const college = ref('src/assets/age-icons/collège2.png');
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
