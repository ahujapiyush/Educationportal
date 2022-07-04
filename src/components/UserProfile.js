import React, { useState, useEffect } from "react";

import { Button, Card, Form, Alert, Col , Row } from "react-bootstrap";
import { projectStorage, timestamp } from "../Firebase/firebase.js";
import firebase from "../Firebase/firebase.js";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../App.css";
const UserProfile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Branch, setBranch] = useState("");
  const [Section, setSection] = useState("");
  const [Semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const { currentUser } = useAuth();

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    console.log("Image : ", e.target.files[0]);

    if (selected && types.includes(selected.type)) {
      setFile(selected);

      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };
  function handleClick(event) {
    // references
    event.preventDefault();
    const storageRef = projectStorage.ref("UserProfileImages/" + file.name);
    const collectionRef = firebase.firestore().collection("UserData");

    try {
      setError("");
      setMessage("");
      setLoading(true);
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          await collectionRef.doc(currentUser.uid).set({
            FirstName: FirstName,
            LastName: LastName,
            Branch: Branch,
            Semester: Semester,
            Section: Section,
            ImageUrl: url,
            TimeStamp: createdAt,
          });
          document.getElementById("selectedFile").value = "";
          setFirstName("");
          setMessage("Successfully Created");
          setLastName("");
          setBranch("");
          setSemester("");
          setSection("");
          setUrl(url);
          history.push("/exams");
        }
      );
    } catch (error) {
      setError("Unable to Create Profile");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (url) {
      setFile(null);
      setProgress(0);
    }
  }, [url, setFile]);

  setTimeout(() => {
    setError("");
    setMessage("");
  }, 3000);

  function handleBranchOptionChange(event) {
    setBranch(event.target.value);
  }
  function handleSemesterOptionChange(event) {
    setSemester(event.target.value);
  }
  function handleSectionOptionChange(event) {
    setSection(event.target.value);
  }

  return (
    <div style={{marginTop : "10%"}}>
      <motion.div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div>

      <Row style={{width : "100vw"}}>
        <Col lg={4}>

        </Col>
        <Col lg={4} style={{height  : "100vh"}}>
        <Card>
        <Card.Body>
          <h2 className="text-center mb-3">Edit Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleClick}>
            <div className="mb-2 mt-2">
              <input
                id="selectedFile"
                className="form-control"
                type="file"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
            <Form.Group id="FirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                value={FirstName}
                type="text"
                onChange={(event) => setFirstName(event.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group id="LastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={LastName}
                type="text"
                onChange={(event) => setLastName(event.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <select
              required
              className="form-select mt-3"
              aria-label="Choose Branch"
              onChange={handleBranchOptionChange}
            >
              <option defaultValue="Choose Branch">Choose Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ET&T">ET&T</option>
              <option value="Mech">Mech</option>
              <option value="Civil">Civil</option>
            </select>

            <select
              className="form-select mt-3"
              aria-label="Choose Semester"
              required
              onChange={handleSemesterOptionChange}
            >
              <option defaultValue="Choose Semester">Choose Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>

            <select
              className="form-select mt-3"
              aria-label="Choose Semester"
              required
              onChange={handleSectionOptionChange}
            >
              <option defaultValue="Choose Section">Choose Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

            <Button
              disabled={loading}
              type="submit"
              className="w-100 mt-3 align-right"
            >
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
          </Col>
          <Col lg={4}>
          
          </Col>
      </Row>
    
    </div>
  );
};

export default UserProfile;
