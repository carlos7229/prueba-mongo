<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <div>
          Cursos
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn  href="/tutoriales" class="nav-link" text>
       <span >Tutoriales</span>
      </v-btn>
       <v-btn  href="/agregar" class="nav-link" text>
       <span >Agregar Tutorial</span>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
