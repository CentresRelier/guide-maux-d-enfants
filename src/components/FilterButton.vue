<template>
  <div class="button-container">
    <div v-if="this.selected" class="button selected" @click="toggleFilter">
      <q-img class="img" :src="urlIcon" />
      <p class="texte q-pt-sm">{{ buttonTexte }}</p>
      <q-tooltip transition-show="scale"
                 anchor="top middle"
                 class="bg-secondary"
                 :offset="[100, 60]">
        {{ tooltip }}
      </q-tooltip>
    </div>
    <div v-else class="button not-selected" @click="toggleFilter">
      <q-img class="img" :src="urlIcon" />
      <p class="texte q-pt-sm">{{ buttonTexte }}</p>
      <q-tooltip
        transition-show="scale"
        anchor="top middle"
        class="bg-secondary"
        :offset="[100, 60]">
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
.img {
  height: 58px;
  width: 58px;
}

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

.selected {
  background-image:
    url( 'statics/thematique-icons/round-blue.svg' );
  background-repeat: no-repeat;
  background-position: center, 10%,10%;
  opacity: 1;
}

@media only screen and (min-device-width : 387px) and (max-device-width : 768px) {
  .img {
    display: none;
  }
  .button-container {
    height: 50px;
    width: 110px;
    justify-content: center;
  }
  .texte {
    overflow: hidden;
    height: 55px;
    padding-top: 15px;
    font-size: 14px;
  }
  .not-selected {
    opacity: 0.7;
  }
}

@media only screen and (min-device-width : 342px) and (max-device-width : 387px) {
  .img {
    display: none;
  }

  .button-container {
    height: 50px;
    width: 95px;
    justify-content: center;
  }

  .texte {
    height: 50px;
    padding-top: 15px;
    overflow: hidden;
  }

  .not-selected {
    opacity: 0.7;
  }
}

@media only screen and (min-device-width : 280px) and (max-device-width : 342px) {
  .img {
    display: none;
  }

  .button-container {
    height: 50px;
    width: 80px;
    justify-content: center;
  }

  .texte {
    height: 50px;
    width: 70px;
    padding-top: 15px;
    overflow: hidden;
  }

  .not-selected {
    opacity: 0.7;
  }
}
</style>
