<template>
  <q-input
    hide-bottom-space
    borderless
    rounded
    dense
    prefix="https://"
    standout="none"
    class="input shadow-3"
    v-model="text"
    @update:model-value="emitUrl()"
  >
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
import { computed, ref } from 'vue';

const text = ref('');
const emit = defineEmits(['url']);

const isUrl = computed(() => text.value.length > 0);

function emitUrl() {
  emit('url', { data: `https://${text.value}`, isValid: true });
}

function cleanInput() {
  text.value = '';
  emit('url', { data: '', isValid: false });
}
</script>

<style scoped>

</style>
