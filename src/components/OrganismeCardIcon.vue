<template>
  <div class="icon-container" :style="{ 'background-image': `url(${background})` }">
    <q-img :src="organisme.url"
           class="img"
           height="55px"
           width="55px"/>
    <q-tooltip v-if="!title" class="tooltip bg-secondary"
               anchor="top middle"
               self="bottom middle"
               :offset="[0, 5]">
      <strong>{{ organisme.tooltip }}</strong>
    </q-tooltip>
  </div>
  <p v-if="title" class="text">{{ organisme.tooltip }}</p>
</template>

<script setup>
import {
  ref,
  onMounted,
  toRefs,
} from 'vue';

const props = defineProps({
  organisme: Object,
  category: String,
  tooltip: Boolean,
});

const background = ref('/statics/thematique-icons/round-blue.png');

const { category, tooltip } = toRefs(props);

const title = ref(false);
const paddingTitle = ref('5px');

function categories() {
  if (category.value === 'perimeter') {
    background.value = '/statics/perimeter-icons/round-yellow.png';
  }
  if (category.value === 'ages') {
    background.value = '/statics/age-icons/round-green.png';
  }
}

function haveTooltip() {
  if (tooltip.value === false) {
    title.value = true;
    paddingTitle.value = '20px';
  }
}

onMounted(() => {
  categories();
  haveTooltip();
});
</script>

<style scoped>
.icon-container {
  background-repeat: no-repeat;
  background-position: center, 100%, 0%;
  padding: 0 v-bind(paddingTitle) 10px v-bind(paddingTitle);
  display: flex;
}

.text {
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
}

.img {
  margin-right: auto;
  margin-left: auto;
}
</style>
