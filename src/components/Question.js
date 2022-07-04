import firebase from "../Firebase/firebase.js";
let cachedQuestions;
const getAllQuestions = async () => {
  if (cachedQuestions) return cachedQuestions;
};

const collectionRef = firebase.firestore();
