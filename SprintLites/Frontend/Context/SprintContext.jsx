import { createContext, useContext, useReducer } from "react";
const SprintContext=createContext();
export default function SprintProvider({children}){
    function reduse(state,action){
        switch (action.type){
            case "fetchSprint":
                return {...state,sprint:action.payload};
             case "addSprint":
                return {...state,sprint:[...state.sprint,action.payload]} ; 
              case "changeStatus":
                return {...state,sprint:state.sprint.map((e)=>{
                    if(e._id==action.payload._id){
                        return action.payload;
                    }
                    else{
                        return e;
                    }
                })}   
             case "removeSprintForLogout":
                return {...state,sprint:[]};   
            default :
            return state;
        }
    }

    let [state,SprintDispatch]=useReducer(reduse,{sprint:[]});
    return(
        <SprintContext.Provider value={{...state,SprintDispatch}}>
            {children}
        </SprintContext.Provider>
    );
}
export function UseSprintContext(){
    let context=useContext(SprintContext);
    if(!context){
        throw new Error("error");
    }
    return context;
}