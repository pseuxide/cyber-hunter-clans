<template>
  <div id="nav">
    <router-link :to="{name: 'Home'}">ホーム</router-link> |
    <router-link :to="{name: 'ClanList'}">クランリスト</router-link> |
    <router-link :to="{name: 'About'}">このサイトについて</router-link>
    <Login/>
  </div>
  <router-view v-slot ="{Component}">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
import firebase from "firebase"
import Login from "./components/Login.vue"
import {isVerified} from "./composables/VerifyUser"
import { onBeforeMount } from '@vue/runtime-core'
export default {
  components: { Login },
  setup() {
    isVerified.value = localStorage.isVerified
    onBeforeMount(()=> {
      var firebaseConfig = {
        apiKey: "AIzaSyBRA1eJfHkqoOiNRZimlnrYeWZaVyq0NWs",
        authDomain: "cyber-hunter-clans.firebaseapp.com",
        projectId: "cyber-hunter-clans",
        storageBucket: "cyber-hunter-clans.appspot.com",
        messagingSenderId: "671197652558",
        appId: "1:671197652558:web:8413ad70c18e072cd8051f",
        measurementId: "G-QPLKRKEBHZ"
  };
      firebase.initializeApp(firebaseConfig)
    })
  },
}
</script>

<style lang="scss">
html {
  background-color:#17212f;
}
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e8f9e9;
}

#nav {
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

#nav a {
  font-weight: bold;
  color: #e8f9e9;
  text-decoration: none;
  padding: 10px;
  margin: 0 5px;
  border-radius: 4px;
}

#nav a.router-link-exact-active {
  color: #e8f9e9;
  background: #42b983;
}

p, h3 {
  letter-spacing: 1px;
}

img {
  pointer-events: none;
}

.customButton {
  color: #e8f9e9 !important;
  background: #42b983 !important;
  &:hover {
     color: white !important;
     background: #58eba8 !important;
  }
}

.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}
</style>
