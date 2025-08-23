import { createContext, useContext, useReducer } from "react";
const MeContext=createContext();
export default function MeProvider({children}){
    
    function reduce(state,action){
        switch(action.type){
            case "fetchme":
                return {...state,me:[action.payload]};

             case "updateme":
                return {...state,me:[action.payload]}   
            default :
            return state;    
        }
    }

    let [state,Medispatch]=useReducer(reduce,{me:[]});
    return(
        <MeContext.Provider value={{...state,Medispatch}}>
            {children}

        </MeContext.Provider>
    );
}
export function UseContextMe(){
    let context=useContext(MeContext);
    if(!context){
        throw new Error("error");
    }
    return context;
}