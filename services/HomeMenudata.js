import { useContext, useState, useEffect, useCallback } from "react";

import { Cartinfo_Context } from "../GlobalContext/Context";

import { db } from "../Firebaseconfig";
import {
  collection,
  query,
  where,
  getDocs,
  startAfter,
  limit,
  getDoc,
  doc,
} from "firebase/firestore";
import Alertmessage from "../helpers/Alertmessage";

export const useGetHomemeundata = () => {
  const [cartinfo, setcartinfo] = useContext(Cartinfo_Context);
  const [dishdata, setdishdata] = useState({
    loading: true,
    j_data: null,
    c_data: null,
    s_data: null,
  });
  const [loading, setloading] = useState(true);

  useEffect(() => {
    FUNC_getdishdata();
  }, []);

  const FUNC_getdishdata = async () => {
    try {
      const docRef = doc(db, "MenuDishes", "MenuData");
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alertmessage("error services(303)", "custom_error");
        return;
      } else {
        setdishdata((prev) => ({
          loading: false,
          j_data: docSnap.data()["Jamaican Dishes"],
          c_data: docSnap.data()["Chinese Food"],
          s_data: docSnap.data()["Sea Food"],
        }));
        setloading(false);
      }
    } catch (error) {
      console.log(error);
      Alertmessage("error services(303)", "custom_error");
    }
  };

  const FUNC_isincart = useCallback(
    (passarr, arrtype) => {
      //  console.log("log FUNC_isincart =====================================");
      let newarr = passarr;
      newarr.filter((word, index) => {
        if (word.Incart === true) {
          newarr[index].Incart = false;
        }
      });

      for (let i = 0; i < cartinfo.length; i++) {
        let newitemname = cartinfo[i].split("@");
        let num = newarr.findIndex((dishitemname) => {
          return dishitemname.Dish == newitemname[0];
        });
        if (num > -1) {
          newarr[num].Incart = true;
        }
      }
      /*
      if (JSON.stringify(passarr) === JSON.stringify(newarr)) {
        console.log("1111111111111111111111111111 same");
        return;
      } else {
        console.log("000000000000000000000000000  not");
      }

      if (arrtype === "j") {
        setdishdata((prev) => ({ ...prev, j_data: newarr }));
      } else if (arrtype === "c") {
        setdishdata((prev) => ({ ...prev, c_data: newarr }));
      } else if (arrtype === "s") {
        setdishdata((prev) => ({ ...prev, s_data: newarr }));
      }
      */
    },
    [dishdata, cartinfo]
  );

  useEffect(() => {
    if (loading === true) return;
    FUNC_isincart(dishdata.j_data, "j");
    FUNC_isincart(dishdata.c_data, "c");
    FUNC_isincart(dishdata.s_data, "s");
    setdishdata((prev) => ({ ...prev, b_data: dishdata.j_data }));
  }, [cartinfo, loading]);

  return [dishdata];
};
