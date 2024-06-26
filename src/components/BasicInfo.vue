<template>
    <div id="app">
        <div class="main">
            <div class="content">
                <BaiduMap />
                <!-- <LeftBox /> -->
                <!-- <RightBox1 /> -->
            </div>
        </div>
    </div>
</template>
  
<script>
import BaiduMap from './BaiduMap.vue';
// import LeftBox from './LeftBox'
// import RightBox1 from './RightBox1';
export default {
    components: {
        BaiduMap,
        // LeftBox,
        // RightBox1
    },
    mounted() {
    },
    methods: {
    }
}
</script>
  
<style></style>