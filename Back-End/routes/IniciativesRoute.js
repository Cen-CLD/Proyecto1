const express = require('express')
const iniciativa = require('../models/Initiative')
const router = express.Router()

// Get

// http://localhost:3000/initiative

router.get('/initiative',async(_req, res) => {
    try {
        const iniciativasRecuperadasDB = await iniciativa.find()
        res.json({
            lista_iniciativas: iniciativasRecuperadasDB,
            mensaje:"Lista de iniciativas:"
        })
    } catch (error) {
        res.json ({
            mensaje:"Ha ocurrido un error. Contacte a soporte.",
            error
        })
    }
  })

// get para recuperar una iniciativa en específico
// http://localhost:3000/initiative-id

router.get('/initiative-id', async(req, res) =>{
    const id_search = req.query.id

    try {
        const buscarIniciativa = await iniciativa.findById(id_search)
        if(!buscarIniciativa) {
            return res.json ({
                mensaje:"No se encontro la iniciativa."
            })  
        }
        res.json({
            iniciativa:buscarIniciativa,
            mensaje: "Lista de iniciativas:"
        })
    }
    catch (error) {
        res.json({
            mensaje:"Ha ocurrido un error. Contacte a soporte.",
            error
        })
        
    }
})

// post de iniciativas

// http://localhost:3000/post-initiative

router.post('/post-initiative',async(req,res)=>{
    const new_initiative = new iniciativa(req.body)
    try {
        const iniciativaGuardada = await new_initiative.save()
        res.json({
            iniciativa:iniciativaGuardada,
            mensaje:"Iniciativa guardada."
        })
    } catch (error) {
        res.json({
            mensaje:"Ha ocurrido un error. Contacte a soporte.",
            error
        })
    }
})


// put

// http://localhost:3000/put-initiative

router.put('/put-initiative',async(req,res)=>{
const id_search = req.query.id 

try {
    const updated_initiative = await iniciativa.findByIdAndUpdate(id_search, req.body, {new:true})
    if(!updated_iniciative) {
        return res.json({
            mensaje:"No se encontro la iniciativa."
        })
    }
    res.json({
        iniciativa:updated_initiative,
        mensaje:"Iniciativa actualizada con éxito."
    })

} catch (error) {
    res.json({  
        mensaje:"Ha ocurrido un error. Contacte a soporte.",
        error
    })
}

})


// Delete >:3
// http://localhost:3000/delete-initiative

router.delete('/delete-initiative',async(req,res)=>{
    const id_search = req.query.id 

    try {
        const deleted_initiative = await iniciativa.findByIdAndDelete(id_search)
        if(!deleted_initiative) {
            return res.json({
                mensaje:"No se encontro la iniciativa."
            })
        }
        res.json({
            iniciativa:deleted_initiative,
            mensaje:"Iniciativa eliminada con éxito."
        })
    } catch (error) {
        res.json({
            mensaje:"Ha ocurrido un error. Contacte a soporte.",
            error
        })
    }
})

// filtrar por fecha 
// http://localhost:3000/initiative-filter-date
router.get('/initiative-filter-date', async(req,res)=>{
    try {
        const {date, from, to} = req.query

        let search_filter = {}

        if (date) {
            const day = new Date(fecha)
            const nextDay = new Date(day)
            siguienteDia.setDate(nextDay.getDate()+1)
        }
        else if (from || to) {
            search_filter = {}

            if(from) {
                search_filter.fechaRegistro.$gte = new Date(from)
            }
            if(to) {
                search_filter.fechaRegistro.$lte = new Date(to)
            }
        }
        


    } catch (error) {
        console.log(error)
    }
})

module.exports = router



