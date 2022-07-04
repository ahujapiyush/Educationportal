import React from "react";
import "../Form/Signup.css";
import { Form, Col, Row } from "react-bootstrap";

function InputForm(props) {
  return (
    <div>
      <Form>
        {" "}
        <Form.Group
          as={Row}
          className="mb-3 mt-3"
          controlId="formPlaintextPassword"
        >
          <Form.Label column sm="4">
            <span style={{ fontWeight: "400", fontSize: "20px" }}>
              {props.title}
            </span>
          </Form.Label>
          <Col sm="7" style={{ marginTop: "5px" }}>
            <Form.Control type={props.type} placeholder={props.placeholder} />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default InputForm;
