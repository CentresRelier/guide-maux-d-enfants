<template>
  <div>
    <q-btn @click="GoToHomePage" flat>
      <img class="img" src="/statics/return.svg" />
    </q-btn>
  </div>
</template>

<script setup>
function GoToHomePage() {
  window.location = '/';
}
</script>
<style scoped>
.img {
  height: 40px;
  width: 40px;
}
</style>
