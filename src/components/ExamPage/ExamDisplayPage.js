import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../common/loading-spinner";
import { useParams } from "react-router";
import { db } from "../../Firebase/firebase";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ExamDisplayPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";


function ExamDisplayPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [examnum, setExamnum] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [score, setScore] = useState(0);

  const [minutes, setMinutes] = useState(29);
  const [seconds, setSeconds] = useState(59);
  const [options, setOptions] = useState([]);

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [attemptedQuestion, setAttemptedQuestion] = useState(0);
  const [notattemptedQuestion, setNotAttemptedQuestion] = useState(0);
  const [MarkForReview, setMarkForReview] = useState(0);
  const [disable, setDisable] = useState(true);

  const history = useHistory();
  const total = exams.length;
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState([]);
  const [selectedAnswerList, setSelectedAnswerList] = useState([]);
  const [numberOfAttemptedQuestions, setNumberOfAttemptedQuestions] =
    useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const [notAttempted, setNotAttempted] = useState(0);
  const [correctAnswerList, setCorrectAnswerList] = useState([]);

  db.collection("UserData")
    .doc(currentUser.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setProfile(doc.data());
      } else {
        // doc.data() will be undefined in this case
      }
    })
    .catch((error) => { });

  useEffect(() => {
    function updateTime() {
      if (minutes === 0 && seconds === 0) {
        //reset
        setSeconds(0);
        setMinutes(0);
      } else {
        if (seconds === 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }
    }
    const token = setTimeout(updateTime, 1000);

    return function cleanUp() {
      clearTimeout(token);
    };
  }, [minutes, seconds]);

  useEffect(() => {
    let optionsCopy = [];
    if (exams.length > 0) {
      optionsCopy.push(exams[currentIndex].option1);
      optionsCopy.push(exams[currentIndex].option2);
      optionsCopy.push(exams[currentIndex].option3);
      optionsCopy.push(exams[currentIndex].option4);
      setCorrectAnswer(exams[currentIndex].correctAnswer);
    }

    setOptions(optionsCopy);
  }, [exams, currentIndex]);

  useEffect(() => {
    let getPostsFromFirebase = [];
    const subscriber = db
      .collection("Exam/" + id + "/addQuestion")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setExams(getPostsFromFirebase);
        setLoading(false);
        console.log(getPostsFromFirebase);
        setExamnum(getPostsFromFirebase);

        setNotAttemptedQuestion(exams.length);
        console.log("Not attempted on api call", exams.length);
      });

    // return cleanup function
    return () => subscriber();
  }, [loading, id, exams.length]); // empty dependencies array => useEffect only called once

  useEffect(() => {
    const getExamDetails = JSON.parse(sessionStorage.getItem("EXAM_DETAILS"));

    if (
      getExamDetails &&
      (getExamDetails.attemptedQuestions > 0 ||
        getExamDetails.getNotAttemptedQuestions ||
        getExamDetails.selectedAnswers.length > 0)
    ) {
      console.log("getExamDetails", getExamDetails);
      setCurrentIndex(getExamDetails.currentQuestion);
      setSelectedAnswerList(getExamDetails.selectedAnswers);
      setMarkForReview(+getExamDetails.markAsReview);
      setNotAttempted(+getExamDetails.getNotAttemptedQuestions);
      console.log(
        "inside session storage call",
        +getExamDetails.getNotAttemptedQuestions
      );
      setAttemptedQuestion(+getExamDetails.attemptedQuestions);
      setNumberOfAttemptedQuestions(+getExamDetails.attemptedQuestions);
      setScore(+getExamDetails.studentScore);
    }

    return () => sessionStorage.removeItem("EXAM_DETAILS");
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (notAttempted > 0) {
        setNotAttemptedQuestion(+notAttempted);
        console.log("Value of temp variable", notAttempted);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [notAttempted]);

  //Setting the data in the local storage
  useEffect(() => {
    const examDetails = {
      currentQuestion: currentIndex,
      selectedAnswers: selectedAnswerList,
      attemptedQuestions: attemptedQuestion,
      getNotAttemptedQuestions: notattemptedQuestion,
      markAsReview: MarkForReview,
      studentScore: score,
    };

    sessionStorage.setItem("EXAM_DETAILS", JSON.stringify(examDetails));
  }, [
    currentIndex,
    selectedAnswerList,
    attemptedQuestion,
    notattemptedQuestion,
    MarkForReview,
    score,
  ]);

  useEffect(() => {
    const spentTime = sessionStorage.getItem("SPENT_TIME");
    if (spentTime && spentTime > 0) {
      const totalSpentTime = spentTime.split(".");
      const minute = 29 - +totalSpentTime[0];
      const second = 59 - +totalSpentTime[1];
      setMinutes(minute);
      setSeconds(second);
    }

    return () => sessionStorage.removeItem("SPENT_TIME");
  }, []);

  useEffect(() => {
    const time1 = 29.59;
    const time2 = +`${minutes}.${seconds}`;
    const substractedValue = time1 - time2;
    const substractedTime = substractedValue.toFixed(2);

    sessionStorage.setItem("SPENT_TIME", substractedTime);
  }, [seconds, minutes]);

  const storeSelectedAnswer = (item, indexNumber) => {
    let _localArray = selectedAnswerList;
    if (_localArray.length > 0 && _localArray.length - 1 >= currentIndex) {
      _localArray[currentIndex] = { item: item, index: indexNumber };
      if (_localArray[currentIndex] === correctAnswer) {
        setScore((prev) => prev + 1);
      } else if (_localArray[currentIndex] !== correctAnswer) {
        setScore((prev) => prev - 1);
      }
    } else {
      _localArray.push({ item: item, index: indexNumber });
      setNumberOfAttemptedQuestions((prevValue) => prevValue + 1);
      setAttemptedQuestion(attemptedQuestion + 1);
      setNotAttemptedQuestion(notattemptedQuestion - 1);

      if (item === correctAnswer) {
        setScore((prev) => prev + 1);
      }
    }
    return _localArray;
  };

  const isChecked = (indexNumber) => {
    const isDataPresent = selectedAnswerList.find((value, index) => {
      if (currentIndex === index) {
        return value.index === indexNumber;
      } else {
        return false;
      }
    });
    if (isDataPresent && selectedAnswerList.length - 1 >= currentIndex) {
      return true;
    } else {
      return false;
    }
  };

  function handleOptionChange(event, index) {
    const answerList = storeSelectedAnswer(event.target.value, index);
    setSelectedAnswerList(answerList);
    console.log(answerList);

    AnswerCheck(event.target.value);
  }

  function AnswerCheck(answerSelected) {
    console.log("Correct Answer is " + correctAnswer);
    console.log("Selected Answer is " + answerSelected);

    if (answerSelected === correctAnswer) {
      setScore(score + 1);
    }
    if (currentIndex < exams.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex >= exams.length - 1) {
      setDisable(false);
    }
  }

  const prevButtonClickedHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      if (currentIndex - 1 < exams.length - 1) {
        setDisable(true);
      }
    }
  };

  const nextButtonClickedHandler = () => {
    if (currentIndex !== exams.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    if (currentIndex >= exams.length - 1) {
      setDisable(false);
    }
  };

  function handleMarkForReviewButton() {
    setMarkForReview(MarkForReview + 1);
    setCurrentIndex(currentIndex + 1);
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const goBackButtonHandler = () => {
    handleFinishButton();
    // history.replace("/result/" + id);
  };

  async function handleFinishButton() {
    try {
      setLoading(true);
      await db
        .collection("Exam")
        .doc(id)
        .collection("Result")
        .doc(currentUser.uid)
        .set({
          Score: score.toString(),
          TotalScore: total.toString(),
          StudentName: profile.FirstName + " " + profile.LastName,
          ImageUrl: profile.ImageUrl,
          Branch: profile.Branch,
          Semester: profile.Semester,
          Section: profile.Section,
          ExamId: id,
        });
      history.replace("/result/" + id);
    } catch (error) { }
    setLoading(false);
  }
  const Popup = props => {


    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };
  return (
    <>
      <Row>
        <Col lg={10}>
          <div className="container">
            {minutes > 0 || seconds > 0 ? (
              <>
                <Container fluid>
                  <Row
                    style={{
                      background: "white",
                      borderRadius: "10px",
                      fontSize: "1.5rem",
                      fontStyle: "bold",
                      padding: "1.5%",
                    }}
                  >
                    <Col sm={8}>Exam ID : {exams[currentIndex].ExamId} </Col>
                    <Col sm={4}>
                      <div style={{ float: "right" }}>
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ color: "grey" }}
                        ></FontAwesomeIcon>{" "}
                        {minutes}:{seconds}
                      </div>
                    </Col>
                  </Row>
                </Container>

                {exams.length > 0 ? (
                  <div
                    key={exams[currentIndex].question}
                    style={{
                      background: "white",
                      marginTop: "30px",
                      borderRadius: "10px",
                      padding: "5%",
                    }}
                  >
                    <h2 style={{ marginBottom: "20px" }}>
                      <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
                        Q.{currentIndex + 1}
                      </span>{" "}
                      {exams[currentIndex].question}
                    </h2>

                    {options.map((result, index) => (
                      <div
                        key={index}
                        style={{
                          padding: "2%",
                          fontSize: "1.2rem",
                          fontWeight: "400",
                          letterSpacing: "1px",
                        }}
                      >
                        <input
                          type="radio"
                          value={result}
                          name="option"
                          onChange={(event) => handleOptionChange(event, index)}
                          defaultChecked={isChecked(index)}
                        />
                        &emsp;<b>{result}</b>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1 style={{ textAlign: "center", marginTop: "100px" }}>
                    No Questons Yet Try Later :(
                  </h1>
                )}

                <button onClick={prevButtonClickedHandler}>Prev</button>
                <Row>
                  <Col sm={4}>
                    <Button
                      className="btn btn-primary  mt-9"
                      onClick={nextButtonClickedHandler}
                      disabled={!disable}
                      style={{
                        fontSize: "1.5rem",
                        width: "14rem",
                        margin: "5% 0",
                      }}
                    >
                      Next
                    </Button>
                  </Col>
                  <Col sm={4}>
                    <Button
                      className="btn btn-secondary  float-right"
                      onClick={handleMarkForReviewButton}
                      style={{
                        fontSize: "1.5rem",
                        width: "14rem",
                        margin: "5% 0",
                        color: "white",
                      }}
                    >
                      Mark For Review
                    </Button>
                  </Col>
                  <Col sm={4}>


                    {isOpen && <Popup
                      content={<>
                        <div style={{ textAlign: "center" }}>
                          <h3 ><b>Are You Sure to Submit Your Test!</b></h3>
                          <Button
                            className="btn btn-primary float-left mr-5"
                            onClick={togglePopup}

                            style={{
                              fontSize: "1.5rem",
                              width: "14rem",
                              margin: "5%",
                            }}
                          >
                            Continue
                          </Button>
                          <Button
                            className="btn btn-success  float-left"
                            onClick={handleFinishButton}

                            style={{
                              fontSize: "1.5rem",
                              width: "14rem",
                              margin: "5% ",
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </>}
                      handleClose={togglePopup}
                    />}

                    <Button
                      className="btn btn-success  float-right"
                      onClick={togglePopup}

                      style={{
                        fontSize: "1.5rem",
                        width: "14rem",
                        margin: "5% 0",
                      }}
                    >
                      Finish
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <div>
                <p>Exam finished</p>
                <Button onClick={goBackButtonHandler}>Go back</Button>
              </div>
            )}
          </div>
        </Col>
        <Col lg={2}>
          <div style={{ background: "white", width: "400px" }}>
            <div style={{ padding: "10% 5%" }}>
              <b>You are viewing CPP Programing Language</b>
            </div>
            <div>
              <h3>
                <b style={{ marginLeft: "5%" }}>Question Pallete</b>
              </h3>
            </div>
            <br />
            {examnum.map((exam, index) => (
              <div
                key={index}
                style={{ padding: "2% 5%", display: "inline-block" }}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1 <= numberOfAttemptedQuestions ? (
                  <div className="btn btn-success">{index + 1}</div>
                ) : (
                  <div className="btn btn-danger">{index + 1}</div>
                )}
              </div>
            ))}
            <br />
            <div style={{ padding: "3% 5%" }}>
              <Button className="btn btn-success">{attemptedQuestion}</Button>
              <strong style={{ marginLeft: "14px" }}>Attempted Question</strong>
            </div>
            <div style={{ padding: "3% 5%" }}>
              <Button className="btn btn-danger">{notattemptedQuestion}</Button>
              <strong style={{ marginLeft: "14px" }}>Not Attempted</strong>
            </div>
            <div style={{ padding: "3% 5%" }}>
              <Button className="btn btn-secondary">{MarkForReview}</Button>
              <strong style={{ marginLeft: "14px" }}>Mark For Review</strong>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
export default ExamDisplayPage;


// examDetails = {
//   currentQuestion: number,
//   selectedAnswers: [ ],
//   remainingTime: number,
//   attemptedQuestions: number,
//   notAttemptedQuestions: number,
//   markAsReview: number
//   }
