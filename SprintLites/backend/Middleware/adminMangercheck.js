export function adminMangerCheck(req,res,next){
    let user=req.user;
    if(user.role==="admin" || user.role==="manager"){
        
        next();
    }
    else{
        res.status(404).send({error:"cant add project beacuse tou are not authorize"})
    }
}