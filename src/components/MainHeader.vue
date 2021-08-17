<template>
<div class="headerWrapper">
    <img class="headerImage" src="../assets/header.png" alt="header image">
    <transition name="title" appear>
        <h1 class="title">Cyber Hunter Clans</h1>
    </transition>
    <router-link :to="{name: 'CreateNew'}" custom v-slot="{href}">
        <div class="p-grid p-jc-center">
            <a :href="href" v-if="isVerified === 'true'" class="createNew p-col-10 p-md-6 p-lg-3"><div>始める</div></a>
            <a v-else @click="GotoClanList" class="createNew p-col-10 p-md-6 p-lg-3"><div>始める</div></a>
        </div>
    </router-link>
    <router-view/>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import {isVerified} from "../composables/VerifyUser"
import {useRouter} from "vue-router"
export default {
    setup() {
        const router = useRouter()

        const GotoClanList = () => {
            router.push({name: "ClanList"})
        }
        
        return {
            GotoClanList,
            isVerified,
        }
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
.headerWrapper { 
    position: relative;
    width: 100%;
    height: 800px;
    .headerImage {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .createNew {
        &:link, &:active, &:visited {
            color: white;
        }
        padding: 25px;
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        align-items: center;
        background: #42b983;
        color: #e8f9e9;
        border: 3px solid #e8f9e9;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 2px;
        &:hover {
            color: white;
            background: #58eba8;
            border-color: white;
        }
    }
}
.title {
    position: absolute;
    font-family: 'Montserrat', sans-serif;
    font-size: 70px;
    left: 50%;
    top: 30%;
    color: white;
    transform: translate(-50%, -50%);
}


.title-enter-from,
.title-leave-to {
    opacity: 0;
    top: 35%;
}
.title-enter-active,
.title-leave-active {
    transition: all 0.8s ease;
    transition-delay: 0.1s;
}

.headerImage-enter-from,
.headerImage-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.headerImage-enter-active,
.headerImage-leave-active {
    transition: all 0.7s ease;
}

</style>