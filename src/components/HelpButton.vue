<template>
  <router-link
    class="link"
    :to="{ name: 'help' }">
    <div class="container">
      <img class="img" src="/statics/i.png" />
    </div>
  </router-link>
</template>
<script setup>
</script>
<style scoped>
.img {
  width: 14px;
  padding-top: 7px;
}
.container {
  width: 50px;
  height: 50px;
  border: 3px solid #26256C;
  border-radius: 200px;
  margin-left: 10px;
  transition: background-color 0.3s;
  text-align-last: center;
}

.container:hover {
  background-color: rgba(38, 37, 108, 0.3);
  cursor: pointer;
}
</style>
