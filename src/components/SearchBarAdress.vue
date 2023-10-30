<template>
  <q-input dense debounce="400" v-model="query" class="search" type="text"
            placeholder="Entrez une ville ou un code postal"
            borderless
            @keyup.enter="searchAdress"
            @keyup.delete="searchAdress"
            @keyup.esc="searchAdress">
    <template v-slot:prepend>
      <q-icon name="room" class="search-button icon-search q-pl-sm"/>
    </template>
    <template v-slot:append>
      <q-icon name="search" class="search-button q-pr-sm cursor-pointer"
                @click="searchAdress"/>
    </template>
  </q-input>
  <q-list
      v-if="searchResults.length > 0"
      bordered
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

<script>
// import axios from 'axios';

export default {
  name: 'searchbar-component',
  emits: ['inputSubmitted'],
  data() {
    return {
      query: '',
      searchResults: [],
    };
  },
  methods: {
    async searchAdress() {
      if (this.query.length >= 3) {
        const API_URL = `https://api-adresse.data.gouv.fr/search/?q=${this.query}`;

        try {
          const response = await fetch(API_URL);
          if (response.ok) {
            const data = await response.json();
            const adresses = data.features;
            this.searchResults = adresses.map((adress) => {
              const props = adress.properties;
              const ville = props.city;
              const departement = props.context.split(',')[0];
              const region = props.context.split(',')[1];
              return {
                ville,
                departement,
                region,
                label: props.label,
              };
            });
            this.$emit('inputSubmitted', this.searchResults);
            console.log(this.searchResults);
          } else {
            this.searchResults = [];
            this.$emit('inputSubmitted', this.searchResults);
            console.log('Erreur lors de la requête API');
          }
        } catch (error) {
          console.error('Erreur réseau', error);
        }
      }
    },
    selectAddress(address) {
      this.query = address.label;
      this.searchResults = [];
      console.log('Ville:', address.ville);
      console.log('Région:', address.region);
      console.log('Département:', address.departement);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  border: 3px solid $secondary;
  border-radius: 35px;
  font-size: 20px;
}

.search-button {
  color: $accent;
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
