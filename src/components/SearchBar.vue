<template>
  <q-input  dense debounce="400" v-model="text" class="search" type="text"
            placeholder="Veuillez entrer une ville ou un code postal..."
            @keyup.enter="onInputChange"
            @keyup.delete="onInputChange"
            @keyup.esc="resetInput">
    <template v-slot:prepend>
      <q-icon name="room" class="search-button q-pl-sm"/>
    </template>
    <template v-slot:append>
      <q-icon name="search" class="search-button q-pr-sm cursor-pointer"
                @click="onInputChange"/>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'searchbar-component',
  data() {
    return {
      text: '',
    };
  },
  methods: {
    onInputChange() {
      const TEXT = this.text;
      this.$emit('inputSubmitted', TEXT);
    },
    resetInput() {
      this.text = '';
      this.$emit('inputSubmitted', '');
    },
  },
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
