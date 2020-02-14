const express = require("express"); //Express es para construir las API de Rest
const bodyParser = require("body-parser"); //body-parser ayuda a analizar la solicitud y crear el req.bodyobjeto
const cors = require("cors"); //cors proporciona el "middleware" Express para habilitar CORS con varias opciones.
//Las funciones de middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res)
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Analiza las solicitudes de tipo content-type - application/json
app.use(bodyParser.json());

// Analiza las solicitudes de tipo content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta simple
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a bezkoder application para aprender a programar" });
});

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a la base de datos!");
  })
  .catch(err => {
    console.log("No se pudo conectar la base de datos!", err);
    process.exit();
  });

  require("./app/routes/tutorial.routes")(app);

// Puerto que esta escuchando las peticiones
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.`);
});
