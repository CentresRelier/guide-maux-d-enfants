<template>
  <div class="container">
    <div class="row">
      <p class="texte">{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head-component',
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 128px;
  background-color: $primary;
  background-image:
    url( 'statics/ellipse1.svg' ),
    url( 'statics/ellipse2.svg' );
  background-repeat: no-repeat;
  background-position: left, 100%, 0%;
}

.texte {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: $secondary;
  padding-top: 53px;
}

.row {
  height: 145px;
  justify-content: center;
}
</style>
