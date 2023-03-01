<template>
  <q-card class="card-categories q-pr-sm q-pl-sm q-hoverable">
    <div class="row q-pt-lg">
      <FilterButton
        :buttonTexte="'Addiction'"
        :urlIcon="addictionUrl"
        v-on:filterSelected="updateFilters('Addiction')"/>
      <FilterButton
        :buttonTexte="'Violence'"
        :urlIcon="violenceUrl"
        v-on:filterSelected="updateFilters('Violence')"/>
      <FilterButton
        :buttonTexte="'Discrimination'"
        :urlIcon="discriminationUrl"
        v-on:filterSelected="updateFilters('Discrimination')"/>
      <FilterButton
        :buttonTexte="'Harcèlement'"
        :urlIcon="harasmentUrl"
        v-on:filterSelected="updateFilters('Harcèlement')"/>
      <FilterButton
        :buttonTexte="'Santé mentale'"
        :urlIcon="mentalHealthUrl"
        v-on:filterSelected="updateFilters('Santé mentale')"/>
      <FilterButton
        :buttonTexte="'Sexualité'"
        :urlIcon="sexualityUrl"
        v-on:filterSelected="updateFilters('Sexualité')"/>
    </div>
    <div class="button-container row">
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'categories-component',
  data() {
    return {
      selectedFilters: [],
    };
  },
  methods: {
    updateFilters(filter) {
      if (this.selectedFilters.includes(filter)) {
        this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1);
      } else {
        this.selectedFilters.push(filter);
      }
      const SF = this.selectedFilters;
      this.$emit('filtersUpdated', SF);
    },
  },
};
</script>
<script setup>
import FilterButton from 'components/FilterButton.vue';
import { ref } from 'vue';

const addictionUrl = ref('src/assets/thematique-icons/addiction.png');
const violenceUrl = ref('src/assets/thematique-icons/violence.png');
const discriminationUrl = ref('src/assets/thematique-icons/discrimination.png');
const harasmentUrl = ref('src/assets/thematique-icons/harcèlement.png');
const mentalHealthUrl = ref('src/assets/thematique-icons/santémentale.png');
const sexualityUrl = ref('src/assets/thematique-icons/sexualité.png');

</script>

<style lang="scss" scoped>
.card-categories {
  height: 125px;
  border-radius: 15px;
  border: 3px solid $secondary;
}

.q-checkbox {
  display: none;
}

.texte {
  font-size: 12px;
  font-weight: bolder;
  color: #26256C;
}

.button-container {
  height: 100px;
  width: 100px;
  text-align: center;
  opacity: 0.4;
}

.button-container:hover {
  opacity: 0.6;
  transition: ease-out 300ms;
}
</style>
