<template>
  <q-card class="card-categories q-pr-sm q-pl-sm q-hoverable">
    <div class="row q-pt-lg">
      <FilterButton
        :buttonTexte="'Addiction'"
        :urlIcon="addictionUrl"/>
      <FilterButton
        :buttonTexte="'Violence'"
        :urlIcon="violenceUrl"/>
      <FilterButton
        :buttonTexte="'Discrimination'"
        :urlIcon="discriminationUrl"/>
      <FilterButton
        :buttonTexte="'Harcèlement'"
        :urlIcon="harasmentUrl"/>
      <FilterButton
        :buttonTexte="'Santé mentale'"
        :urlIcon="mentalHealthUrl"/>
      <FilterButton
        :buttonTexte="'Sexualité'"
        :urlIcon="sexualityUrl"/>
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
