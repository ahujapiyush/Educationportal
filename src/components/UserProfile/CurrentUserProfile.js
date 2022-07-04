import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../Firebase/firebase";

function CurrentUserProfile() {
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

  return (
    <div>
      <h1>
        {profile.FirstName} {profile.LastName}
      </h1>
      <img src={profile.ImageUrl} width="200px" height="200px" />
    </div>
  );
}

export default CurrentUserProfile;
