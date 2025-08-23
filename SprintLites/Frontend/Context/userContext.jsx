import { createContext, useContext, useReducer } from "react";
const UserContext = createContext();
export default function UserProvider({ children }) {
  function reduse(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload };

      case "register":
        return {...state,user:action.payload}; 
      case "logout":
        return {...state,user:null}
      default:
        return state;
    }
  }
  let [state, userDispatch] = useReducer(reduse, {user: JSON.parse(sessionStorage.getItem("user"))});
  return (
    <UserContext.Provider value={{ ...state, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
export function UseUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
}
