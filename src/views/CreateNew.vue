<template>
<div>
<div class="p-grid p-jc-center" style="padding:0 10vw">
    <h1 class="p-col-12 p-sm-10 p-md-7 p-mb-0">新しいクランページを作成する</h1>
    <p class="p-col-12 p-sm-10 p-md-7 p-mt-0">各項目の説明はこちら</p>
</div>
<div class="container p-grid p-jc-center">
    <div class="p-col-12 p-lg-9">
        <div class="p-grid p-jc-center">
        <div class="p-col-12 p-sm-12" style="margin-bottom:20px;">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-pencil"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="clanname" type="text" v-model="clanname" v-bind:class="{'p-invalid': bClanname}"/>
                    <label for="clanname">クランの名前</label>
                </span>
            </div>
        </div>
        </div>
        <div class="p-grid p-jc-center">
            <div class="p-col-12 p-sm-12" style="margin-bottom:10px;">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user-edit"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText id="inputgroup" type="text" v-model="clanmaster" v-bind:class="{'p-invalid': bClanmaster}"/>
                        <label for="inputgroup">クランマスターの名前</label>
                    </span>
                </div>
            </div>
            <div class="p-col-12 p-sm-6" style="margin-bottom:20px;">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-image"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText id="headerimage" type="text" v-model="headerimageurl" v-bind:class="{'p-invalid': bHeaderimageurl}" v-tooltip="'.pngもしくは.jpgを忘れずに付けてください'"/>
                        <label for="headerimage">ヘッダー画像URL</label>
                    </span>
                </div>
            </div> 
            <div class="p-col-12 p-sm-6" style="margin-bottom:20px;">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-image"></i>
                    </span>
                    <span class="p-float-label">
                        <InputText id="eyecatchimage" type="text" v-model="eyecatchimageurl" v-bind:class="{'p-invalid': bEyecatchimageurl}" v-tooltip="'.pngもしくは.jpgを忘れずに付けてください'"/>
                        <label for="eyecatchimage">アイキャッチ画像URL</label>
                    </span>
                </div>
            </div>  
        </div>
        <div class="p-grid p-jc-center">
            <Editor v-model="description" editorStyle="height: 500px" class="p-col-12 p-sm-12" placeholder="本文">
	         <template #toolbar>
		      <span class="ql-formats">
			       <button class="ql-header" value="1"></button>
			       <button class="ql-header" value="2"></button>
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
			       <button class="ql-link"></button>
			       <button class="ql-bold"></button>
                   <button class="ql-image"></button>
			       <button class="ql-list" value="ordered"></button>
			       <button class="ql-list" value="bullet"></button>
		      </span>
	         </template>
            </Editor>
        </div>
    </div>
    <div class="p-col-12 p-lg-3">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-users"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="whitelist" type="text" v-model="clanwhitelist" @keypress.enter="AddWhitelists" v-tooltip="'このクランの情報を変更できる人たち'"/>
                    <label for="whitelist">権限保持者のuid</label>
                </span>
            </div>
            <transition name="switch" mode="out-in">
            <div v-if="whitelists.length">
                <transition-group tag="ul" name="memberlist" appear>
                    <li v-for="whitelist in whitelists" :key="whitelist" @click="DeleteWhitelists(whitelist)">
                            <div class="p-col-10">{{whitelist}}</div>
                    </li>
                </transition-group>
            </div>
            <div v-else style="margin:20px 0 40px 0;">メンバーがいません。</div>
            </transition>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-twitter"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="members" type="text" v-model="clanmember" @keypress.enter="AddMember" v-tooltip="'このクランのメンバー'"/>
                    <label for="members">クランメンバーのTwitterID</label>
                </span>
            </div>
            <transition name="switch" mode="out-in">
            <div v-if="members.length">
                <transition-group tag="ul" name="memberlist" appear>
                    <li v-for="member in members" :key="member" @click="DeleteMember(member)">
                            <div class="p-col-10"><i class="pi pi-user"></i>{{member}}</div>
                    </li>
                </transition-group>
            </div>
            <div v-else style="margin-top:20px;">メンバーがいません。</div>
            </transition>
    </div>
    <Button class="p-col-4 customButton" label="投稿する" @click="PostClanPage"/>
