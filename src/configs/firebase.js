
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBd-AYFAHk897EjCAE3yaTFwcWZJtCv7aQ",
    authDomain: "hrms-807da.firebaseapp.com",
    projectId: "hrms-807da",
    storageBucket: "hrms-807da.appspot.com",
    messagingSenderId: "746316996509",
    appId: "1:746316996509:web:33ec2b4efa64a306969974",
    measurementId: "G-TCLWYHS62X"
};

const app = initializeApp(firebaseConfig);
const imageDB = getStorage(app);

export { imageDB };