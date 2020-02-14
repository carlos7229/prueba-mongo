import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/tutoriales",
      name: "tutoriales",
      component: () => import("./components/ListaTutoriales")
    },
    {
      path: "/tutoriales/:id",
      name: "detalles del tutorial",
      component: () => import("./components/Tutorial")
    },
    {
      path: "/agregar",
      name: "agregar tutorial",
      component: () => import("./components/CrearTutorial")
    }
  ]
});