<template>
  <h1>我是About头部</h1>
  <button @click="goHome">从头部返回Home</button>
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