import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { db } from "../../Firebase/firebase";
import Sidebar from "../../common/Sidebar/Sidebar";
import "./result.css";
import jsPDF from "jspdf";

function AdminResult() {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  let currentIndex = 0;
  let right = 100;

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
  function handleClick() {
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "Exam Name");
    doc.text(120, 20, results[currentIndex].ExamId);

    doc.text(20, 60, "Student Name");
    doc.text(170, 60, "Score");
    doc.text(260, 60, "Total Score");
    doc.text(410, 60, "Branch");
    doc.text(490, 60, "Semester");

    while (currentIndex < results.length) {
      doc.text(20, right, results[currentIndex].StudentName);
      doc.text(180, right, results[currentIndex].Score);
      doc.text(270, right, results[currentIndex].TotalScore);
      doc.text(410, right, results[currentIndex].Branch);
      doc.text(490, right, results[currentIndex].Semester);
      right = right + 40;
      currentIndex++;
    }

    doc.setFont("courier");
    doc.setFontSize("normal");

    doc.save("result.pdf");
  }
  return (
    <>
      <Sidebar />
      <div className="sidebar-gap" style={{ marginTop: "80px" }}>
        <h1> Results</h1>
        <br />
        <Button className="btn btn-primary mb-3" onClick={handleClick}>
          Generate PDF
        </Button>
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
                    alt="ProfileImage"
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

export default AdminResult;
