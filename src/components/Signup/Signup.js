import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Alert, Button } from "react-bootstrap";
import SignupLogo from "../../Images/Image.png";
import InputForm from "../../Form/InputForm";
import googlelogo from "../../Images/Logos/google.svg";
import { Link, useHistory } from "react-router-dom";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function SignupPage() {
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

  setTimeout(() => {
    setError("");
  }, 2000);
  return (
    <AuthProvider>
      <div className="HomePage">
        <div className="WhiteBox mx-auto">
          {error && <Alert variant="danger"> {error}</Alert>}
          <Container fluid>
            <Row className="mx-auto">
              <Col xl={6} lg={6} sm={12} className="mx-auto">
                <img className="img" src={SignupLogo} alt="SignupLogo" />
              </Col>

              <Col xl={6} lg={6} sm={12} style={{ textAlign: "center" , marginTop : "50px" }}>
                <div className="Heading" style={{fontWeight : "bold" , fontSize : "1.5rem"}}>Sign Up</div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-3 mt-5">
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control type="email" ref={emailRef} placeholder="Email" required />
                  </Form.Group>
                  <Form.Group id="password" className="mb-3 ">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                  </Form.Group>
                  <Form.Group id="ConfirmPassword" className="mb-3">
                    {/* <Form.Label>Confirm Password</Form.Label> */}
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      ref={ConfirmPasswordRef}
                      required
                    />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="w-50 mt-5 float-right"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Form>

                {/* <hr style={{ float: "left" }} />
                <span style={{ textSize: "0.1px" }}>Or Connect With</span>
                <hr style={{ float: "right" }} />
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
                  Already Have an Account?
                </div>
                <div
                  style={{ float: "right", width: "50%", marginTop: "30px" }}
                >
                  <Link to="/login"> Login </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </AuthProvider>
  );
}

export default SignupPage;
