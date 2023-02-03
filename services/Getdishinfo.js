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
} from "firebase/firestore";
import Alertmessage from "../helpers/Alertmessage";

export const useGetdishinfo = (pass_dishtype, pass_limit) => {
  const [cartinfo, setcartinfo] = useContext(Cartinfo_Context);
  const [dishdata, setdishdata] = useState({
    data: null,
    loading: true,
    data_of_end: false,
    getmore_loading: false,
    lastdata: null,
  });

  useEffect(() => {
    FUNC_getinfo();
  }, []);

  // FUNC_getinfo =====================================================

  const FUNC_getinfo = async () => {
    try {
      const qr = query(
        collection(db, "Dishies"),
        where("DishType", "==", pass_dishtype),
        limit(pass_limit)
      );
      const querySnapshot = await getDocs(qr);

      if (querySnapshot.size === 0) {
        Alertmessage("error services(2 is 0)", "custom_error");
        return;
      }

      const arr = [];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), Incart: false, Dishid: doc.id });
      });

      const lastdata1 = querySnapshot.docs[querySnapshot.docs.length - 1];

      setdishdata((prev) => ({
        ...prev,
        data: arr,
        loading: false,
        lastdata: lastdata1,
      }));
    } catch (error) {
      Alertmessage("error services(2)", "custom_error");
    }
  };

  // FUNC_restdata=====================================================

  const FUNC_restdata = useCallback(
    (passedarr) => {
      //if (passedarr.length ===0) return
      console.log("log FUNC_restdata =====================================");
      let newarr = dishdata.data;
      newarr.filter((word, index) => {
        if (word.Incart === true) {
          newarr[index].Incart = false;
        }
      });

      for (let i = 0; i < passedarr.length; i++) {
        let newitemname = passedarr[i].split("@");
        let num = newarr.findIndex((dishitemname) => {
          return dishitemname.Dish == newitemname[0];
        });
        if (num > -1) {
          newarr[num].Incart = true;
        }
      }
      setdishdata((prev) => ({ ...prev, data: newarr, loading: false }));
    },
    [dishdata]
  );

  // FUNC_getmoredata=====================================================
  const FUNC_getmoredata = useCallback(
    async (dishtxt) => {
      //console.log(dishdata.lastdata)
      if (dishdata.getmore_loading === true) return;
      if (dishdata.data_of_end === true) return;
      setdishdata((prev) => ({
        ...prev,
        getmore_loading: true,
      }));

      try {
        const qr = query(
          collection(db, "Dishies"),
          where("DishType", "==", dishtxt),
          startAfter(dishdata.lastdata),
          limit(5)
        );

        const querySnapshot = await getDocs(qr);

        if (querySnapshot.size === 0) {
          setdishdata((prev) => ({
            ...prev,
            getmore_loading: false,
            data_of_end: true,
          }));
          return;
        }
        const arr = [];
        querySnapshot.forEach((doc) => {
          //  arr.push(doc.data())
          //console.log(doc.id)
          arr.push({ ...doc.data(), Incart: false, Dishid: doc.id });
        });

        let lastdata1 = querySnapshot.docs[querySnapshot.docs.length - 1];

        let newarr = getmoreifincart(arr);

        let datacombine = [...dishdata.data, ...newarr];

        setdishdata((prev) => ({
          ...prev,
          data: datacombine,
          getmore_loading: false,
          lastdata: lastdata1,
        }));

        //FUNC_restdata(cartinfo)
      } catch (error) {
        Alertmessage("error services(2) loaddata", "custom_error");
        console.log(error);
      }
    },
    [dishdata]
  );

  const getmoreifincart = (arr) => {
    for (let i = 0; i < cartinfo.length; i++) {
      let newitemname = cartinfo[i].split("@");
      let num = arr.findIndex((dishitemname) => {
        return dishitemname.Dish == newitemname[0];
      });
      if (num > -1) {
        arr[num].Incart = true;
      }
    }

    return arr;
  };

  return [dishdata, FUNC_restdata, FUNC_getmoredata];
};
