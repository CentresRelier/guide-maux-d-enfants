<template>
  <div>
    <p
      class="coordinates"
      v-for="(item, index) in formated.slice(0, numbers)"
      :key="index"
    >
      <a v-if="$q.screen.lt.sm" :href="`${name}:` + item">{{ item }}</a>
      <span v-else>{{ item }}</span>
    </p>
    <div v-if="formated.length > 3" class="icon-container">
      <div class="container" @click="toggleActiveState(props.name)">
        <q-icon v-if="!isActive" class="img-plus" name="add" size="25px"></q-icon>
        <q-icon v-if="isActive" class="img-plus" name="remove" size="25px"></q-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isActive = ref(false);

const props = defineProps({
  formated: Array,
  name: String,
});

const numbers = ref(3);

function toggleActiveState() {
  isActive.value = !isActive.value;
  if (isActive.value) {
    numbers.value = 100;
  } else {
    numbers.value = 3;
  }
}
</script>

<style scoped lang="scss">
.coordinates {
  white-space: pre-line;
  font-weight: 500;
  color: #26256C;
  font-size: 18px;
  text-align: center;
  margin: 0 24px 5px 24px;
}

.container {
  width: 25px;
  height: 25px;
  text-align-last: center;
  z-index: 100;
}

.img-plus {
  border: 2px solid $accent;
  border-radius: 200px;
  transition: background-color 0.3s;
}

.img-plus:hover {
  background-color: rgba(38, 37, 108, 0.3);
  cursor: pointer;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
