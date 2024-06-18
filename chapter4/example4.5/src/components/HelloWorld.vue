<template>
  <div class="hello">
    <p>count:{{ $store.state.count }}</p>
    <p>countGlobal:{{ $store.getters.countGlobal }}</p>
    <p><button @click="$store.commit('increase')">increase</button></p>
    <p><button @click="$store.commit('multiply', { count: 10 })">multiply</button></p>
    <p>countA:{{ $store.state.a.countA }}</p>
    <p>countAA:{{ $store.getters.countAA }}</p>
    <p><button @click="$store.commit('increaseA')">increaseA</button></p>
    <p><button @click="$store.dispatch('asyncIncreaseA')">asyncIncreaseA</button></p>
    <p>countB:{{ $store.state.b.countB }}</p>
    <p>countBB:{{ $store.getters['b/countBB'] }}</p>
    <p><button @click="$store.commit('b/increaseB')">increaseB</button></p>
    <p><button @click="$store.dispatch('b/asyncIncreaseB')">asyncIncreaseB</button></p>
    <p><button @click="$store.dispatch('b/asyncMultiplyB', { count: 3 })">asyncMultiplyB</button></p>
    ======maps======
    <p>count: {{ count }}</p>
    <p>countGlobal: {{ countGlobal }}</p>
    <p><button @click="multiply({ count: 5 })">multiply</button></p>
    <p>countA: {{ countA }}</p>
    <p>countAA: {{ countAA }}</p>
    <p><button @click="increaseA">increaseA</button></p>
    <p><button @click="asyncIncreaseA">asyncIncreaseA</button></p>
    <p>countB: {{ countB }}</p>
    <p>countBB: {{ countBB }}</p>
    <!-- <p>countBM: {{countBM}}</p> -->
    <p><button @click="increaseB">increaseB</button></p>
    <p><button @click="asyncIncreaseB">asyncIncreaseB</button></p>
    <p><button @click="asyncMultiplyB({ count: 4 })">asyncMultiplyB</button></p>
    <!-- ========扩展============== -->
    <!-- <p>countBAA: {{countBAA}}</p>
    <p><button @click="increaseBAA(20)">increaseBAA</button></p>
    <p><button @click="asyncIncreaseBAA(6,7)">asyncIncreaseBAA</button></p> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    // 映射全局State和moduleA的State
    ...mapState({
      count: 'count',
      // 映射moduleA的State
      countA: state => state.a.countA,
      // 映射moduleB的State
      countB1: state => state.b.countB
    }),
    // 映射moduleB的State
    ...mapState('b', {
      countB: 'countB'
    }),
    // 映射全局Getters和moduleA的Getters
    ...mapGetters({
      countGlobal: 'countGlobal'
    }),
    // 映射moduleB的Getters
    ...mapGetters('b', {
      countBB: 'countBB'
    })
  },
  methods: {
    // 映射全局Mutations和moduleA的Mutations
    ...mapMutations({
      increase: 'increase',
      increaseA: 'increaseA'
    }),
    // 映射和moduleB的Mutations
    ...mapMutations('b', {
      increaseB: 'increaseB'
    }),
    // 映射全局Actions和moduleA的Actions
    ...mapActions({
      asyncIncrease: 'asyncIncrease',
      asyncIncreaseA: 'asyncIncreaseA',
      asyncMultiply: 'asyncMultiply'
    }),
    // 映射和moduleB的Actions
    ...mapActions('b', {
      asyncIncreaseB: 'asyncIncreaseB',
      asyncMultiplyB: 'asyncMultiplyB'
    })
  },
  // computed: {
  //   ...mapState({
  //     // 映射全局State
  //     count: 'count',// 或写成count：state => state.count
  //     // 映射moduleA的State
  //     countA: state => state.a.countA,
  //     // 映射moduleB的State
  //     countBAA: (state, getters) => state.b.countB +  getters.countAA,
  //   }),
  //   ...mapState('b', {
  //     countB: 'countB',
  //     countBM: (state, getters) => state.countB + getters.countBB
  //   }),
  //   ...mapGetters({
  //     countGlobal: 'countGlobal',
  //     countAA: 'countAA'
  //   }),
  //   ...mapGetters('b', {
  //     countBB: 'countBB'
  //   }),
  //   // // 映射全局State和moduleA的State
  //   // ...mapState(['count', 'countA']),
  //   // // 映射moduleB的State
  //   // ...mapState('b', ['countB']),
  //   // // 映射全局Getters和moduleA的Getters
  //   // ...mapGetters(['countGlobal', 'countAA']),
  //   // // 映射moduleB的Getters
  //   // ...mapGetters('b', ['countBB'])
  // },
  // methods: {
  //   ...mapMutations({
  //     increaseBAA: (commit, count) => commit('multiply', count)
  //   }),
  //   ...mapActions('b', {
  //     asyncIncreaseBAA: (dispatch, a, b) => dispatch('asyncMultiplyB', {count: b, a})
  //   }),
  //   // 映射全局getters和moduleA的Mutations
  //   ...mapMutations({
  //     increase: 'increase',
  //     multiply: 'multiply', 
  //     increaseA:'increaseA'
  //   }),
  //   // ...mapMutations(['increase', 'multiply', 'increaseA']),
  //   // 映射moduleB的Mutations
  //   ...mapMutations('b', ['increaseB']),
  //   // 映射全局getters和moduleA的Actions
  //   ...mapActions(['asyncIncrease', 'asyncMultiply', 'asyncIncreaseA']),
  //   // 映射moduleB的Actions
  //   ...mapActions('b', ['asyncIncreaseB', 'asyncMultiplyB'])
  // }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
