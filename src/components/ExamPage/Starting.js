import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import "./instruction.css";
function Starting() {
  const [check, setCheck] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  function handleClick() {
    history.replace("/exam/" + id);
  }

  const checked = (e) => {
    const checked = e.target.checked;
    if (checked) {
      //checked
      setCheck(true);
    } else {
      //unchecked
      setCheck(false);
    }
  };

  return (
    <>
      <div
        style={{
          fontStyle: "italic bold",
          textAlign: "center",
          marginTop: "1rem",
        }}
      >
        <h1>Please Read the following Instruction carefully</h1>
      </div>
      <div
        className="examname"
        style={{ textAlign: "left", marginTop: "5%", marginLeft: "1rem", border: "none" }}
      >
        General Instructions :
      </div>
      <ol
        type="1"
        style={{
          marginTop: ".7rem",
          marginLeft: "2rem",
          margin: "02% 10%",
          lineHeight: 2,
        }}
      >
        <li>
          1. Total of 30 Minutes duration will be given to attempt the
          questions.
        </li>
        <li>
          2. The clock has benn set at the server and the countdown timer at the
          top right corner of your screen will be displayed the time remaining
          for you to complete the exam. When the clock runs out the exam ends by
          default. you are not required to end or submit your exam.
        </li>
        <li>
          3. The Question palette at the right of screen shows one of the
          following statuses of each of the question numbered :
        </li>
        <br />
      </ol>
      <div className="Checkbox">
        <span>
          <input
            onChange={(e) => {
              checked(e);
            }}
            className="Introbox"
            type="checkbox"
            name=""
            id=""
          />{" "}
          <label style={{ color: "white", marginLeft: "1rem" }} htmlFor="">
            I have read the instruction given above.
          </label>
        </span>
      </div>
      <div
        className="d-grid gap-2"
        style={{
          width: "30%",
          height: "20%",
          display: "flex",
          margin: " 2rem auto",
        }}
      >
        <Button
          disabled={!check}
          onClick={handleClick}
          onClickvariant="success"
          size="md"
        >
          Start Exam
        </Button>
      </div>
    </>
  );
}

export default Starting;
