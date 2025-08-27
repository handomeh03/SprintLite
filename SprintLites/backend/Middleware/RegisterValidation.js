import Joi from "joi";

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
const safeRegex = /^[a-zA-Z0-9 _@.-]*$/;

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(safeRegex)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .pattern(strongPassword)
    .required(),

  role: Joi.string()
    .valid("admin", "manager", "member")
    .default("user"),

  avatarUrls: Joi.array()
    .items(Joi.string().uri())
    .min(1)
});




 export function registerValid(schema){
    return (req,res,next)=>{
        const {value,error}=schema.validate(req.body);
        if(error){
            return res.status(400).send({error})
        }
        req.body=value;
        next();
    }
}