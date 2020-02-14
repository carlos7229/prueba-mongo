<template>
  <v-form>
    <v-container>
      <v-row v-if="!creado">
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tutorial.titulo"
            label="Titulo"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
        >
           <v-textarea
            v-model="tutorial.descripcion"
            label="Descripcion"
            required
            ></v-textarea>
        </v-col>
        <v-col>
             <v-btn
                color="success"
                class="mr-4"
                @click="agregarTutorial">
                Agregar
                </v-btn>    
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col>
            <v-alert type="success">
                Tutorial creado satisfactoriamente!
            </v-alert>
        <v-btn
            color="warning"
            class="mr-4"
            @click="nuevoTutorial">
            Agregar Nuevo Tutorial
        </v-btn>  
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "CrearTutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      creado: false
    };
  },
  methods: {
    agregarTutorial() {
      var data = {
        titulo: this.tutorial.titulo,
        descripcion: this.tutorial.descripcion
      };

      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.creado = true;
    },
    
    nuevoTutorial() {
      this.creado = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>