</div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import firebase from "firebase"
import {v4 as uuidv4} from "uuid"
export default {
    setup() {
        const clanname = ref("")
        const bClanname = ref(false)

        const clanmaster = ref("")
        const bClanmaster = ref(false)

        const headerimageurl = ref("")
        const bHeaderimageurl = ref(false)

        const eyecatchimageurl = ref("")
        const bEyecatchimageurl = ref(false)

        const description = ref("")

        const clanmember = ref("")
        const members = ref([])


        const AddMember = () => {
            if (clanmember.value && !members.value.includes(clanmember.value)) {
                members.value.push(clanmember.value)
                clanmember.value = ""
            }
        }
        const DeleteMember = (member) => {
            members.value = members.value.filter((m) => m !== member)
        }

        const clanwhitelist = ref("")
        const whitelists = ref([])
        const AddWhitelists = () => {
            if (whitelist.value && !whitelists.value.includes(whitelist.value) && clanwhitelist.value !== localStorage.userID) {
                whitelists.value.push(whitelist.value)
                whitelist.value = ""
            }
        }

        const DeleteWhitelists = (whitelist) => {
            whitelists.value = whitelists.value.filter((wm) => wm !== whitelist)
        }

        const PostClanPage = () => {
            //empty check
            bClanname.value = clanname.value ? false : true
            bClanmaster.value = clanmaster.value ? false : true
            bHeaderimageurl.value = headerimageurl.value ? false : true
            bEyecatchimageurl.value = eyecatchimageurl.value ? false : true
            if (!bClanname.value && !bClanmaster.value && !bHeaderimageurl.value && !bEyecatchimageurl.value) {
                const idadvanced = uuidv4()
                const db = firebase.firestore()
                whitelists.value.forEach((whitelist)=> { //add this page's id to indivisual user document
                    const usersRef = db.collection("users").doc(whitelist)
                    usersRef.get().then(snapshot=> {
                        if (snapshot.exists === true) {
                            usersRef.update({
                                pages: firebase.firestore.FieldValue.arrayUnion(idadvanced)
                            })
                        }
                    })
                })
                if (!whitelists.value.includes("4SXiWV7jELRXbBIZ0ycVsHSTneh1")) {
                    db.collection("users").doc("4SXiWV7jELRXbBIZ0ycVsHSTneh1").update({
                        pages: firebase.firestore.FieldValue.arrayUnion(idadvanced)
                    })
                }
                db.collection("clans").add({
                    name: clanname.value,
                    id: idadvanced,
                    owner: localStorage.userID,
                    mastername: clanmaster.value,
                    members: members.value,
                    whitelists: whitelists.value,
                    description: description.value,
                    headerimageURL: headerimageurl.value,
                    eyecatchimageURL: eyecatchimageurl.value,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then((doc) => {
                    console.log("added")
                })
            }
        }

        return {
            clanname,
            bClanname,
            clanmaster,
            bClanmaster,
            headerimageurl,
            bHeaderimageurl,
            eyecatchimageurl,
            bEyecatchimageurl,
            description,
            clanmember,
            members,
            AddMember,
            DeleteMember,
            clanwhitelist,
            whitelists,
            AddWhitelists,
            DeleteWhitelists,
            PostClanPage,
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 0 10vw;
    border-radius: 4px;
    padding: 40px 5vw;
    background: #1f2d40;
}

@media screen and (min-width: 576px) {
    .container {
        padding: 40px 3vw;
    }
}

@media screen and (min-width: 768px) {
    .container {
        margin: 0px 9vw;
    }
}

ul {
    position: relative;
    padding: 0;
}
li {
    list-style-type: none;
    display: block;
    margin-bottom: 10px;
    padding: 10px;
    background: #00acee;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    div {
        width: 100%;
        position: relative;
        .pi-user {
            position: absolute;
            left: 20px;
        }
    }
}
li:hover {
    cursor: pointer;
}

.memberlist-enter-from {
   opacity: 0;
   transform: scale(0.6);
 }
 .memberlist-enter-active {
   transition: all 0.4s ease;
 }
 .memberlist-leave-to {
   opacity: 0;
   transform: scale(0.6);
 }
 .memberlist-leave-active {
   transition: all 0.4s ease;
   position: absolute;
 }
 /** move */
 .memberlist-move {
   transition: all 0.3s ease;
 }

 .switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.switch-enter-active,
.switch-leave-active
{
  transition: all 0.5s ease;
}
</style>