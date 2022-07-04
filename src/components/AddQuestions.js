import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import firebase from "../Firebase/firebase.js";
import { useHistory } from "react-router";
import { randomId } from "./AddExam.js";
import "./AddExam.css";
import AdminSidebar from "./AdminSidebar/AdminSidebar.js";
import { Link } from "react-router-dom";

export default function AddQuestions() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const usersCollectionRef = firebase.firestore();
  const history = useHistory();
  async function handleLogout() {
    history.push("/admin-dashboard");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await usersCollectionRef
        .collection("Exam/")
        .doc(randomId)
        .collection("addQuestion")
        .doc()
        .set({
          question: question,
          option1: option1,
          option2: option2,
          option3: option3,
          option4: option4,
          correctAnswer: correctAnswer,
          id: randomId,
        });
      setMessage("Successfully Added");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectAnswer("");
      setQuestion("");
    } catch (error) {
      setError("Error writing document: ", error);
    }
    setLoading(false);
  }

  setTimeout(() => {
    setError("");
    setMessage("");
  }, 3000);

  return (
    <>
      <AdminSidebar />
      <div className="admindashboard">
        <Card>
          <Card.Body>
            <h2 className="text-center">Add Questions</h2>
            {error && <Alert variant="danger"> {error}</Alert>}
            {message && <Alert variant="success"> {message} </Alert>}
            <section className="text-center">
              <Link
                className="text-center btn btn-dark margingap"
                to="/imagequestions"
              >
                Image Question
              </Link>
              <Link
                className="text-center btn btn-dark margingap"
                to="/normalquestions"
              >
                Without Image Question
              </Link>
            </section>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="Question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="option1">
                <Form.Label>Option 1</Form.Label>
                <Form.Control
                  value={option1}
                  type="text"
                  onChange={(event) => setOption1(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="option2">
                <Form.Label>Option 2</Form.Label>
                <Form.Control
                  value={option2}
                  type="text"
                  onChange={(event) => setOption2(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="option3">
                <Form.Label>Option 3</Form.Label>
                <Form.Control
                  value={option3}
                  type="text"
                  onChange={(event) => setOption3(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="option4">
                <Form.Label>Option 4</Form.Label>
                <Form.Control
                  value={option4}
                  type="text"
                  onChange={(event) => setOption4(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group id="correctAnswer">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control
                  value={correctAnswer}
                  type="text"
                  onChange={(event) => setCorrectAnswer(event.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button disabled={loading} type="submit" className="w-100 mt-3">
                Next
              </Button>
            </Form>
            <div className="w-100 text-center mt-2">
              <Button variant="link" onClick={handleLogout}>
                Go Back
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
