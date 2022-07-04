import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar/Sidebar";
import { db } from "../../Firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import "./ExamListing.css";
import { StudentSemester } from "../ProfilePage/profilepage";

const ExamsListing = () => {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [semester, setSemester] = useState("");
  const [profile, setProfile] = useState([]);
  const { currentUser } = useAuth();

  // console.log(currentUser.id);

  // useEffect(() => {
  //   db.collection("UserData")
  //     .doc("SO5VxeefKEO06tCEzin0sSJXUf13")
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         setProfile(doc.data());
  //       } else {
  //         // doc.data() will be undefined in this case
  //       }
  //     })
  //     .catch((error) => { });
  //   console.log(profile.Semester);
  //   // function handleSemesterOptionChange(event) {
  //   //   setSemester(event.target.value);
  //   // }
  //   setSemester(profile.Semester);
  // })

  useEffect(() => {
    const getPostsFromFirebase = [];

    db.collection("Exam")
      .where("semester", "==", "7th")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setExams(getPostsFromFirebase);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [semester]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }

  return (
    <div className="container">
      <Sidebar />
      <div
        style={{
          maxWidth: "100%",
          marginTop: "7%",
          marginLeft: "8%",
          marginRight: "8%",
        }}
      >
        {/* <BrowserView>
          <select
            style={{ marginLeft: "20%", width: "15%", textAlign: "center" }}
            onChange={handleSemesterOptionChange}
          >
            <option defaultChecked value={"1st"}>
              Semester 1
            </option>sss
            <option value={"2nd"}>Semester 2</option>
            <option value={"3rd"}>Semester 3</option>
            <option value={"4th"}>Semester 4</option>
            <option value={"5th"}>Semester 5</option>
            <option value={"6th"}>Semester 6</option>
            <option value={"7th"}>Semester 7</option>
            <option value={"8th"}>Semester 8</option>
          </select>
        </BrowserView> */}
        {/* <MobileView>
          <select
            style={{
              marginLeft: "20%",
              marginTop: "15%",
              width: "50%",
              textAlign: "center",
              padding: "5px"
            }}
            onChange={handleSemesterOptionChange}
          >
            <option defaultChecked value={"1st"}>
              Semester 1
            </option>
            <option value={"2nd"}>Semester 2</option>
            <option value={"3rd"}>Semester 3</option>
            <option value={"4th"}>Semester 4</option>
            <option value={"5th"}>Semester 5</option>
            <option value={"6th"}>Semester 6</option>
            <option value={"7th"}>Semester 7</option>
            <option value={"8th"}>Semester 8</option>
          </select>
        </MobileView> */}

        {exams.length > 0 ? (
          exams.map((exam) => (
            <div key={exam.id} style={{ marginTop: "30px" }}>
              <Card className="sidebar-width-browser" style={{ width: "80vw" }}>
                <Card.Header style={{ background: "#376DFF", color: "white" }}>
                  <h1>{exam.title}</h1>
                </Card.Header>
                <Card.Text className="cutom-text-exam">
                  <h4 style={{ color: "#676464" }}>
                    Subject :<span>{exam.subjectName}</span>
                  </h4>
                </Card.Text>
                <Card.Text className="cutom-text-exam">
                  <h4 style={{ color: "#676464" }}>
                    Duration : {exam.duration} Minutes
                  </h4>
                </Card.Text>
                <Card.Text className="cutom-text-exam">
                  <h4 style={{ color: "#676464" }}>
                    Semester : {exam.semester}
                  </h4>
                </Card.Text>
                <Link to={`/starting/${exam.id}`}>
                  <Button
                    style={{ width: "35%", float: "right", margin: "5px 0px" }}
                    variant="success"
                  >
                    Start Test
                  </Button>
                </Link>
              </Card>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "10%" }}>No Exams Posted Yet</h1>
        )}

      </div>

    </div>
  );
};

export default ExamsListing;
