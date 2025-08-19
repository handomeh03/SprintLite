export function canUpdate(req,res,next){
    let user=req.user;
    if(user.role==="admin" || user.id==req.params.id){
        next();
    }
    else{
       res.status(404).send({error:"no authorization"})
    }
}