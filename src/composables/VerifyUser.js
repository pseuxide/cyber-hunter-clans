import { ref } from "@vue/reactivity";

export const isVerified = ref(false)

const VerifyUser = (id) => {
    if (id === 1262641716105850881) {
        localStorage.isVerified = true
        isVerified.value = true
    } else {
        localStorage.isVerified = false
        isVerified.value = false
    }
}

export default VerifyUser
