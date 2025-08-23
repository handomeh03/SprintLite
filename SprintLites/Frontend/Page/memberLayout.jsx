
import { Outlet } from "react-router-dom";
import style from "../Css/memberLayout.module.css";
import Headers from "../Componnet/Header";
import Sidebar from "../Componnet/Sidebar";
import { UseLogin } from "../hoooks/useLogin";
import Loader from "../Componnet/Loader";
export default function memberLayout(){
    let {loading}=UseLogin();    
    if(loading){
        return <Loader/>
    }
    return(
        <div className={style.memberLayout}>
            <Headers/>  
            {/* <Sidebar/>    */}
            <Outlet/>
        </div>
    );
}