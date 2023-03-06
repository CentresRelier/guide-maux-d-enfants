<template>
  <q-input  dense debounce="400" model-value="" class="search" type="text"
            placeholder="Veuillez entrer une ville ou un code postal...">
    <template v-slot:prepend>
      <q-icon name="room" class="search-button q-pl-sm"/>
    </template>
    <template v-slot:append>
      <q-icon name="search" class="search-button q-pr-sm" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'searchbar-component',
};
</script>

<style lang="scss" scoped>
.search {
  border: 4px solid $secondary;
  border-radius: 35px;
  width: 500px;
}

.search-button {
  color: $accent;
}
</style>
