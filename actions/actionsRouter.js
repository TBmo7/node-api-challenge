const express = require('express');
const Actions = require('../data/helpers/actionModel')
const router = express.Router();




/**--------------GETS----------------- */

router.get('/',(req,res)=>{

    
    Actions.get()
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Error retreiving actions"})
    })
})

router.get('/:id',validateId,(req,res)=>{
    Actions.get(req.params.id)
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Error retreiving actions"})
    })
})

/**------------------POSTS-------------------- */

router.post('/',validateBody,(req,res)=>{
    let newAct = req.body
    Actions.insert(newAct)
    .then(action=>{
        res.status(201).json(newAct)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Error creating action"})
    })
//     if(newAct.description.length > 128){
//         res.status(400).json({message:"Description must be less than 128 characters"})
//                                         }
//     else{
//         if(!newAct.completed){
//             if(!newAct.project_id||!newAct.description||!newAct.notes)
//             {
//                 res.status(400).json({message:"You must include a project_id, a description, and notes"})
    
//             }
//         else{
                
//         Actions.insert(newAct)
//         .then(action=>{
//             res.status(201).json(newAct)
//         })
//         .catch(err=>{
//             console.log(err)
//             res.status(500).json({message:"Error creating action"})
//         })
    
//             }

//         }
//         else{
        
//         if(typeof newAct.completed !== "boolean"){
//             res.status(400).json({message:"Completed key must be either true or false"})
//         }

//         else{
            
//             Actions.insert(newAct)
//             .then(action=>{
//                 res.status(201).json(newAct)
//             })
//             .catch(err=>{
//                 console.log(err)
//                 res.status(500).json({message:"Error creating action"})
//             })
             
//             }
//         }

        
//     }
  
// //sorry for this messy garbge, but I wanted to make sure I accounted for everything, should have written some middleware to make it cleaner

 })

/**-------------PUTS-------------- */

router.put('/:id',validateId,validateBody,(req,res)=>{
    const changes = req.body
    Actions.update(req.params.id,changes)
    .then(thing=>{
        res.status(200).json(changes)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"Error updating action"})
    })

})

/**--------DELETE---------------------- */
router.delete('/:id', validateId,(req,res)=>{
    
    Actions.remove(req.params.id)
    .then(athing=>{
        res.status(200).json({message:"Successfully deleted one action"})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"There was an error deleting the action"})
    })
})


/**------------MIDDLEWARE---------------- */

function validateId(req,res,next){
    const {id} = req.params;
    Actions.get(id)
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

function validateBody(req,res,next){
    const id = req.body.project_id;
    const description = req.body.description;
    const notes = req.body.notes;
    const completed = req.body.completed;

    if(description.length > 128){
        res.status(400).json({message:"Description must be less than 128 characters"})
    }
    else{
        if(!completed){
            if(!id || !description || !notes){
                res.status(400).json({message:"You must include a project_id, a description, and notes"})
            }
            else{
                next()
            }
        }
        else{//if there is a completed field
            if(typeof completed !== "boolean"){
                res.status(400).json({message:"Completed key must be either true or false"})
            }
            else{
                next()
            }
        }
    }
}




module.exports = router;