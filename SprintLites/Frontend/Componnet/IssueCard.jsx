import React, { useState } from "react";
import styles from "../Css/IssueCard.module.css";
import { UseUser } from "../Context/userContext";
import { UseDeleteIssue } from "../hoooks/UseDeleteIssue";
import Comments from "./Comments";

export default function IssueCard({ Issues }) {
  let { user } = UseUser();
  let[flag,setflag]=useState(false);

  let {deleteIsuues}=UseDeleteIssue();
  function handleDeleteIssues(e){
    e.preventDefault();
    deleteIsuues(Issues._id);
  }
  function handlechangeFlag(flag){
    setflag(flag);
  }
  return (
    <article className={styles.issue}>
      <div className={styles.head}>
        <span className={styles.badge}>Project: {Issues.project.name}</span>
        <span className={styles.badge}>
          Sprint: {Issues.sprint?.name || "No Sprint"}
        </span>
        <span className={`${styles.badge} ${styles[Issues.type]}`}>
          {Issues.type}
        </span>
      </div>

      <div className={styles.titleRow}>
        <h3>{Issues.title}</h3>
        <span className={`${styles.status} ${styles[Issues.status]}`}>
          {Issues.status}
        </span>
      </div>

      <p className={styles.desc}>{Issues.description}</p>

      <div className={styles.footer}>
        <span className={`${styles.priority} ${styles[Issues.priority]}`}>
          {Issues.priority}
        </span>
        <span className={styles.chip}>
          Assignee: {Issues.assignee?.name || "Unassigned"}
        </span>
        <span className={styles.chip}>
          Reporter: {Issues.reporter?.name || "Unknown"}
        </span>
        <span className={styles.spacer}></span>
        <span className={styles.chip}>
          Created: {new Date(Issues.createdAt).toLocaleDateString()}
        </span>
        <span className={styles.chip}>
          Updated: {new Date(Issues.updatedAt).toLocaleDateString()}
        </span>

        {user.user.role === "admin" || user.user.role === "manager" ? (
          <span onClick={handleDeleteIssues} style={{ color: "red",cursor:"pointer" }}>delete</span>
        ) : (
          ""
        )}

         <span onClick={()=>{setflag(true)}} style={{background:"#065f46",borderRadius:"1rem",padding:"4px",color:"white",cursor:"pointer"}}>comments</span>
      </div>

      <Comments id={Issues._id} flag={flag} handlechangeFlag={handlechangeFlag}/>
     
    </article>
  );
}
