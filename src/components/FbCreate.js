import React, { useState } from "react";
import "react-bootstrap";
import firebase from "../Firebase/firebase.js";
import { v4 as uuidv4 } from "uuid";

function FbCreate() {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const ref = firebase.firestore().collection("Name");
  const min = 1;
  const max = 100;
  const randomId = uuidv4();
  console.log(randomId);
  function createDoc(newDataObj) {
    ref
      .doc(randomId)
      .set(newDataObj)
      .then()
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div className="mt-3">
      <input
        id="name"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        id="skill"
        type="text"
        placeholder="Skill"
        onChange={(e) => setSkill(e.target.value)}
      ></input>
      <button
        onClick={() => {
          createDoc({
            name,
            skill,
            id: randomId,
          });
          document.getElementById("name").value = "";
          document.getElementById("skill").value = "";
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default FbCreate;
