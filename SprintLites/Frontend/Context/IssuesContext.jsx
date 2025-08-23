import { createContext, useContext, useReducer } from "react";
import Issues from "../Page/Issues";
const IssuesContext = createContext();
export default function IssuesProvider({ children }) {
  function reduse(state, action) {
    switch (action.type) {
      case "fetchIssues":
        return { ...state, Issues: action.payload };
      case "addissues":
        return { ...state, Issues: [...state.Issues, action.payload] };
      case "deleteIssues":
        return {
          ...state,
          Issues: state.Issues.filter(
            (e) => e._id.toString() !== action.payload._id.toString()
          ),
        };

      default:
        return state;
    }
  }
  let [state, IssuesDispatch] = useReducer(reduse, { Issues: [] });
  return (
    <IssuesContext.Provider value={{ ...state, IssuesDispatch }}>
      {children}
    </IssuesContext.Provider>
  );
}
export function UsecontextIssues() {
  let context = useContext(IssuesContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
}
