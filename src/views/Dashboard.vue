<template>
<div>
<div style="min-height:800px;">
    <div class="p-grid p-jc-center">
        <div v-for="page in pages" :key="page.id" class="p-col-9 p-md-3 p-lg-3">
            <ClanCard :overview="page"/>
        </div>
    </div>
</div>
</div>

</template>

<script>
import { computed, ref } from '@vue/reactivity'
import ClanCard from "../components/ClanCard.vue"
import firebase from "firebase"
import { onMounted } from '@vue/runtime-core'
import {useStore} from "vuex"
import "../store/store"
export default {
    components: {ClanCard},
    setup() {
        const pageIDs = ref([])
        const pages = ref([])
        const store = useStore()
        
        const db = firebase.firestore()
        onMounted(()=> {
            if (localStorage.userID !== "" && !store.state.bDashboardLoaded) {
                db.collection("users").doc(localStorage.userID).get().then(snapshot=> {
                    pageIDs.value = snapshot.data().pages //fetch ids user has
                }).then(()=> {
                    pageIDs.value.forEach(id=> { //refers to the ids and fetches page infos
                        db.collection("clans").where("id", "==", id).get()
                        .then(querySnapshot=> { //all documents holding id as its "id" is in querySnapshot
                            querySnapshot.forEach(snapshot=> { //extract single snapshot and push them into array
                                pages.value.push(snapshot.data())
                            })
                        })
                    })
                }).then(()=>{
                    store.commit("setDashboardData", pages.value)
                })
            } else {
                pages.value = store.state.dashboardData
            }
            

        })
        return {
            pages,
        }
    },
}
</script>

<style>

</style>