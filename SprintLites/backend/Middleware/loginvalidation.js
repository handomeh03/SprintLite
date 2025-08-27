import Joi from "joi";

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .pattern(strongPassword)
    .required(),
});


 export function loginvalidate(schema){
    return (req,res,next)=>{
        const {value,error}=schema.validate(req.body);
        if(error){
            return res.status(400).send(error)
        }
        req.body=value;
        next();
    }
}
