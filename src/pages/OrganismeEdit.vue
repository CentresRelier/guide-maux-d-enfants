<template>
  <div>
    <h1>Target Page</h1>
    <p>Received data: {{ receivedData }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Access the route parameter named 'id'
const route = useRoute();

const receivedData = ref(route.params.id);
</script>
