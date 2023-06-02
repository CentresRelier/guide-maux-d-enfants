<template>
  <div>
    <q-btn @click="GoToHelpPage" flat>
      <img class="img" src="/statics/return.svg" />
    </q-btn>
  </div>
</template>

<script setup>
function GoToHelpPage() {
  window.location = '/#/help';
}
</script>
<style scoped>
.img {
  height: 40px;
  width: 40px;
}
</style>
