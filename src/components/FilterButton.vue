<template>
  <div class="button-container">
    <div class="button not-selected"
         :class="{ selected: selected }"
         :style="{
           'background-image': `url(${background})`,
           'opacity': selected ? 1 : (hovered ? 0.75 : 0.4)
         }"
         @click="toggleFilter"
         @mouseenter="hovered = true"
         @mouseleave="hovered = false"
    >
      <q-img class="img" :src="props.urlIcon" />
      <p class="texte q-pt-sm">{{ buttonText }}</p>
      <q-tooltip transition-show="scale"
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
  watch,
  toRefs,
} from 'vue';

const props = defineProps({
  urlIcon: String,
  buttonText: String,
  tooltip: String,
  category: String,
});

const selected = ref(false);
const hovered = ref(false);
const background = ref('statics/thematique-icons/round-blue.svg');

const { category } = toRefs(props);

const emit = defineEmits(['filterSelected', 'isInLocalStorage']);
const toggleFilter = () => {
  selected.value = !selected.value;
  emit('filterSelected');
};

function isSelectedInLocalStorage() {
  const selectedFilters = ref([]);
  const selectedAgeFilters = ref([]);
  const storedFilters = localStorage.getItem('selectedFilters');
  const storedAgeFilters = localStorage.getItem('selectedAgeFilters');
  if (storedFilters) {
    selectedFilters.value = JSON.parse(storedFilters);
    if (selectedFilters.value.includes(props.buttonText)) {
      selected.value = true;
      emit('isInLocalStorage');
    }
  }

  if (storedAgeFilters) {
    selectedAgeFilters.value = JSON.parse(storedAgeFilters);
    if (selectedAgeFilters.value.includes(props.buttonText)) {
      selected.value = true;
      emit('isInLocalStorage');
    }
  }
}

function categories() {
  if (category.value === 'age') {
    background.value = 'statics/age-icons/round-green.svg';
  }
}

watch(selected, (newSelected) => {
  if (newSelected) {
    hovered.value = false;
  }
});

onMounted(() => {
  isSelectedInLocalStorage();
  categories();
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
