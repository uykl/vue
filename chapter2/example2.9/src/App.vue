<template>
    <div>{{ name }}: {{ counter }} {{ obj.title }}</div>
    <div>{{ twiceTheCounter }}</div>
    <button @click="action">按钮</button>
</template>
<script>
export default {
    props: {
        name: String
    },
    data() {
        return {
            counter: 0,
            obj: { title: '这是个标题' }
        }
    },
    computed: {
        twiceTheCounter() {
            return this.counter * 2
        }
    },
    watch: {
        counter(newValue, oldValue) {
            console.log(newValue, oldValue);
            this.obj.title = '我改变了';
        }
    },
    methods: {
        action() {
            this.counter = this.counter + 3;
        }
    },
    mounted() {
        console.log('mounted')
    }
}
</script>