import React, { useState } from "react";
import "./AdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { BrowserView, MobileView } from "react-device-detect";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

//Warning : 2 Views Brower and Mobile

function AdminSidebar(props) {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <MobileView>
        {" "}
        <div className="wrapper hover_collapse">
          <div className="top_navbar">
            <div className="logo">SSIPMT TEST</div>
            <div className="menu">
              <div className="hamburger" onClick={Drawer}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_inner">
              <ul>
                <li>
                  <Link to="/admin-dashboard">
                    {/* <span className="icon">    <FontAwesomeIcon icon={faQrcode} /></span> */}
                    <span className="text">Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/addExam">
                    {/* <span className="icon"> <FontAwesomeIcon icon={faUser} /></span> */}
                    <span className="text">Add Exam</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={handleLogout}>
                    {/* <span className="icon"> <FontAwesomeIcon icon={faUser} /></span> */}
                    <span className="text">Log out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MobileView>

      <BrowserView>
        <div className="wrapper">
          <div className="top_navbar">
            <div className="logo">SSIPMT TEST</div>
            <div className="menu">
              <div className="hamburger" onClick={Drawer}>
                <FontAwesomeIcon icon={faBars} />
              </div>
            </div>
          </div>
          <div className="sidebar">
            <div className="sidebar_inner">
              <ul>
                <li>
                  <Link to="/admin-dashboard">
                    {/* <span className="icon">    <FontAwesomeIcon icon={faQrcode} /></span> */}
                    <span className="text">Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/addExam">
                    {/* <span className="icon"> <FontAwesomeIcon icon={faUser} /></span> */}
                    <span className="text">Add Exam</span>
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>
                    {/* <span className="icon"> <FontAwesomeIcon icon={faUser} /></span> */}
                    <span className="text">Log out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BrowserView>
    </>
  );
}

function Drawer() {
  var wrapper = document.querySelector(".wrapper");

  var hamburger = document.querySelector(".hamburger");
  hamburger.closest(".wrapper").classList.toggle("hover_collapse");
}

export default AdminSidebar;
