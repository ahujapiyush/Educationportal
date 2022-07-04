import React, { useEffect, useState } from "react";
import { Card, Button, Row } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("Exam").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setExams(getPostsFromFirebase);
      setLoading(false);
    });

    // return cleanup function
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  function handleOnClick(id) {
    db.collection("Exam")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  return (
    <div className="container">
      <AdminSidebar />
      <div
        style={{
          maxWidth: "100%",
          marginTop: "7%",
          marginLeft: "8%",
          marginRight: "8%",
        }}
      >
        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam.id} style={{ marginTop: "30px" }}>
              <Card
                className="sidebar-width-browser"
                style={{ width: "80vw", borderRadius: "10px" }}
              >
                <Card.Header style={{ backgroundColor: "white" }}>
                  <h1>{exam.title}</h1>{" "}
                  <Link
                    style={{ display: "inline" }}
                    to={`/admin/results/${exam.id}`}
                  >
                    {" "}
                    <Button
                      style={{ width: "30%", float: "right" }}
                      variant="primary"
                    >
                      See Result
                    </Button>
                  </Link>
                </Card.Header>

                <Card.Text className="cutom-text-exam">
                  {" "}
                  <h2>
                    Subject : <span>{exam.subjectName}</span>
                  </h2>
                </Card.Text>
                <Card.Text className="cutom-text-exam">
                  {" "}
                  <h4 style={{ color: "#676464" }}>
                    Duration : {exam.duration} Minutes
                  </h4>
                </Card.Text>
                <Card.Text className="cutom-text-exam">
                  {" "}
                  <h4>Semester : {exam.duration}</h4>
                </Card.Text>
                <Link style={{ display: "inline" }}>
                  {" "}
                  <Button
                    style={{ width: "30%", float: "right" }}
                    variant="danger"
                    onClick={() => handleOnClick(exam.id)}
                  >
                    Delete Exam
                  </Button>
                </Link>
              </Card>
            </div>
          ))
        ) : (
          <h1>no exams yet :(</h1>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
