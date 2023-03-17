<template>
    <q-pagination
            :value="current"
            model-value="{{ current }}"
            class=""
            :max="5"
            :round="true"
            color="light-blue"
            />
</template>

<script>
export default {
  props: ['current'],
  emits: ['current'],
};
</script>

<style>

</style>
