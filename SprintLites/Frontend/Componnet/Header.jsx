
import {useState } from "react";
import { UseUser } from "../Context/userContext";
import style from "../Css/Header.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";
import { UseContextProject } from "../Context/ProjectsContext";
import { UseSprintContext } from "../Context/SprintContext";
import { UseMe } from "../hoooks/useMe";
import { UseContextMe } from "../Context/MEContext";
export default function Headers(){
  let linkStyle={
    color:"white",
    textDecoration:"none"
  }

  let {userDispatch}=UseUser();
  let{ProjectDispatch}=UseContextProject();
  let {SprintDispatch}=UseSprintContext();
  let [flag,setflag]=useState(false);

  UseMe();
  let {me}=UseContextMe();
  



    return(
        <div className={style.Headers}>
          <div className={style.info}>
              <img className={style.image}  src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"></img>
            <h2 className={style.head}>{me[0]?.name}</h2>
        

        </div>
        <div className={style.menu}>
            <button onClick={()=>{setflag((old)=>!old)}} className={style.menubtn}><MenuIcon/></button>
             <div style={{display: flag ? "block" : "none"}} className={style.listMenu}>
                <ul>
                  <li>
                    <NavLink to={"/"} onClick={()=>{setflag(false)}}  style={linkStyle}>projects</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/setting"} onClick={()=>{setflag(false)}}  style={linkStyle}>setting</NavLink>
                  </li>
                 <li>
                   <NavLink to={"/login"} onClick={()=>{
                    setflag(false);
                    userDispatch({type:"logout"});
                    ProjectDispatch({type:"removeProjectForLogOut"});
                    SprintDispatch({type:"removeSprintForLogout"});
                    sessionStorage.removeItem("user");
                    sessionStorage.removeItem("projectId");
                    sessionStorage.removeItem("sprintID");
                    
                   }}  style={linkStyle}>log out</NavLink>
                 </li>
                </ul>
             </div>
        </div>
        <div className={style.menu2}>

           <ul>
                  <li>
                    <NavLink to={"/"} onClick={()=>{setflag(false)}}  style={linkStyle}>projects</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/setting"} onClick={()=>{setflag(false)}}  style={linkStyle}>setting</NavLink>
                  </li>
                 <li>
                   <NavLink to={"/login"} onClick={()=>{
                    setflag(false);
                    userDispatch({type:"logout"});
                    ProjectDispatch({type:"removeProjectForLogOut"});
                    SprintDispatch({type:"removeSprintForLogout"});
                    sessionStorage.removeItem("user");
                    sessionStorage.removeItem("projectId");
                    sessionStorage.removeItem("sprintID");
                    
                   }}  style={linkStyle}>log out</NavLink>
                 </li>
                </ul>
          
        </div>

        


        
        </div>
    );
}