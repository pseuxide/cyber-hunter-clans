<template>
<div>
<div class="p-grid p-jc-center" style="padding:0 10vw">
    <h1 class="p-col-12 p-sm-10 p-md-7">新しいクランページを作成する</h1>
</div>
<div class="container">
    <div class="p-grid p-jc-center">
        <div class="p-col-12 p-sm-10" style="margin-bottom:10px;">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-pencil"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="clanname" type="text" v-model="clanname" />
                    <label for="clanname">クランの名前</label>
                </span>
            </div>
        </div>
    </div>
    <div class="p-grid p-jc-center">
        <div class="p-col-12 p-sm-5">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user-edit"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="inputgroup" type="text" v-model="clanmaster" />
                    <label for="inputgroup">クランマスターの名前</label>
                </span>
            </div>
        </div>
        <div class="p-col-12 p-sm-5" style="margin-bottom:10px;">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user-edit"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="headerimage" type="text" v-model="headerimageurl" />
                    <label for="headerimage">ヘッダー画像URL</label>
                </span>
            </div>
        </div> 
    </div>
    <div class="p-grid p-jc-center">
        <Editor v-model="tempDesc" editorStyle="height: 500px" class="p-col-12 p-sm-10">
	        <template #toolbar>
		    <span class="ql-formats">
			    <button class="ql-header" value="1"></button>
			    <button class="ql-header" value="2"></button>
                <select class="ql-color"></select>
                <select class="ql-background"></select>
			    <button class="ql-link"></button>
			    <button class="ql-bold"></button>
			    <button class="ql-list" value="ordered"></button>
			    <button class="ql-list" value="bullet"></button>
		    </span>
	        </template>
        </Editor>
    </div>
    <div class="p-grid p-jc-center">
        <div class="p-col-12 p-sm-10" style="margin:15px 0 0 0;">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <span class="p-float-label">
                    <InputText id="members" type="text" v-model="clanmember" @keypress.enter="AddMember" />
                    <label for="members">クランメンバーのTwitterID</label>
                </span>
            </div>
            <transition name="switch" mode="out-in">
            <div v-if="members.length">
                <transition-group tag="ul" name="memberlist" appear>
                    <li v-for="member in members" :key="member" @click="DeleteMember(member)" class="memberlist">{{member}}</li>
                </transition-group>
            </div>
            <div v-else>メンバーがいません。</div>
            </transition>
        </div>
    </div>
</div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup() {
        const clanname = ref("")
        const clanmaster = ref("")
        const headerimageurl = ref("")

        const tempDesc = ref("")

        const clanmember = ref("")
        const members = ref([])
        const AddMember = () => {
            if (clanmember) {
                members.value.push(clanmember.value)
                clanmember.value = ""
            }
        }
        const DeleteMember = (member) => {
            members.value = members.value.filter((m) => m !== member)
        }
        return {
            clanname,
            clanmaster,
            headerimageurl,
            tempDesc,
            clanmember,
            members,
            AddMember,
            DeleteMember,
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
        padding: 40px 0;
    }
}

@media screen and (min-width: 768px) {
    .container {
        margin: 0px 15vw;
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
    background: crimson;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
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