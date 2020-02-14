<template>
 <v-card raised
    class="mx-auto contenedor"
    max-width="60%"
    outlined
  >
  <v-card-title class="headline">{{tutorial.titulo}}</v-card-title>
  <div v-if="tutorial" class="edit-form">
    <form>
      <v-row>
       <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="tutorial.titulo"
            label="Titulo"
          ></v-text-field>
        </v-col>
         <v-col
          cols="12"
        >
           <v-textarea
            v-model="tutorial.descripcion"
            label="Descripcion"
            required
            rows="3"
            ></v-textarea>
        </v-col>
        <v-col
          cols="12"
        >
          <h3>Estado:</h3>
          {{ tutorial.publicado ? "Publicado" : "Pendiente" }}
        </v-col>
      </v-row>
    </form>
    <v-row>
      <v-col class="text-center" cols="12" sm="4" v-if="tutorial.publicado">
        <v-btn depressed small color="primary" 
        @click="actualizarEstado(false)"
        >Despublicar
        </v-btn>
      </v-col>

      <v-col class="text-center" cols="12" sm="4" v-else>
        <v-btn depressed small color="primary" 
        @click="actualizarEstado(true)"
        >Publicar
        </v-btn>
      </v-col>     
      <v-col class="text-center" cols="12" sm="4">
        <v-btn depressed small color="primary"
        @click="actualizarTutorial"
        >Actualizar
        </v-btn>
      </v-col>
       <v-col class="text-center" cols="12" sm="4">
        <v-btn depressed small color="error"
        @click="eliminarTutorial"
        >Eliminar
        </v-btn>
      </v-col>
    </v-row>
    <p>{{ mensaje }}</p>
  </div>
  </v-card>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "tutorial",
  data() {
    return {
      tutorial: null,
      mensaje: ''
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.tutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    actualizarEstado(estado) {
      var data = {
        id: this.tutorial._id,
        titulo: this.tutorial.titulo,
        descripcion: this.tutorial.descripcion,
        publicado: estado
      };

      TutorialDataService.update(this.tutorial._id, data)
        .then(response => {
          this.tutorial.publicado = estado;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    actualizarTutorial() {
      TutorialDataService.update(this.tutorial._id, this.tutorial)
        .then(response => {
          console.log(response.data);
          this.mensaje = 'Tutorial actualizado correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    eliminarTutorial() {
      TutorialDataService.delete(this.tutorial._id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutoriales" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.mensaje = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
  .edit-form{
    padding: 20px;
  }
  .contenedor{
    margin-top: 10px;
  }
</style>