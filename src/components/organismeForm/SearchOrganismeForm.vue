<template>
  <div class="container">
    <q-input dense debounce="400" v-model="query" class="search q-mr-sm" type="text"
            placeholder="Entrez le nom de votre organisme"
            borderless
            @update:model-value="searchOrganismes"
    >
      <template v-slot:prepend>
        <q-icon v-if="isValid" color="positive" name="check" class="q-pr-sm"/>
        <q-icon v-if="isInvalid" color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
      </template>
      <template v-slot:append>
        <q-icon v-if="query.length > 1" name="close" class="search-button q-pr-sm cursor-pointer"
                @click="cleanSearch"/>
      </template>
    </q-input>
    <q-list
      v-if="searchResults.length > 0"
      bordered
      class="list q-mr-sm"
    >
      <q-item
        v-for="organisme in searchResults"
        :key="organisme.id"
      >
        {{ organisme.attributes.nom }}
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  computed,
  watchEffect,
} from 'vue';
import axios from 'axios';

const props = defineProps({
  reset: Boolean,
});

const searchResults = ref([]);
const query = ref('');
const emit = defineEmits(['name']);

const isInvalid = computed(() => {
  if (query.value.length === 0 || searchResults.value.length === 0) {
    return false;
  }

  const hasExactMatch = searchResults.value.some((organisme) => organisme.attributes.nom === query.value);

  return hasExactMatch;
});

const isValid = computed(() => {
  if (isInvalid.value) {
    return false;
  }

  if (query.value.length > 3 && searchResults.value.length === 0) {
    return true;
  }

  if (query.value.length > 3 && searchResults.value.length > 0) {
    const uniqueNomValues = new Set(searchResults.value.map((organisme) => organisme.attributes.nom));
    return uniqueNomValues.size === searchResults.value.length;
  }

  return false;
});

function checkIfContain() {
  if (isValid.value) {
    emit('name', { data: query.value, isValid: true });
  }
  if (isInvalid.value) {
    emit('name', { data: query.value, isValid: false });
  }
}

const searchOrganismes = async () => {
  if (query.value.length >= 3) {
    const API_URL = `https://guide.centresrelier.org/bd/api/organismes?filters[nom][$contains]=${query.value}`;
    try {
      const response = await axios.get(API_URL);
      if (response.status === 200) {
        const { data } = response;
        searchResults.value = data.data;
      } else {
        searchResults.value = [];
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  }
  checkIfContain();
};

const preventReload = ref(true);

watch(query, (newQuery) => {
  if (newQuery.length >= 0 && newQuery.length <= 3) {
    searchResults.value = [];
  } else if (preventReload.value && newQuery.length >= 3) {
    searchOrganismes();
  }
  preventReload.value = true;
});

function cleanSearch() {
  query.value = '';
  emit('name', { value: query.value, isValid: false });
}

watchEffect(() => {
  if (props.reset === true) {
    cleanSearch();
  }
});
</script>

<style lang="scss" scoped>
.search {
  border: 4px solid $secondary;
  background-color: white;
  border-radius: 35px;
  font-size: 18px;
  max-height: 65px;
  padding-left: 10px;
}

.search-button {
  color: $accent;
}

.list {
  border: 4px solid $secondary;
  border-radius: 20px;
  font-size: 18px;
  background-color: white;
  margin-top: 5px;
}

.unique-list {
  border: 3px solid $secondary;
  border-radius: 35px;
  font-size: 18px;
  max-height: 45px;
}

.unique-item {
  padding-top: 6px;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 768px) {
  .search {
    border: 4px solid $secondary;
    border-radius: 35px;
    margin-right: 10px;
    margin-left: 0;
  }
}
</style>
