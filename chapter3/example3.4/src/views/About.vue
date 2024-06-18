<template>
  <h1>我是About</h1>
  <button @click="goHome">返回home</button>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>