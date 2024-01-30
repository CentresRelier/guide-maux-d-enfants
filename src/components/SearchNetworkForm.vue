<template>
  <div>
    <q-btn-dropdown color="white" rounded class="dropdown" text-color="secondary">
      <template v-slot:label>
        <div class="row items-center no-wrap">
          <q-icon v-if="label !== 'Reseau'" color="positive" name="check" class="q-pr-sm"/>
          <div class="text-center">
            {{ label }}
          </div>
        </div>
      </template>
      <q-list>
        <q-item v-for="network in networks" :key="network.id" clickable v-close-popup @click="onItemClick(network)">
          <q-item-section>
            <q-item-label>
              {{ network.attributes.nom }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import {
  onMounted,
  ref,
} from 'vue';
import axios from 'axios';

const networks = ref([]);
const network = ref([]);
const label = ref('Reseau');
const searchNetwork = async () => {
  const API_URL = 'https://guide.centresrelier.org/bd/api/reseaux';
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      const { data } = response;
      networks.value = data.data;
    } else {
      networks.value = [];
      console.log('Erreur lors de la requête API');
    }
  } catch (error) {
    console.error('Erreur réseau', error);
  }
};

const emit = defineEmits(['network']);

function onItemClick(data) {
  network.value = data;
  label.value = network.value.attributes.nom;
  emit('network', { data: network.value, isValid: true });
}

onMounted(() => {
  searchNetwork();
});
</script>

<style scoped lang="scss">
.dropdown {
  border: 4px solid $secondary;
}

.dropdown-text {
  font-size: 18px;
  color: $accent;
  line-height: normal;
  user-select: none;
}
</style>
