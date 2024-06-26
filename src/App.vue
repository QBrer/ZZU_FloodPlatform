<template>
  <div id="app">
    <div class="main">
        <div class="nav">郑州大学洪涝灾害预警平台</div>
        <NavButton />
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavButton from './components/NavButton.vue';

export default {
  components: {
    NavButton,
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
@import url('./css/reset.css');
</style>