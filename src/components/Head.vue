<template>
  <div v-if="$q.screen.gt.sm" class="container">
    <div class="row">
      <p class="texte">
        {{ title1 }}
        <br>
        {{ title2 }}
      </p>
    </div>
  </div>
  <div v-else class="container-mobile">
    <div class="row-mobile">
      <p class="texte-mobile">
        {{ title1 }}
        <br>
        {{ title2 }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head-component',
  props: {
    title1: String,
    title2: String,
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

.container-mobile {
  height: 100px;
  background-color: $primary;
  background-image:
    url( 'statics/ellipse1mobile.svg' ),
    url( 'statics/ellipse2mobile.svg' );
  background-repeat: no-repeat;
  background-position: left, 100%, 100%;
}

.texte-mobile {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: $secondary;
  padding: 20px 10px 0px 10px;
  margin-bottom: 0;
  height: 100px;
}

.texte {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: $secondary;
  padding-top: 40px;
}

.row {
  height: 145px;
  justify-content: center;
}

.row-mobile {
  height: 100px;
  justify-content: center;
}

</style>
