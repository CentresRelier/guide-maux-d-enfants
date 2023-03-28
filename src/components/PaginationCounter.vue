<template>
    <q-pagination
            :value="current"
            model-value="{{ current }}"
            class=""
            :max="this.processNumberOfPages()"
            :max-pages="5"
            :round="true"
            color="light-blue"
            direction-links
            />
</template>

<script>
export default {
  name: 'pagination-counter-component',
  props: ['current', 'organismesTotal', 'pagination'],
  emits: ['current'],
  methods: {
    processNumberOfPages() {
      let nbp = this.organismesTotal / this.pagination;
      if (this.organismesTotal % this.pagination !== 0) {
        nbp += 1;
      }
      return nbp;
    },
  },
};
</script>

<style>

</style>
