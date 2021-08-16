import { ref } from "@vue/reactivity";

const VerifyUser = (id) => {
    if (id === 1262641716105850881) {
        localStorage.setItem("isVerified", true)
    } else {
        localStorage.setItem("isVerified", false)
    }
}

export default VerifyUser
