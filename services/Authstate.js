import React , {useState,useEffect} from "react";
import {getAuth,onAuthStateChanged} from "firebase/auth";

import Alertmessage from "../helpers/Alertmessage";



export const  useAuthstate = ()=>{
  //console.log("useAuthstate =============================")
    

  const auth = getAuth()

   const [getdata, setgetdata] = useState
   ({s_SCREENSTATE:null,
     s_LOADING:true,
     s_ERROR:null,
  })



    
  useEffect(() =>{
    getauthstate()  
   },[])


    
const getauthstate = async() =>{
    try{
      const unsub = await onAuthStateChanged(auth , (response)=> {  
        
        if (response !=null){
      
          setgetdata({
            s_SCREENSTATE: response.emailVerified === true?"loggedin":"loggedout",
            s_ERROR:null,
            s_LOADING:false,
          })
        }else{

          setgetdata({
            s_SCREENSTATE: "loggedout",
            s_ERROR:null,
            s_LOADING:false,
          })

        }
        
       
    
    
      })
    return unsub

    }catch(error){
      
        setgetdata({ 
                      s_SCREENSTATE:"loggedout",
                      s_ERROR:error,
                      s_LOADING:false,
                    })
      Alertmessage("Auth-error","custom_error")
    }
}




  return [getdata.s_SCREENSTATE,getdata.s_LOADING]
}

 
