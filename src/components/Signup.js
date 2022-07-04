import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const ConfirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== ConfirmPasswordRef.current.value) {
      return setError("Password Do not Match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/userProfile");
    } catch {
      setError("failed to create a account");
    }
    setLoading(false);
  }
  return (
    <AuthProvider>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger"> {error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirmPassword" className="mb-2">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control type="password" ref={ConfirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Already have an account? <Link to="/login">Login </Link>
      </div>
    </AuthProvider>
  );
}
