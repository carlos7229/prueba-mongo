const db = require("../models");
const Tutorial = db.tutoriales;

// Crear y guardar un nuevo Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.titulo) {
      res.status(400).send({ message: "No se puede crear un tutorial sin titulo"});
      return;
    }
    
    //Crear Objeto tutorial
    const tutorial = new Tutorial({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      publicado: req.body.publicado ? req.body.publicado : false
    });
  
    // Guardar tutorial en base de datos
    tutorial
      .save(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error mientras se creaba el tutorial"
        });
      });
  };

// Obtener todos los tutoriales de la base de datos
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condicion = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};
  
    Tutorial.find(condicion)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al obtener los tutoriales"
        });
      });
  };

// Obtener  tutorial por Id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No se encontro un tutorial con id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Ocurrio un error al obtener el tutorial con id " + id });
      });
  };

// Actualizar tutorial por id
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Los datos a actualizar no pueden estar vacìos!"
      });
    }
  
    const id = req.params.id;
  
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se pudo actualizar el tutorial con id=${id}. probablemente el tutorial no existe!`
          });
        } else res.send({ message: "Tutorial actualizado correctamente." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Ocurrio un error al tratar de actualizar el tutorial con id=" + id
        });
      });
  };

// Eliminar Tutorial por id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `No se pudo eliminar el tutorial con id=${id}. probablemente el tutorial no existe!`
          });
        } else {
          res.send({
            message: "Tutorial eliminado correctamente!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ocurrio un error al tratar de eliminar el tutorial con id=" + id
        });
      });
  };

// Eliminar todos los tutoriales de la base de datos
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Los tutoriales han sido eliminados correctamente!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al tratar de eliminar los tutoriales!"
        });
      });
  };

// Buscar todos los tutoriales publicados
exports.findAllPublished = (req, res) => {
    Tutorial.find({ publicado: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrio un error al tratar de consultar los tutoriales!"
        });
      });
  };