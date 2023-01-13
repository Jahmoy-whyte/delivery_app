import Toast from 'react-native-toast-message';
const Alertmessage = (msg,errortype)=>{

    Toast.show({
      type: errortype === undefined ?'custom_error' :errortype,
      text1: msg,
      text2: 'This is some something 👋'
    });
  }
export default Alertmessage