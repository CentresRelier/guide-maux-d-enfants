<template>
  <div class="button-container">
    <div v-if="this.selected" class="button selected" @click="toggleFilter">
      <q-img class="img" :src="urlIcon" height="58px" width="58px" />
      <p class="texte q-pt-sm">{{ buttonTexte }}</p>
      <q-tooltip transition-show="scale">
        {{ tooltip }}
      </q-tooltip>
    </div>
    <div v-else class="button not-selected" @click="toggleFilter">
      <q-img class="img" :src="urlIcon" height="58px" width="58px" />
      <p class="texte q-pt-sm">{{ buttonTexte }}</p>
      <q-tooltip transition-show="scale">
        {{ tooltip }}
      </q-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-button-component',
  props: {
    urlIcon: String,
    buttonTexte: String,
    tooltip: String,
  },
  data() {
    return {
      selected: false,
    };
  },
  methods: {
    toggleFilter() {
      this.selected = !this.selected;
      this.$emit('filterSelected');
    },
  },
};
</script>
<script setup>

</script>

<style scoped>

.not-selected {
  opacity: 0.4;
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

.button:hover {
  background-image:
    url( 'statics/thematique-icons/round-blue.svg' );
  background-repeat: no-repeat;
  background-position: center, 10%,10%;
  opacity: 1;
}

.texte {
  font-size: 12px;
  font-weight: bolder;
  color: #26256C;
}

.cat{
  margin: 4px;
  border-radius: 4px;
  border: 1px solid #fff;
  overflow: hidden;
  float: left;
}

.cat label {
  float: left;
  line-height: 3.0em;
  height: 92px;
  width: 92px;
}

.cat label span {
  text-align: center;
  padding: 3px 0;
  display: block;
}

.cat label input {
  position: absolute;
  display: none;
  color: #fff !important;
}
/* selects all of the text within the input element and changes the color of the text */
.cat label input + span {
  color: #fff;
}

/* This will declare how a selected input will look giving generic properties */
.cat input:checked + span {
  color: #ffffff;
}

.action input:checked + span {
  background-color: #F75A1B;

}

.selected {
  background-image:
    url( 'statics/thematique-icons/round-blue.svg' );
  background-repeat: no-repeat;
  background-position: center, 10%,10%;
  opacity: 1;
}

</style>
