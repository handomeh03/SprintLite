import { createContext, useContext, useReducer } from "react";
const ProjrctContext=createContext();
export default function PrjectProvider({children}){
    function reduse(state,action){
    switch(action.type){
        case "fetchProject":
            return {...state,projects:action.payload};
         case "createproject":
            return {...state,projects:[...state.projects,action.payload]}   
         case "adduser":
            return {...state,projects:state.projects.map((e)=>{
                if(e._id==action.payload._id){
                    return action.payload;
                }
                else{
                    return e;
                }
            })}   
         case "removeProjectForLogOut":
            return {...state,projects:[]};   
        default :
          return state;
    }
     
    }
    let [state,ProjectDispatch]=useReducer(reduse,{projects:[]});
    return(
        <ProjrctContext.Provider value={{...state,ProjectDispatch}}>
            {children}
        </ProjrctContext.Provider>
    );
}
export function UseContextProject(){
    let context=useContext(ProjrctContext);
    if(!context){
        throw new Error("error");
    }
    return context;
    
}