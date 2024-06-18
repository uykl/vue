<template>
    <div>{{ name }}: {{ counter }} {{ obj.title }}</div>
    <div>{{ twiceTheCounter }}</div>
    <button @click="action">按钮</button>
</template>
<script>
import { ref, reactive, onMounted, watch, computed } from "vue";
export default {
    props: {
        name: String,
    },
    setup() {
        const counter = ref(0);
        const obj = reactive({ title: "这是个标题" });
        const twiceTheCounter = computed(() => counter.value * 2);
        watch(counter, (newValue, oldValue) => {
            console.log(newValue, oldValue);
        });
        onMounted(() => {
            console.log("mounted");
        });
        const action = () => {
            counter.value = counter.value + 3;
            obj.title = "我改变了";
        };
        // 暴露给 template
        return {
            counter,
            obj,
            twiceTheCounter,
            action
        };
    },
};
</script>