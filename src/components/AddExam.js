import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import firebase from "../Firebase/firebase.js";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";
import { AuthProvider } from "../context/AuthContext.js";
import AdminSidebar from "./AdminSidebar/AdminSidebar.js";
import "./AddExam.css";
export const randomId = uuidv4();

export default function AddExam() {
  const titleRef = useRef();
  const duration = useRef();
  const subjectName = useRef();
  const semester = useRef();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const usersCollectionRef = firebase.firestore().collection("Exam");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await usersCollectionRef.doc(randomId).set({
        title: titleRef.current.value,
        duration: duration.current.value,
        subjectName: subjectName.current.value,
        semester: semester.current.value.toString() + "th",
        id: randomId,
      });
      setMessage("Successfully Added");
      history.push("/addQuestions");
    } catch (error) {
      setError("Error writing document: ", error);
    }
    setLoading(false);
  }

  setTimeout(() => {
    setError("");
    setMessage("");
  }, 2000);

  // console.log(profile.userRoles);

  return (
    <>
      <AdminSidebar />
      <div className="admindashboard">
        <AuthProvider>
          <Card>
            <Card.Body>
              <h2 className="text-center">Add New Exam</h2>
              {error && <Alert variant="danger"> {error}</Alert>}
              {message && <Alert variant="success"> {message} </Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="title">
                  <Form.Label>Exam Title</Form.Label>
                  <Form.Control
                    type="text"
                    ref={titleRef}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="duration">
                  <Form.Label>Exam Duration</Form.Label>
                  <Form.Control
                    type="number"
                    ref={duration}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="subjectName">
                  <Form.Label>Subject Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={subjectName}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="semester">
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="number"
                    ref={semester}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button disabled={loading} type="submit" className="w-100 mt-3">
                  Next
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </AuthProvider>
      </div>
    </>
  );
}
