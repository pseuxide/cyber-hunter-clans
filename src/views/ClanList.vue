<template>
<div style="padding: 0 40px;min-height:800px;">
    <transition name="search" appear>
        <span class="p-float-label p-input-icon-left" style="margin-bottom: 50px;">
            <i class="pi pi-search" />
	     <InputText class="p-inputtext-lg" type="text" v-model="name"/>
            <label for="clanname">クラン名で検索</label>
        </span>
    </transition>

    <transition-group name="clancard" tag="div" class="p-grid p-jc-center" @before-enter="onBeforeCardEnter" @enter="onCardEnter" appear>
        <div v-for="(overview, index) in filteredOverviews" :data-index="index" :key="overview.id" class="p-col-9 p-md-4 p-lg-3">
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
import {useStore} from "vuex"
export default {
    components: {ClanCard},
    setup() {
        const store = useStore()
        const name = ref("")
        let filteredOverviews = ref([])

        const overviews = ref([])

        onMounted(()=>{
            if (!store.state.bClanlistLoaded) {
                console.log("full load")
                const db = firebase.firestore();
                db.collection("clans").get().then((querySnapshot)=>{
                    querySnapshot.forEach((doc)=>{
                        overviews.value.push(doc.data())
                    })
                }).then(()=> {
                    store.commit("setClanlistData", overviews.value)
                })
            } else {
                console.log("partial load")
                overviews.value = store.state.clanlistData
            }
        })

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
            gsap.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                onComplete: done,
                delay: el.dataset.index * 0.06
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