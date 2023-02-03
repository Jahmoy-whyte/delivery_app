import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabnavigationscreen from "./screens/Tabnavigationscreen";
import Menuscreen from "./screens/Menuscreen";
import Dishinfoscreen from "./screens/Dishinfoscreen";
import {
  Userinfo_Context,
  Cartinfo_Context,
  Userstate_Context,
} from "./GlobalContext/Context";
import Cartscreen from "./screens/Cartscreen";
import Loggedoutscreen from "./screens/Loggedoutscreen";
import Signupscreen from "./screens/Signupscreen";
import Emailverificationscreen from "./screens/Emailverificationscreen";
import Logingscreen from "./screens/Logingscreen";
import Searchscreen from "./screens/Searchscreen";
import Errormsg from "./components/Errormsg";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import Checkoutscreen from "./screens/Checkoutscreen";
import Paymentscreen from "./screens/Paymentscreen";
import Ordersentscreen from "./screens/Ordersentscreen";
import Loadingscreen from "./components/Loadingscreen";
import Accountscreen from "./screens/Accountscreen";
import { useAuthstate } from "./services/Authstate";
import Myaccountscreen from "./screens/Myaccountscreen";
import Addressscreen from "./screens/Addressscreen";
import Resetpassword from "./screens/Resetpassword";
import AddressInfoscreen from "./screens/AddressInfoscreen";
import Favoritescreen from "./screens/Favoritescreen";

let i = 1;
function App() {
  console.log("main render ====== " + i++);

  const [userinfo, setuserinfo] = useState(null);
  const [cartinfo, setcartinfo] = useState([]);
  const [userscreenstate, setuserscreenstate] = useState();
  //const [user_info , loading]  = useGetuserinfo()
  const [userstatedata, loading] = useAuthstate();

  useEffect(() => {
    if (loading) return;

    setuserscreenstate(userstatedata);
    //  console.log(userstatedata)
  }, [loading]);

  const toastConfig = {
    custom_error: ({ text1, props }) => (
      <Errormsg msg={text1} alerttype={"error"} />
    ),
    custom_success: ({ text1, props }) => (
      <Errormsg msg={text1} alerttype={"success"} />
    ),
    custom_notify: ({ text1, props }) => (
      <Errormsg msg={text1} alerttype={"notify"} />
    ),
  };

  const Stack = createNativeStackNavigator();
  return (
    <Userinfo_Context.Provider value={[userinfo, setuserinfo]}>
      <Cartinfo_Context.Provider value={[cartinfo, setcartinfo]}>
        <Userstate_Context.Provider
          value={[userscreenstate, setuserscreenstate]}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                animation: "fade",
                headerShown: false,
                gestureEnabled: false,
              }}
            >
              {userscreenstate === "loggedout" ? (
                <Stack.Group>
                  <Stack.Screen name="loggedout" component={Loggedoutscreen} />
                  <Stack.Screen name="signup" component={Signupscreen} />
                  <Stack.Screen name="login" component={Logingscreen} />
                  <Stack.Screen
                    name="emailverifi"
                    component={Emailverificationscreen}
                  />
                  <Stack.Screen name="resetpass" component={Resetpassword} />
                </Stack.Group>
              ) : userscreenstate === "loggedin" ? (
                <Stack.Group>
                  <Stack.Screen name="Tabnav" component={Tabnavigationscreen} />
                  <Stack.Screen
                    //   options={{ animation: "none" }}
                    name="Menu"
                    component={Menuscreen}
                  />
                  <Stack.Screen
                    options={{ animation: "none" }}
                    name="search"
                    component={Searchscreen}
                  />
                  <Stack.Screen name="Cart" component={Cartscreen} />
                  <Stack.Screen
                    //    options={{ animation: "none" }}
                    name="checkout"
                    component={Checkoutscreen}
                  />
                  <Stack.Screen name="payment" component={Paymentscreen} />
                  <Stack.Screen name="ordersent" component={Ordersentscreen} />
                  <Stack.Screen name="Dishinfo" component={Dishinfoscreen} />
                  <Stack.Screen name="account" component={Accountscreen} />
                  <Stack.Screen name="myaccount" component={Myaccountscreen} />
                  <Stack.Screen name="address" component={Addressscreen} />
                  <Stack.Screen
                    name="addressinfo"
                    component={AddressInfoscreen}
                  />
                  <Stack.Screen name="favorite" component={Favoritescreen} />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen name="loading" component={Loadingscreen} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>

          <Toast config={toastConfig} />
        </Userstate_Context.Provider>
      </Cartinfo_Context.Provider>
    </Userinfo_Context.Provider>
  );
}

export default App;
