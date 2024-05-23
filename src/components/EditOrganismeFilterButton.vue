<template>
  <div class="button-container">
    <div class="button not-selected"
        :class= "{selected: inputMess.includes(buttonText) ? 'selected' : buttonState}"
        :style="buttonStyle"
        @click="toggleFilter();filterFunction();emit('reset')"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
    <!-- :class="{ selected: inputMess === true ? 'selected' : buttonState }" -->
    <!-- { selected: inputMess.includes(buttonText) ? 'test' : buttonState } -->
    <!-- { selected : inputMess.includes(buttonText) ? buttonText : buttonState } -->
      <q-img class="img" :src="props.urlIcon" />
      <p class="texte q-pt-sm">{{ buttonText }}</p>
      <q-tooltip v-if="tooltip === true"
                 transition-show="scale"
                 anchor="top middle"
                 class="bg-secondary"
                 :offset="[100, 60]">
        {{ props.tooltip }}
      </q-tooltip>
    </div>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
  toRefs,
  computed,
} from 'vue';

import { useFiltersStore } from 'stores/filterButton';

const store = useFiltersStore();
const emit = defineEmits(['reset']);

const props = defineProps({
  urlIcon: String,
  buttonText: String,
  tooltip: String,
  tooltipActive: String,
  category: String,
  filterFunction: Function,
  inputMess: Array,
});

const hovered = ref(false);
const tooltip = ref(true);
const background = ref('statics/thematique-icons/round-blue.png');

const { category } = toRefs(props);

const buttonState = computed(() => store.getButtonState(props.buttonText));
const buttonStyle = computed(() => ({
  'background-image': `url(${background.value})`,
  opacity: buttonState.value ? 1 : hovered.value ? 0.75 : 0.4,
}));

const toggleFilter = () => {
  store.toggleButtonState(props.buttonText);
};

function categories() {
  if (category.value === 'age') {
    background.value = 'statics/age-icons/round-green.png';
  }
  if (category.value === 'perimeter') {
    background.value = 'statics/perimeter-icons/round-yellow.png';
  }
}

function checkTooltip() {
  if (props.tooltipActive === 'false') {
    tooltip.value = false;
  }
}

onMounted(() => {
  categories();
  checkTooltip();
});
</script>

<style scoped>
.img {
  height: 58px;
  width: 58px;
}

.not-selected {
  opacity: 0.4;
}

.not-selected:hover {
  cursor: pointer;
}

.button-container {
  height: 100px;
  width: 100px;
  text-align: center;
}

.button:hover {
  background-repeat: no-repeat;
  background-position: center, 10%,10%;
  transition: ease-out 300ms;
}

.texte {
  font-size: 12px;
  font-weight: bolder;
  color: #26256C;
}

.button {
  background-repeat: no-repeat;
  background-position: center, 10%,10%;
}

.selected {
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
