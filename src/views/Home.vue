<template>
<div>
  <MainHeader/>
  <Carousels/>
</div>
</template>

<script>
import Carousels from "../components/Carousels.vue"
import MainHeader from "../components/MainHeader.vue"
export default {
  components: {Carousels, MainHeader},
  setup() {
  },
}
</script>