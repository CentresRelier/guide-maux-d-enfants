<template>
  <q-header class="text-white space-between header sticky">
    <div class="row">
      <div class="col-xs-1 col-sm-2 col-md-2 col1">
      </div>
      <div class="col-xs-11 col-sm-8 col-md-8 col2">
        <div class="row">
          <div class="col-xs-1 col-sm-2 col-md-3 col-logo">
            <q-img class="cursor-pointer" src="statics/CR_logo.svg" height="70px" width="109px"
                      @click="GoToHomePage()"/>
          </div>
          <div class="col-xs-1 col-sm-2 col-md-9 col-link">
            <div class="row row-link">
              <a href="https://centresrelier.org/familles/" class="nav-link nav-link-ltr">
                <p class="link">Parents/jeunes</p>
              </a>
              <a href="https://centresrelier.org/formations/" class="nav-link nav-link-ltr">
                <p class="link">Formations</p>
              </a>
              <a href="https://centresrelier.org/villes" class="nav-link nav-link-ltr">
                <p class="link">Villes</p>
              </a>
              <a href="https://centresrelier.org/partenaires/" class="nav-link nav-link-ltr">
                <p class="link">Partenaires</p>
              </a>
              <a href="https://centresrelier.org/soutenez-nous/" class="nav-link nav-link-ltr">
                <p class="link">Dons</p>
              </a>
              <a href="https://centresrelier.org/actualites/" class="nav-link nav-link-ltr">
                <p class="link">Actualités</p>
              </a>
              <a href="https://centresrelier.org/rejoignez-nous/" class="nav-link nav-link-ltr">
                <p class="link">Rejoignez-nous</p>
              </a>
              <a href="https://centresrelier.org/qui-sommes-nous/" class="nav-link nav-link-ltr">
                <p class="link">A propos</p>
              </a>
              <a href="https://centresrelier.org/contactez-nous/" class="nav-link nav-link-ltr">
                <p class="link">Contact</p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-1 col-sm-2 col-md-2 col3">
      </div>
    </div>
  </q-header>
</template>

<script>
export default {
  name: 'navbar-component',
};
</script>

<script setup>
function GoToHomePage() {
  window.location = '/';
}
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
  background-color: white;
}

.nav-link {
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;
  color: $accent;
  padding: 10px 0;
  margin: 0 10px;
  display: inline-block;
  position: relative;
  opacity: 0.75;
}

.nav-link:hover {
  opacity: 1;
}

.nav-link{
  position:relative;
  text-decoration:none;
  display:inline-block;
}

.nav-link:after {
  color: #26256c;
  display:block;
  content: '';
  border-bottom: solid 2px #e7e7e7;
  transform: scaleX(0);
  transition: transform 350ms ease-in-out;
  transform-origin:100% 50%;
}

.nav-link:hover:after {
  transform: scaleX(1);
  transform-origin:0 50%;
}

.col1 {
  height: 100px;
}

.col-logo {
  height: 100px;
  padding-top: 15px;
  padding-left: 1px;
}

.col-link {
  align-self: center;
}

.row-link {
  place-content: end;
}

.link {
  margin: 0;
}
</style>
