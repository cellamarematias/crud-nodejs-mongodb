const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

// conexion a DB MONGO

const mongoose = require('mongoose');

const uri = `mongodb+srv://matias:${ process.env.PASSWORD}@cluster0.pzons.mongodb.net/${ process.env.DBNAME}?retryWrites=true&w=majority`;  //URL de conexión

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(()  => console.log('Base de datos conectada'))
  .catch(e => console.log(e))

  



// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.use(express.static(__dirname + "/public"));

//rutas WEB
app.use('/', require('./router/rutas'));
app.use('/mascotas', require('./router/mascotas'));


app.use((req, res, next) => {
  res.status(404).render("404", { titulo: "Página 404" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


