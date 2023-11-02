<template>
  <q-input dense debounce="400" v-model="query" class="search" type="text"
           placeholder="Entrez une adresse ou ville min 3 caractères"
           borderless
  >
    <template v-slot:prepend>
      <q-icon name="room" class="search-button icon-search q-pl-sm"/>
    </template>
    <template v-slot:append>
      <q-icon name="search" class="search-button q-pr-sm cursor-pointer"
                @click="searchAddress"/>
    </template>
  </q-input>
  <q-list
      v-if="searchResults.length > 0"
      bordered
      class="list"
    >
      <q-item
        v-for="address in searchResults"
        :key="address.id"
        clickable
        @click="selectAddress(address)"
      >
        {{ address.label }}
      </q-item>
    </q-list>
</template>

<script setup>
import {
  ref,
  defineEmits,
  watch,
} from 'vue';
import axios from 'axios';

const searchResults = ref([]);
const query = ref([]);

const finalSearchObject = ref({
  ville: '',
  department: '',
  departmentPostalCode: '',
  region: '',
});

const emit = defineEmits(['inputSubmitted', 'finalSearchObject']);

const searchAddress = async () => {
  if (query.value.length >= 3) {
    const API_URL = `https://api-adresse.data.gouv.fr/search/?q=${query.value}`;

    try {
      const response = await axios.get(API_URL);
      if (response.status === 200) {
        const { data } = response;
        const addresses = data.features;
        searchResults.value = addresses.map((address) => {
          const props = address.properties;
          const ville = props.city;
          const departement = props.context.split(', ')[1];
          const departementPostalCode = props.context.split(', ')[0];
          const region = props.context.split(', ').pop();
          return {
            ville,
            departement,
            departementPostalCode,
            region,
            label: props.label,
          };
        });
      } else {
        searchResults.value = [];

        console.log('Erreur lors de la requête API');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  }
};

const preventReload = ref(true);

watch(query, (newQuery) => {
  if (newQuery.length === 0) {
    searchResults.value = [];
  } else if (preventReload.value && newQuery.length >= 3) {
    searchAddress();
  }
  preventReload.value = true;
});

const selectAddress = (address) => {
  query.value = address.label;
  searchResults.value = [];
  preventReload.value = false;
  finalSearchObject.value.ville = address.ville;
  finalSearchObject.value.department = address.departement;
  finalSearchObject.value.departmentPostalCode = address.departementPostalCode;
  finalSearchObject.value.region = address.region;
  emit('finalSearchObject', finalSearchObject.value);
};
</script>

<style lang="scss" scoped>
.search {
  border: 3px solid $secondary;
  border-radius: 35px;
  font-size: 18px;
  max-height: 65px;
}

.search-button {
  color: $accent;
}

.list {
  border: 3px solid $secondary;
  border-radius: 20px;
  font-size: 18px;
}

@media only screen and (min-device-width : 320px) and (max-device-width : 768px) {
  .search {
    border: 3px solid $secondary;
    border-radius: 35px;
    margin-right: 20px;
    margin-left: 0;
  }
}
</style>
