<template>
  <div class="container">
    <div class="row">
      <p class="texte">{{ title }}</p>
    </div>
    <div class="col-md-12 q-mt-sm button-container">
      <router-link
        class="link"
        :to="{ name: `${url}` }">
        <q-btn
          class="button"
          rounded
          disabled
          size="md">
          <p class="texte-button">{{ buttonText }}</p>
          <q-tooltip transition-show="scale"
                     anchor="bottom middle"
                     class="bg-secondary"
                     :offset="[100, 60]">
            Fonctionalité en cours de développement
          </q-tooltip>
        </q-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer-component',
  props: {
    title: String,
    url: String,
    buttonText: String,
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 370px;
  background-color: $green;
  background-image:
    url( 'statics/ellipse1-green-left-svg.svg' ),
    url( 'statics/ellipse2-green-right-svg.svg' );
  background-repeat: no-repeat;
  background-position: left, 100%, 0%;
}

.texte {
  font-weight: 600;
  font-size: 26px;
  line-height: 28px;
  text-align: center;
  color: $secondary;
  white-space: pre-line;
  padding-top: 100px;
}

.row {
  justify-content: center;
}

.button-container {
  text-align: center;
}

.button {
  text-transform: none;
  border: 3px solid $accent;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  color: $accent;
  transition: 0.3s;
}

.button:hover {
  background-color: $accent;
  color: white;
}

.texte-button {
  font-size: 26px;
  margin: 5px 10px 5px 10px;
}

.link {
  text-decoration: none;
}

@media only screen and (min-device-width : 440px) and (max-device-width : 768px) {
  .texte {
    padding-top: 80px;
  }
  .container {
    height: 350px;
  }
}

@media only screen and (min-device-width : 320px) and (max-device-width : 440px) {
  .texte {
    font-size: 24px;
    padding: 60px 8px 0 8px;
  }
  .container {
    height: 350px;
    margin-bottom: 32px;
  }
  .button-container {
    padding: 0px 16px 0 16px;
  }
}
</style>
