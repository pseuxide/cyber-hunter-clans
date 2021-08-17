<template>
<div style="padding: 0 40px;">
    <transition name="search" appear>
        <span class="p-float-label p-input-icon-left" style="margin-bottom: 50px;">
            <i class="pi pi-search" />
	     <InputText class="p-inputtext-lg" type="text" v-model="name"/>
            <label for="clanname">クラン名で検索</label>
        </span>
    </transition>

    <transition-group name="clancard" tag="div" class="p-grid p-jc-center" @before-enter="onBeforeCardEnter" @enter="onCardEnter" appear>
        <div v-for="(overview, index) in filteredOverviews" :data-index="index" :key="overview.name" class="p-col-9 p-md-4 p-lg-3">
            <ClanCard :overview="overview"/>
        </div>
    </transition-group>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import ClanCard from "../components/ClanCard.vue"
import { onMounted, watchEffect } from '@vue/runtime-core'
import gsap from "gsap"
import firebase from "firebase"
export default {
    components: {ClanCard},
    setup() {
        const name = ref("")
        let filteredOverviews = ref([])

        const overviews = ref([])

        onMounted(()=>{
            const db = firebase.firestore();
            db.collection("clans").get().then((querySnapshot)=>{
                querySnapshot.forEach((doc)=>{
                    overviews.value.push(doc.data())
                })
            })
        })
            //db.collection("clans").add({
            //    name: "alpha",
            //    description: "doesn't exist",
            //    imageURL: "https://i.ytimg.com/vi/qqlteyFc76U/maxresdefault.jpg"
            //}).then((doc) => {
            //    console.log("added")
            //})

        watchEffect(()=>{
            if (name.value) {
                filteredOverviews.value = overviews.value.filter(overview => overview.name.toLowerCase().includes(name.value.toLowerCase()))
            } else {
                filteredOverviews.value = overviews.value
            }
        })

        const onBeforeCardEnter = (el) => {
            el.style.opacity = 0
            el.style.transform = "translateY(100px)"

        }

        const onCardEnter = (el, done) => {
            console.log(el.dataset.index)
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                onComplete: done,
                delay: el.dataset.index * 0.2
            })
        }

        return {
            name,
            overviews,
            filteredOverviews,
            onCardEnter,
            onBeforeCardEnter,
        }
    }
}
</script>

<style>
.search-enter-from,
.search-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.search-enter-active,
.search-leave-active {
    transition: all 0.5s ease;
    transition-delay: 0.1s;
}

.clancard-move {
    transition: all 0.2s ease;
}
</style>