import React, { useRef, useState } from "react";
import "./login.css";
import { Container, Row, Col, Alert, Button, Form } from "react-bootstrap";
import SignupLogo from "../../Images/Image.png";
import { AuthProvider, useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function LoginPageForm(props) {
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
      history.push("/exams");
    } catch (e) {
      setError("Failed to Sign In");
    }
    setLoading(false);
  }

  setTimeout(() => {
    setError("");
  }, 2000);
  return (
    <AuthProvider>
      <div className="HomePage">
        <div className="WhiteBox">
          {error && <Alert variant="danger"> {error}</Alert>}
          <Container fluid>
            <Row className="mx-auto">
              <Col xl={6} lg={6} sm={12} className="mx-auto">
                <img className="img" src={SignupLogo} alt="SignupLogo" />
              </Col>
              <Col
                xl={6}
                lg={6}
                sm={12}
                style={{ textAlign: "center", marginTop: "50px" }}
              >
                <div
                  className="Heading"
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  Login
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Control
                      placeholder="Email"
                      type="email"
                      ref={emailRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group id="password" className="mt-3">
                    <Form.Control
                      placeholder="Password"
                      type="password"
                      ref={passwordRef}
                      required
                    />
                  </Form.Group>
                  <div style={{ float: "right", width: "100%" }}>
                    <Link to="/forgetPassword">Forgot Password ?</Link>
                  </div>
                  <Button
                    disabled={loading}
                    className="w-50 mt-3 ml-3"
                    type="submit"
                  >
                    Log In
                  </Button>
                </Form>
                {/* <div>
                  <br /> <br />
                  <hr style={{ float: "left" }} />
                  <span style={{ textSize: "0.1px" }}>Or Connect With</span>
                  <hr style={{ float: "right" }} />
                </div>
                <div>
                  <img
                    className="LogoSignup"
                    src={googlelogo}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: ".2px solid black",
                      borderRadius: "100%",
                      padding: "5px",
                    }}
                    alt=""
                  />
                </div> */}
                <div style={{ float: "left", width: "50%", marginTop: "30px" }}>
                  Don't Have an Account?
                </div>
                <div
                  style={{ float: "right", width: "50%", marginTop: "30px" }}
                >
                  <Link to="/signup"> Sign Up </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </AuthProvider>
  );
}

export default LoginPageForm;
