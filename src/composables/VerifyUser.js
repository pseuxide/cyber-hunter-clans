import { ref } from "@vue/reactivity";
import firebase from "firebase";
import { snap } from "gsap/gsap-core";

export const isVerified = ref("false")

const VerifyUser = (id) => {
    const db = firebase.firestore()
    db.collection("users").doc(id).get().then(snapshot=>{
        if (snapshot.data().authorized === true) {
            localStorage.isVerified = "true"
            isVerified.value = "true"
        } else {
            localStorage.isVerified = "false"
            isVerified.value = "false"
        }
    })
}

export default VerifyUser
