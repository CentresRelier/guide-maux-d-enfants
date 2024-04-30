<template>
  <div>
    <h1>Target Page</h1>
    <p>Received data: {{ receivedData }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const receivedData = ref(route.params.id);
</script>
