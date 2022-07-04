import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { db } from "../../Firebase/firebase";
import Sidebar from "../../common/Sidebar/Sidebar";
import "./result.css";

function Result() {
  const { id } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    let GetResultsFromFirebase = [];
    const subscriber = db
      .collection("Exam/" + id + "/Result")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          GetResultsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setResults(GetResultsFromFirebase);
      });

    // return cleanup function
    return () => subscriber();
  }, [id]);

  return (
    <>
      <Sidebar />
      <div className="sidebar-gap" style={{ marginTop: "80px" }}>
        <h1> Results</h1>
        {results.map((result) => (
          <div>
            <Card className="mb-3">
              <Row>
                <Col lg={3} style={{ textAlign: "center", padding: "5%" }}>
                  <img
                    style={{ borderRadius: "100%" }}
                    width="150px"
                    height="150px"
                    src={result.ImageUrl}
                    alt=""
                  />
                </Col>
                <Col lg={9}>
                  <Card.Title
                    style={{
                      marginLeft: "6%",
                      padding: "5% 0 0 0",
                      lineHeight: "1.5",
                    }}
                  >
                    Name : {result.StudentName}
                  </Card.Title>
                  <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                    Branch : {result.Branch}
                  </Card.Title>
                  <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                    Semester : {result.Semester}
                  </Card.Title>
                  <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                    ExamID : {result.ExamId}
                  </Card.Title>
                  <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                    Score : {result.Score}/{result.TotalScore}
                  </Card.Title>
                </Col>
              </Row>
            </Card>

            {/* //ImageUrl name sem branch examid score */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Result;
