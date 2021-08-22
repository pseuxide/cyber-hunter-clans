<template>
<div class="logInfo">
<Avatar :image="userIcon" shape="circle"/>
<div v-if="userData" class="loginUsername">{{userData.displayName}}</div>
<div class="log">
    <Button label="Login" icon="pi pi-twitter" iconPos="right" class="customButton" @click="LoginWithTwitter" v-if="!userData"/>
    <Button label="Logout" icon="pi pi-sign-out" iconPos="right" class="p-button-outlined" @click="Logout" v-else/>
</div>
</div>
</template>

<script>
import firebase from "firebase"
import "firebase/auth";
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import VerifyUser from "../composables/VerifyUser"
import {isVerified} from "../composables/VerifyUser"
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const userData = ref(null)
        const userIcon = ref("")
        const additionalData = ref(null)

        const db = firebase.firestore()

        const LoginWithTwitter = () => {
            const provider = new firebase.auth.TwitterAuthProvider();
            firebase.auth().signInWithPopup(provider)
            .then((result) => {
                userData.value = result.user
                userIcon.value = result.user.photoURL
                additionalData.value = result.additionalUserInfo.profile
                localStorage.userID = result.user.uid
                const usersRef = db.collection("users").doc(result.user.uid)
                usersRef.get().then(snapshot=>{
                    if (snapshot.exists === false) {
                        usersRef.set({
                            authorized: false
                        }) //create empty document with named uid as an initialization
                    }
                }).then(()=>{
                    VerifyUser(result.user.uid)
                })
            })
        }

        const Logout = () => {
            firebase.auth().signOut()
            userData.value = null
            userIcon.value = ""
            additionalData.value = null
            localStorage.isVerified = false
            isVerified.value = "false"
            localStorage.userID = ""
            router.push({name: "Home"})
        }

        onMounted(()=>{
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    userData.value = user
                    userIcon.value = user.photoURL
                }
            })
        })

        return {
            LoginWithTwitter,
            Logout,
            userData,
            userIcon,
        }
    },
}
</script>

<style lang="scss">
    .logInfo {
        position: absolute;
        right: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .log {
        display: inline-block;
        margin-left: 10px;
    }
    .loginUsername {
        margin-left: 10px;
        font-weight: bold;
    }
    .logButton {
        color: #e8f9e9;
        background: #42b983;
        &:hover {
            color: white !important;
            background: #58eba8 !important;
        }
    }
</style>