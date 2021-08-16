<template>
<div class="headerWrapper">
    <img class="headerImage" src="../assets/header.png" alt="header image">
    <transition name="title" appear>
        <h1 class="title">Cyber Hunter Clans</h1>
    </transition>
    <Button label="クランページを作る" class="createNew p-button-rounded p-button-lg customButton" icon="pi pi-plus" @click="CreateClan"/>
    <Dialog v-model:visible="showModal" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}">
        <template #header>
            <h3>認証ユーザーではありません</h3>
        </template>
        <p>あなたはクラン情報を編集する権限を持っていません。</p>
        <template #footer>
            <Button label="OK" icon="pi pi-check" @click="showModal=false" class="customButton" autofocus/>
        </template>
    </Dialog>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        let showModal = ref(false)
        const CreateClan = () => {
            if (localStorage.getItem("isVerified") === "false") {
                showModal.value = true
                return
            }
            console.log("hello world")
        }
        return {
            showModal,
            CreateClan,
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
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
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