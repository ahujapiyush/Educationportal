import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function AdminLogin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/addExam");
    } catch (e) {
      setError("Failed to Sign In");
    }
    setLoading(false);
  }
  return (
    <AuthProvider>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger"> {error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgetPassword">Forget Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 ">
        Don't have an Account? <Link to="/signup">SignUp </Link>
      </div>
    </AuthProvider>
  );
}
