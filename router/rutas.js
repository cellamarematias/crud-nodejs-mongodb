const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {titulo: "aa?"}); // destino y variable
  
  });

router.get("/servicios", (req, res) => {
    res.render("servicios", {tituloServicios: "estos son los servicios"}); // destino -vista - y variable
  
  });

 
  
router.get("/nosotros", (req, res) => {
    res.render("nosotros", { titulo: "Anda?", 
                            titulo2: "otro más?",
                            obvs: "ya wey",
                            tit: "Ok, se entendió."
 });
  });




  module.exports = router;