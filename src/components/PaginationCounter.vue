<template>
    <q-pagination
            :value="current"
            model-value="{{ current }}"
            :max="this.processNumberOfPages()"
            :max-pages="5"
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
