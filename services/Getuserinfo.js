import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../Firebaseconfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

import Alertmessage from "../helpers/Alertmessage";

export const useGetuserinfo = (autorun) => {
  const auth = getAuth();
  const [userdata, setuserdata] = useState({
    userdata: null,
    cartdata: null,
    loading: true,
  });
  const [metadata, setmetadata] = useState({ data: null, loading: true });

  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, "Metadata", "Metadata"), (doc) => {
        //  console.log("Current data: ", doc.data());
        setmetadata({ data: doc.data(), loading: false });
      });

      return unsub;
    } catch (error) {
      Alertmessage("error services(3)", "custom_error");
    }
  }, []);

  useEffect(() => {
    if (autorun === false) return;
    FUNC_getuserinfo(auth.currentUser.uid);
  }, [autorun]);

  const FUNC_getuserinfo = async (id) => {
    try {
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alertmessage("error services(3 usernotfound)", "custom_error");
        return;
      } else {
        let data1 = {
          userid: id,
          Email: docSnap.data().Email,
          fname: docSnap.data().FirstName,
          lname: docSnap.data().LastName,
          phone: docSnap.data().PhoneNumber,
          address: docSnap.data().Address,
          role: docSnap.data().Role,
          favorite: docSnap.data().Favorite,
        };
        let data2 = docSnap.data().Cartitems;
        setuserdata((prev) => ({
          ...prev,
          userdata: data1,
          cartdata: data2,
          loading: false,
        }));
      }
    } catch (error) {
      Alertmessage("error services(3)", "custom_error");
    }
  };

  return [userdata.userdata, userdata.cartdata, userdata.loading, metadata];
};
