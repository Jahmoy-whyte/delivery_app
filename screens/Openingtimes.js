import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar as Expostatusbar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Alertmessage from "../helpers/Alertmessage";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { db } from "../Firebaseconfig";
const Openingtimes = () => {
  const [data, setdata] = useState({
    loading: false,
    data: null,
    open: false,
    otherdatedata: null,
  });

  useEffect(() => {
    fUNC();
  }, []);

  const fUNC = async () => {
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const func = () => {
      return "hithete";
    };

    var date = new Date();

    let dateinfo = {
      dayname: days[date.getDay()],
      daynumber: date.getDay() - 2,
      month: months[date.getMonth()],
      year: date.getFullYear(),

      fn: func,
    };

    try {
      setdata((prev) => ({ ...prev, loading: true }));
      const docRef = doc(db, "Metadata", "Metadata");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //  console.log("Document data:", docSnap.data());
        setdata((prev) => ({
          loading: false,
          data: docSnap.data().Openingtimes,
          open: true,
          otherdatedata: dateinfo,
        }));

        // console.log(docSnap.data().Openingtimes);
      } else {
        Alertmessage("error while getting data");
      }
    } catch (e) {
      Alertmessage("error while getting data");
    }
  };

  const Dateformat = ({ day, time, currentdate }) => {
    day;
    return (
      <View
        style={[
          styles.alltxthold,
          { backgroundColor: day === currentdate ? "#F47A00" : null },
        ]}
      >
        <View>
          <Text
            style={[
              styles.title,
              { color: day === currentdate ? "white" : null },
            ]}
          >
            {day}
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: day === currentdate ? "white" : null },
            ]}
          >
            {time}
          </Text>
        </View>

        <MaterialCommunityIcons
          name="calendar-week-begin"
          size={24}
          color={day === currentdate ? "white" : "black"}
        />
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {data.data != null ? (
        <View>
          <Text
            style={{
              color: "#F47A00",
              marginBottom: 14,
              fontFamily: "Inter-Bold",
              marginLeft: 10,
            }}
          >
            {data.otherdatedata.month +
              " " +
              data.otherdatedata.daynumber +
              ", " +
              data.otherdatedata.year}
          </Text>
          <Dateformat
            day={"Monday"}
            time={data.data.Monday}
            currentdate={data.otherdatedata.dayname}
          />
          <Dateformat
            day={"Tuesday"}
            time={data.data.Tuesday}
            currentdate={data.otherdatedata.dayname}
          />
          <Dateformat
            day={"Wednesday"}
            time={data.data.Wednesday}
            currentdate={data.otherdatedata.dayname}
          />
          <Dateformat
            day={"Thursday"}
            time={data.data.Thursday}
            currentdate={data.otherdatedata.dayname}
          />
          <Dateformat
            day={"Friday"}
            time={data.data.Friday}
            currentdate={data.otherdatedata.dayname}
          />
        </View>
      ) : (
        <ActivityIndicator size={"small"} color={"white"} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginTop: 14,
    backgroundColor: "white",
    flex: 1,
  },

  alltxthold: {
    marginHorizontal: 10,
    paddingVertical: 14,
    borderColor: "#7F7F7F",
    borderWidth: 0.5,
    //borderBottomWidth:0.5,
    borderRadius: 6,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    //marginVertical:10,
  },

  title: {
    color: "black",
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#7F7F7F",
    //backgroundColor:"red",
  },

  //==============================
});

export default Openingtimes;
