<template>
    <v-container>
        <v-row dense>
          <v-col v-for="tutorial in tutoriales" :key="tutorial._id">
            <v-card 
                class="mx-auto"
                outlined
                >
                <v-list-item >
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{ tutorial.titulo }}</v-list-item-title>
                    <v-list-item-subtitle>{{ tutorial.descripcion }}</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                <router-link :to="'/tutoriales/' + tutorial._id " >Ver Detalle</router-link>
                </v-card-actions>
            </v-card>
          </v-col>
        </v-row>        
    </v-container>
</template>


<!-- <template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
          <v-text-field
            v-model="titulo"
            placeholder="Consultar por titulo"
            required
          ></v-text-field>
            <v-col>
             <v-btn
                color="success"
                class="mr-4"
                @click="agregarTutorial">
                Agregar
                </v-btn>    
        </v-col>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorials List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentTutorial.titulo }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentTutorial.descripcion }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentTutorial.publicado ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning"
          :href="'/tutorials/' + currentTutorial.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>-->

<script>
import TutorialDataService from "../services/TutorialDataService";

export default {
  name: "lista-tutoriales",
  data() {
    return {
      tutoriales: [],
      titulo: ""
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAll()
        .then(response => {
          this.tutoriales = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>