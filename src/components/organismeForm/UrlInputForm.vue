<template>
  <q-input
    hide-bottom-space
    borderless
    rounded
    dense
    standout="none"
    class="input shadow-3"
    v-model="text"
    :placeholder="inputMess ? 'Actuellement: ' + inputMess : prefix='https://'"
    @update:model-value="emitUrl()"
  >
  <!-- prefix="https://" -->
    <template v-slot:prepend>
      <q-icon v-if="isUrl" color="positive" name="check" class="q-pl-sm"/>
    </template>
    <template v-slot:append>
      <q-icon v-if="text.length > 0" name="close" class="search-button q-pr-sm cursor-pointer"
              @click="cleanInput"/>
    </template>
  </q-input>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';

const text = ref('');
const emit = defineEmits(['url']);

const props = defineProps({
  reset: Boolean,
  inputMess: {},
});

function isValidURL(url) {
  const urlRegex = /^(https?:\/\/)?(www\.)?([a-z0-9-]+\.)(com|fr|net|org|gov|edu|info|biz|co|uk|de|jp|ca|au)(\/[\w .-]*)*\/?$/i;
  return urlRegex.test(url);
}

const isUrl = computed(() => isValidURL(text.value));

function emitUrl() {
  if (isUrl.value) {
    emit('url', { data: `https://${text.value}`, isValid: true });
  }
  if (!isUrl.value) {
    emit('url', { data: '', isValid: false });
  }
}

function cleanInput() {
  text.value = '';
  emit('url', { data: '', isValid: false });
}

watchEffect(() => {
  if (props.reset === true) {
    cleanInput();
  }
});
</script>

<style scoped>

</style>
