<template>
<div>
    <p v-for="page in pages" :key="page.id">
        {{page}}
    </p>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import ClanCard from "../components/ClanCard.vue"
import firebase from "firebase"
export default {
    components: {ClanCard},
    setup() {
        const pageIDs = ref([])
        const pages = ref([])
        const db = firebase.firestore()
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
        })
        return {
            pages,
        }
    },
}
</script>

<style>

</style>