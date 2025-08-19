export function CanupdateRole(req,res,next){
    let user=req.user;
    if(user.role==="admin"){
        next();
    }
    else{
        res.status(404).send({error:"cant change role"})
    }
}