<template>
  <q-card class="card-categories q-pr-sm q-pl-sm q-hoverable">
    <div class="row q-pt-lg">
      <FilterButton
        :buttonTexte="'Addiction'"
        :urlIcon="addictionUrl"
        :tooltip="'Drogue, écrans, tabac, alcool, pornographie, sexe...'"
        v-on:filterSelected="updateFilters('Addiction')"/>
      <FilterButton
        :buttonTexte="'Violence'"
        :urlIcon="violenceUrl"
        :tooltip="'Violences physiques, sexuelles, psychologiques, cyber-violences...'"
        v-on:filterSelected="updateFilters('Violence')"/>
      <FilterButton
        :buttonTexte="'Sexualité'"
        :urlIcon="sexualityUrl"
        :tooltip="'Prévention, genre, orientation sexuelle, prostitution...'"
        v-on:filterSelected="updateFilters('Sexualité')"/>
      <FilterButton
        :buttonTexte="'Harcèlement'"
        :urlIcon="harasmentUrl"
        :tooltip="'Scolaire, périscolaire, cyberharcèlement, intrafamilial, harcèlement de rue...'"
        v-on:filterSelected="updateFilters('Harcèlement')"/>
      <FilterButton
        :buttonTexte="'Santé mentale'"
        :urlIcon="mentalHealthUrl"
        :tooltip="'Dépression, phobies, envies suicidaires, anxiété, isolement...'"
        v-on:filterSelected="updateFilters('Santé mentale')"/>
      <FilterButton
        :buttonTexte="'Discrimination'"
        :urlIcon="discriminationUrl"
        :tooltip="`Raciale, sociale, religieuse, sexiste, culturelle, transphobie,
                basée sur l'orientation sexuelle, l'apparence physique, le handicap...`"
        v-on:filterSelected="updateFilters('Discrimination')"/>
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
      const SELECTED_FILTERS = this.selectedFilters;
      this.$emit('filtersUpdated', SELECTED_FILTERS);
    },
  },
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

</script>

<style lang="scss" scoped>
.card-categories {
  height: 125px;
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

.button-container {
  height: 100px;
  width: 100px;
  text-align: center;
}

.button-container:hover {
  opacity: 0.6;
  transition: ease-out 300ms;
}

@media only screen and (min-device-width : 440px) and (max-device-width : 768px) {
  .img {
    height: 45px;
    width: 45px;
  }
  .button-container {
    height: 65px;
    width: 65px;
    text-align: center;
  }
  .row {
    padding-top: 16px;
  }
  .card-categories {
    margin-right: 0px;
  }
}

@media only screen and (min-device-width : 343px) and (max-device-width : 440px) {
  .img {
    height: 35px;
    width: 35px;
  }
  .button-container {
    height: 55px;
    width: 55px;
    text-align: center;
  }
  .row {
    padding-top: 16px;
  }
  .card-categories {
    height: 120px;
    border-radius: 15px;
    border: 2px solid $secondary;
    margin-right: 0px;
  }
}
</style>
