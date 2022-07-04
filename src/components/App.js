import React from "react";
import { Container } from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgetPassword from "./ForgetPassword";
import UpdateProfile from "./UpdateProfile";
import AddExam from "./AddExam";
import AddQuestions from "./AddQuestions";
import UserProfile from "./UserProfile";
import Starting from "./ExamPage/Starting";
import ExamListing from "./ExamPage/ExamListing";
import ExamDisplayPage from "./ExamPage/ExamDisplayPage";
import LoginPageForm from "./Login/login";
import SignupPage from "../components/Signup/Signup";
import CurrentUserProfile from "./UserProfile/CurrentUserProfile";
import AdminLogin from "./AdminLogin/AdminLogin";
import dashboard from "./Dashboard/dashboard";
import Result from "./Result/result";
import Profilepage from "./ProfilePage/profilepage";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminResult from "./AdminResult/AdminResult";

function App() {
  return (
    <Container
    // className="d-flex"
    // style={{
    //   margin : "0",

    // }}
    >
      <div
      // className="w-100"
      // style={{
      //   maxWidth: "100%",
      //   marginTop : "7%",
      //   marginLeft : "8%"  ,marginRight : "8%"     }}
      >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
              <PrivateRoute
                path="/starting/:id"
                component={Starting}
              ></PrivateRoute>
              <Route path="/signup" component={SignupPage}></Route>
              <Route path="/login" component={LoginPageForm}></Route>
              <Route path="/Adminlogin" component={AdminLogin}></Route>
              <PrivateRoute
                path="/admin/results/:id"
                component={AdminResult}
              ></PrivateRoute>

              <Route path="/forgetPassword" component={ForgetPassword}></Route>
              <PrivateRoute
                path="/update-profile"
                component={UpdateProfile}
              ></PrivateRoute>
              <PrivateRoute
                path="/profile"
                component={Profilepage}
              ></PrivateRoute>
              <PrivateRoute
                path="/result/:id"
                component={Result}
              ></PrivateRoute>
              <PrivateRoute
                path="/dashboard"
                component={dashboard}
              ></PrivateRoute>

              <PrivateRoute path="/addExam" component={AddExam}></PrivateRoute>
              <PrivateRoute
                path="/admin-dashboard"
                component={AdminDashboard}
              ></PrivateRoute>
              <PrivateRoute path="/addQuestions" component={AddQuestions} />
              <PrivateRoute
                path="/userProfile"
                component={UserProfile}
              ></PrivateRoute>
              <PrivateRoute
                path="/exams"
                component={ExamListing}
              ></PrivateRoute>
              <Route path="/exam/:id" component={ExamDisplayPage}></Route>
              <PrivateRoute path="/myprofile">
                <CurrentUserProfile />
              </PrivateRoute>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
