module.exports = app => {
    const tutoriales = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", tutoriales.create);
  
    router.get("/", tutoriales.findAll);
  
    router.get("/publicados", tutoriales.findAllPublished);
  
    router.get("/:id", tutoriales.findOne);
  
    router.put("/:id", tutoriales.update);
  
    router.delete("/:id", tutoriales.delete);
  
    router.delete("/", tutoriales.deleteAll);
  
    app.use('/api/tutoriales', router);
  };