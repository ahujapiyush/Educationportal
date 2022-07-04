import React from "react";
import { Link } from "react-router-dom";

function ExamPreview({ id, data }) {
  let { title, duration, subjectName, TimeStamp } = data;

  return (
    <article>
      <h3>{title}</h3>
      <h3> {subjectName}</h3>
      <h4>{duration}</h4>
      <h5>{TimeStamp}</h5>
      <Link to={`exam ${id}`}>Start Test</Link>
    </article>
  );
}

export default ExamPreview;
