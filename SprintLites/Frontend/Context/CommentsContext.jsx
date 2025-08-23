import { createContext, useContext, useReducer } from "react";
const CommentContext=createContext();
export default function CommentProvider({children}){
    function reduse(state,action){
        switch(action.type){
            case "fetchComment":
                return {...state,comments:action.payload};
             case "addcomment":
                return {...state,comments:[...state.comments,action.payload]};
              case "removeCommentFromState":
                return {...state,comments:[]};   
              case "deleteCommment":
                return {...state,comments:state.comments.filter((e)=>{
                    return e._id != action.payload;
                })}
            default :
            return state;    
        }
    }
    let [state,CommentDispatch]=useReducer(reduse,{comments:[]});
    return(
        <CommentContext.Provider value={{...state,CommentDispatch}}>
            {children}
        </CommentContext.Provider>
    );
}
export function UseCommnetContext(){
    let context=useContext(CommentContext);
    if(!context){
        throw new Error("error");
    }
    return context;
}