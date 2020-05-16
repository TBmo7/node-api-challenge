const express = require('express');
const Projects = require('../data/helpers/projectModel.js')
const router = express.Router();






/**--------------GETS----------------- */

router.get('/',(req,res)=>{
    
    Projects.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Error retreiving projects"})
    })
})

router.get('/:id',validateId,(req,res)=>{
    Projects.get(req.params.id)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message: "There was an error retrieving that project"})
    })
})

router.get('/:id/actions',validateId,(req,res)=>{
    Projects.getProjectActions(req.params.id)
    .then(project=>{
        res.status(200).json(project)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"There was an error retrieving those actions"})
    })
})

/**----------POSTS----------------- */
    router.post('/',validateBody,(req,res)=>{
        let newProj = req.body
        Projects.insert(newProj)
        .then(entry=>{
            res.status(201).json(newProj)
        })
        .catch(err=>{
            console.log(err)
            res.status(500),json({message:"There was an error storing that project"})
        })
    })


/**-----------DELETE-------------- */

    router.delete('/:id', validateId, (req,res)=>{
        Projects.remove(req.params.id)
        .then(count=>{
            res.status(200).json({message:"Successfully deleted the project"})
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message:"There was an error deleting that project"})
        })
    })

    /**--------PUTS------------ */

    router.put('/:id',validateId,validateUpdateBody,(req,res)=>{
        const changes = req.body
        Projects.update(req.params.id,changes)
        .then(thing=>{
            res.status(200).json(changes)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message:"There was an error updating that project"})
        })

    })


/**------------MIDDLEWARE---------------- */

function validateId(req,res,next){
    const {id} = req.params;
    Projects.get(id)
    .then(id=>{
        if(id){
            req.id = id;
            next();
        }
        else{
            next(res.status(404).json({message:"NULL"}))
        }
               }
        )

}

function validateUpdateBody(req,res,next){
    if(req.body && Object.keys(req.body).length>0){
        next()
    }
    else{
        next(res.status(400).json({message: "please include a name and description"}))
    }
}

function validateBody(req,res,next){
    if(!req.body.name || !req.body.description){
        next(res.status(400).json({message: "please include a name and description"}))
    }
    else{
        next()
    }
}



module.exports = router;