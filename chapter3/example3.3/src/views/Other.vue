
<template>
    <button @click="goHome">返回Home</button>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        function goHome() {
            router.push({
                name: 'Home',
                query: {
                    ...route.query
                },
            })
        }
        return {
            goHome
        }
    }
}
</script>
  