<template>
  <div>
    <q-input
      hide-bottom-space
      borderless
      rounded
      dense
      standout="none"
      :placeholder="inputMess ? inputMess : 'Code Postal'"
      class="input shadow-3"
      v-model="postalCode"
      @update:model-value="searchCity"
    >
    <template v-slot:prepend>
      <q-icon v-if="isValidPostalcode" color="positive" name="check" class="q-pl-sm"/>
      <q-icon v-if="postalCode.length >= 5 && !isValidPostalcode" color="negative" name="fa-solid fa-xmark" class="q-pr-sm" />
    </template>
    <template v-slot:append>
      <q-icon v-if="postalCode.length > 1" name="close" class="search-button q-pr-sm cursor-pointer"
              @click="cleanSearch"/>
    </template>
    </q-input>
    <q-list
      v-if="searchResults.length > 0"
      bordered
      class="list q-mr-sm"
    >
      <q-item
        v-for="postalCode in searchResults"
        :key="postalCode.id"
        clickable
        @click="selectPostalCode"
      >
        {{ postalCode.codePostal }} - {{ postalCode.nomCommune }}
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import {
  ref, watch, watchEffect,
} from 'vue';
import axios from 'axios';

const postalCode = ref('');
const searchResults = ref([]);
const isValidPostalcode = ref(false);

const address = ref({
  code_postal: '',
  commune: '',
});

const props = defineProps({
  reset: Boolean,
  inputMess: {},
});

const emit = defineEmits(['address']);

function selectPostalCode(noemit = false) {
  address.value.code_postal = searchResults.value[0].codePostal;
  address.value.commune = searchResults.value[0].nomCommune;
  postalCode.value = `${searchResults.value[0].codePostal} - ${searchResults.value[0].nomCommune}`;
  searchResults.value = [];
  isValidPostalcode.value = true;
  if (!(noemit === true)) {
    emit('address', { data: address.value, isValid: true });
  }
}

const searchCity = async () => {
  if (postalCode.value.length === 5) {
    const API_URL = `https://apicarto.ign.fr/api/codes-postaux/communes/${postalCode.value}`;
    try {
      const response = await axios.get(API_URL);
      if (response.status === 200) {
        const { data } = response;
        searchResults.value = data;
      } else {
        searchResults.value = [];
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  }
};

watch(postalCode, (newPostalCode) => {
  if (newPostalCode.length < 5) {
    isValidPostalcode.value = false;
    searchResults.value = [];
  }
});

function cleanSearch() {
  postalCode.value = [];
  searchResults.value = [];
  isValidPostalcode.value = false;
  emit('address', { data: {}, isValid: false });
}

const hasRan = ref(false);

watchEffect(() => {
  if (props.reset === true) {
    cleanSearch();
  }
  if (props.inputMess && !hasRan.value) {
    postalCode.value = props.inputMess;
    searchCity().then(
      () => {
        selectPostalCode(true);
        hasRan.value = true;
      },
    );
  }
});

</script>

<style scoped lang="scss">
.input {
  border: 4px solid $secondary;
  background-color: white;
  border-radius: 35px;
  max-width: 500px;
  font-size: 18px;
  padding-left: 10px;
  margin-right: 10px;
}

.list {
  border: 4px solid $secondary;
  border-radius: 20px;
  font-size: 18px;
  background-color: white;
  margin-top: 5px;
  max-width: 500px;
}

.item {
  padding: 4px 16px 4px 16px;
}
</style>
