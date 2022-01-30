const express = require('express');
const router = express.Router();

const mascota = require('../models/mascota');


router.get('/', async(req, res) => {

    try {
        const arrayMascotasDB = await mascota.find()   // con esto mongoose nos busca los datos
        //console.log(arrayMascotasDB)
        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
           
        })
    } catch (error) {
        console.log(error)
    }
});

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async (req, res) => {
    const body = req.body  // solo funciona si instale el body parser
    try {
     //   const mascotaDB = new mascota(body)  //metodo 1
      //  await mascotaDB.save()
        await mascota.create(body) // metodo para crear 2

        res.redirect('/mascotas')

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req, res) =>{
    const id = req.params.id
    try {
        const mascotaDB = await mascota.findOne({_id: id})
        console.log(mascotaDB)

        res.render('detalle', {
            mascota: mascotaDB, 
            error: false 
        })

    } catch(error) {
            console.log('erroooooooooorrr', error)
            res.render('detalle', {
                error: true,
                mensaje: 'No se encuentra el documento...'
                     })
        }
    })

router.delete('/:id', async(req, res) => {
    const id = req.params.id

    try {
        const mascotaDB = await mascota.findByIdAndDelete({_id: id})

        if (mascotaDB) {
            res.json ({
                estado: true,
                estado: 'eliminado!'
            })

        } else {
            res.json ({
                estado: true,
                estado: 'Falló al eliminar'
            })
        }


    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req, res) => { //cuando hacemos consulta a la DB usamos el async y await
    const id = req.params.id
    const body = req.body // para leer el body tenemos que configurar el BODY-PARSER - Ahora express no lo trae config por defecto
   
    try {
        const mascotaDB = await mascota.findByIdAndUpdate(
            id, body, { useFindAndModify: false })

        console.log(mascotaDB)

        res.json({
            estado: true,
            mensaje:'Editado'
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            estado: true,
            mensaje:'Falló edición'
        })
    }

})  

module.exports = router;