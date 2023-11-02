<template>
  <div class="container">
    <router-link
      class="link"
      :to="{ name: 'home' }">
      <div>
        <img class="img" src="/statics/return.svg" />
      </div>
    </router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
.img {
  height: 40px;
  width: 40px;
}

.container {
  width: 40px;
  height: 40px;
  margin-left: 10px;
  border-radius: 200px;
  transition: background-color 0.3s;
  text-align-last: center;
  z-index: 100;
}

.container:hover {
  background-color: rgba(38, 37, 108, 0.3);
  cursor: pointer;
}
</style>
