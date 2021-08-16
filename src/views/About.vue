<template>
<div class="container">
  <h1>このサイトについて</h1>
  <div class="p-grid p-jc-center">
    <div class="p-col-8 p-lg-4">
      <h2>作者</h2>
      <Card style="width:100%;">
        <template #header>
            <img alt="user header" src="../assets/prf.jpg" style="width:100%;height:auto;object-fit:cover;">
        </template>
        <template #title>
          Utatane
        </template>
        <template #content>
          <p>このサイトの作者。一介の学生で、普段はC++で低レイヤプログラミングをしている。</p>
          <p>このサイトはメインページのヘッダー画像からフロントエンド、バックエンドのプログラムまで完全に一人で作ったため、フルスタックエンジニアと言っても過言。</p>
          
        </template>
        <template #footer>
          <a href="https://twitter.com/IIlIlIlIIllIlII" target="_blank" rel="noopner noreferrer"><Button icon="pi pi-twitter" class="p-button-rounded p-button-info p-button-outlined"/></a>
          <a href="https://github.com/s3pt3mb3r" target="_blank" rel="noopner noreferrer"><Button icon="pi pi-github" class="p-button-rounded p-button-secondary p-button-outlined" style="margin-left: .8em" /></a>
          <Button icon="pi pi-discord" class="p-button-rounded p-button-outlined" style="margin-left: .8em" @click="showDiscordId = true"/>
          <Dialog v-model:visible="showDiscordId" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '30vw'}">
            <template #header>
                <h3>DiscordのID</h3>
            </template>
            <p>uttu#6786</p>
            <template #footer>
                <Button label="OK" icon="pi pi-check" @click="showDiscordId=false" class="customButton" autofocus/>
            </template>
          </Dialog>
        </template>
      </Card>
    </div>
  <div class="p-col-8 p-lg-4">
    <h2>Cyber Hunter Clansとは</h2>
    <p>
      このサイトは、サイバーハンターのクランの情報を誰でも手軽に調べることが出来るように作られたサイトです。
      クランの情報は、各クランのマスター(場合によってはサブマスターとマネージャー含む)によって管理されています。
    </p>
    <h2>サイト上での権限が欲しい時は？</h2>
    <p>
      作者の自己紹介欄の下に連絡先が書いてあるので、お好きな欄から連絡ください。
    </p>
      
  </div>
  </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  setup() {
    let showDiscordId = ref(false)
    return {
      showDiscordId,
    }
  },
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

</style>