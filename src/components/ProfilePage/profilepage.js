import React, { useState, useEffect, createContext } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import Sidebar from "../../common/Sidebar/Sidebar";
import { db } from "../../Firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import "./profilepage.css";
import { Link } from "react-router-dom";

import ExamsListing from "../ExamPage/ExamListing";

const StudentSemester = createContext();
function Profilepage() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState([]);

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
    .catch((error) => {});
  console.log(profile);
  return (
    <>
      <Sidebar />
      <div className="profileCard">
        <Card className="mb-3">
          <Row>
            <Col lg={3} style={{ textAlign: "center", padding: "5%" }}>
              <img
                style={{ borderRadius: "100%" }}
                width="150px"
                height="150px"
                src={profile.ImageUrl}
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
                Name: {profile.FirstName} {profile.LastName}{" "}
              </Card.Title>
              <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                Branch: {profile.Branch}
              </Card.Title>
              <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                Semester {profile.Semester}
              </Card.Title>
              <Card.Title style={{ marginLeft: "6%", lineHeight: "1.5" }}>
                Section: {profile.Section}
              </Card.Title>

              <Link to={`/update-profile`}>
                <Button
                  style={{ width: "35%", float: "right", margin: "5px 0px" }}
                  variant="success"
                >
                  Update Profile
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>

        {/* //ImageUrl name sem branch examid score */}
      </div>
      <div style={{ display: "none" }}>
        <StudentSemester.Provider value={profile.Semester}>
          <ExamsListing />
        </StudentSemester.Provider>
      </div>
    </>
  );
}

export default Profilepage;
export { StudentSemester };
