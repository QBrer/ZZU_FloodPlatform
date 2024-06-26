<template>
    <div class="nav_btn">
        <div class="btn_left">
            <a @click="goTo('/')">
                <div class="btn_list listActive">系统首页</div>
            </a>
            <a @click="goTo('/PeopleAnl')">
                <div class="btn_list">积水分析</div>
            </a>
            <a @click="goTo('./PowerData')">
                <div class="btn_list">险区识别</div>
            </a>
            <a @click="goTo('./FireSafe')">
                <div class="btn_list">紧急救援</div>
            </a>
        </div>
        <div class="btn_right">
        </div>
    </div>
</template>

<script>
export default {
  methods: {
  goTo(route) {
    if (this.$route.path !== route) {
      this.$router.push(route);
    }
  }
}
};
</script>  
  
<style>

</style>
  