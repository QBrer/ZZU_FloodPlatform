<template>
  <div id="app">
    <div id="l-map"></div>
    <div class="LeftBox">
      <img src="../img/left.png" class="img">
      <!-- 四个角描边 end -->
      <div class="boxTitle">详细信息</div>
      <div class="boxmain">
        <!--图表-->
        <tr class="boxhang1">---------------------------------------</tr>
        <div class="boxpassage" style="height: 5%;">
          <tr>建筑物名称：{{ buildingInfo.name }}</tr>
        </div>
        <tr class="boxhang">---------------------------------------</tr>
        <div class="boxpassage" style="height: 15%; width: 90%;">
          <tr>相关信息：{{ buildingInfo.relatedInfo }}</tr>
        </div>
        <tr class="boxhang">---------------------------------------</tr>
        <div class="boxpassage">
          <tr>图片：<img :src="buildingInfo.image" alt="Building Image" /></tr>
        </div>
      </div>
    </div>
    <div class="RightBox">
      <img src="../img/right3.png" class="img">
      <div class="boxTitle">路径规划</div>
      <div class="boxmain">
        <div class="navigate">
          <input v-model="startLocation" placeholder="起点" />
          <input v-model="endLocation" placeholder="终点" />
          <button @click="navigate">导航</button>
        </div>
        <!--导航路线-->
        <div id="r-result"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* global BMapGL, BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_ANCHOR_BOTTOM_LEFT */
export default {
  data() {
    return {
      startLocation: '',
      endLocation: '',
      buildingInfo: {
        name: '',
        relatedInfo: '',
        image: '',
      },
    };
  },
  methods: {
    navigate() {
      const map = new BMapGL.Map("l-map");
      map.centerAndZoom(new BMapGL.Point(113.543663, 34.823332), 18);
      map.enableScrollWheelZoom(true);
      map.setMapStyleV2({
        styleId: '2cd2d0647854f1b38f743ca6f98ceacd'
      });

      var heyi = new BMapGL.Polygon([
        new BMapGL.Point(113.537071, 34.820541),
        new BMapGL.Point(113.536658, 34.820556),
        new BMapGL.Point(113.53664, 34.82007),
        new BMapGL.Point(113.537062, 34.820063),
      ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0, fillOpacity: 0.1 });  //创建多边形
      map.addOverlay(heyi);
      heyi.addEventListener('click', () => {
        this.buildingInfo = {
          name: '荷一餐厅',
          relatedInfo: '荷园一号餐厅',
          image: '/heyi.png',
        };
      });

      var heer = new BMapGL.Polygon([
        new BMapGL.Point(113.537202, 34.821763),
        new BMapGL.Point(113.536802, 34.821752),
        new BMapGL.Point(113.536779, 34.821152),
        new BMapGL.Point(113.537184, 34.821174)
      ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0, fillOpacity: 0.1 });  //创建多边形
      map.addOverlay(heer);
      heer.addEventListener('click', () => {
        this.buildingInfo = {
          name: '荷二餐厅',
          relatedInfo: '荷园二号餐厅',
          image: '/heer.jpg',
        };
      });

      var tushuguan = new BMapGL.Polygon([
        new BMapGL.Point(113.545744, 34.823719),
        new BMapGL.Point(113.544779, 34.823745),
        new BMapGL.Point(113.544756, 34.822867),
        new BMapGL.Point(113.545749, 34.822856)
      ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0, fillOpacity: 0.1 });  //创建多边形
      map.addOverlay(tushuguan);
      tushuguan.addEventListener('click', () => {
        this.buildingInfo = {
          name: '图书馆',
          relatedInfo: '图书馆是郑州大学的标志性建筑之一，建筑面积3.8万平方米。',
          image: '/tushuguan.png',
        };
      });

      var zhonglou = new BMapGL.Polygon([
        new BMapGL.Point(113.543647, 34.823423),
        new BMapGL.Point(113.543624, 34.823208),
        new BMapGL.Point(113.543853, 34.823197),
        new BMapGL.Point(113.543871, 34.823412)
      ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0, fillOpacity: 0.1 });  //创建多边形
      map.addOverlay(zhonglou);
      zhonglou.addEventListener('click', () => {
        this.buildingInfo = {
          name: '钟楼',
          relatedInfo: '钟楼有着郑大的“第一高度”，56米的钟楼象征56个民族，寓意来自五湖四海郑大人的团结和凝聚。',
          image: '/zhonglou.png',
        };
      });

      var benyuan = new BMapGL.Polygon([
        new BMapGL.Point(113.538903, 34.824693),
        new BMapGL.Point(113.53769, 34.823626),
        new BMapGL.Point(113.53884, 34.822434),
        new BMapGL.Point(113.539945, 34.823478)
      ], { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0, fillOpacity: 0.1 });  //创建多边形
      map.addOverlay(benyuan);
      benyuan.addEventListener('click', () => {
        this.buildingInfo = {
          name: '本源体育场',
          relatedInfo: '郑州大学主校区中心体育场，是一个以教学为主，兼做训练比赛的综合性乙级体育建筑。',
          image: '/benyuan.png',
        };
      });

      //控件添加
      var navi3DCtrl = new BMapGL.NavigationControl3D({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(50, 100)
      });  // 添加3D控件
      map.addControl(navi3DCtrl);

      var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
      map.addControl(scaleCtrl);
      var zoomCtrl = new BMapGL.ZoomControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(20, 100)
      });  // 添加缩放控件
      map.addControl(zoomCtrl);
      // 创建定位控件
      var locationControl = new BMapGL.LocationControl({
        // 控件的停靠位置（可选，默认左上角）
        anchor: BMAP_ANCHOR_BOTTOM_LEFT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(10, 100)
      });
      // 将控件添加到地图上
      map.addControl(locationControl);
      //路径规划
      const walking = new BMapGL.WalkingRoute(map, {
        renderOptions: { map: map, panel: "r-result", autoViewport: true },
      });

      walking.search(this.startLocation, this.endLocation);
    },
  },
  mounted() {
    this.navigate(); // Automatically navigate when the component is mounted
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  font-family: "微软雅黑";
}

#l-map {
  height: 750px;
  width: 100%;
  display: inline-block;
  z-index: 1;
  margin: 0;
  /* Ensure the map is below other elements */
}

#r-result,
#r-result table {
  width: 90%;
  height: 100%;
  overflow-y: auto;
  /* Add this property to enable vertical scrollbar if content exceeds the height */
}

/* 始终处于右上角 */
.RightBox {
  position: absolute;
  height: 80%;
  width: 27%;
  z-index: 2;
  top: 0;
  right: 0;
}

.img {
  position: relative;
  height: 100%;
  width: 100%;
}

.boxTitle {
  position: absolute;
  z-index: 3;
  left: 40%;
  top: 2%;
}

.boxmain {
  position: absolute;
  z-index: 3;
  top: 15%;
  height: 80%;
  width: 90%;
  /* Set width to 100% to match the width of RightBox */
  display: flex;
  flex-direction: column;
  /* Ensure a vertical layout */
  padding: 10px;
  overflow: hidden;
  /* Add this property to hide content that exceeds the height */
}

.navigate {
  background-color: #ffffff;
  color: rgba(27, 142, 236, 1);
  font-size: 14px;
  border: 1px solid rgba(27, 142, 236, 1);
  width: 90%
}

/* 始终处于左上角 */
.LeftBox {
  position: absolute;
  height: 600px;
  width: 25%;
  z-index: 2;
  top: 0;
  left: 0;
}

.img {
  position: relative;
  height: 100%;
  width: 100%;
}

.boxTitle {
  position: absolute;
  z-index: 3;
  left: 40%;
  top: 3%;
  font-size: 20px;
}

.boxmain {
  position: absolute;
  z-index: 3;
  top: 15%;
  height: 70%;
  width: 100%;
}

.boxpassage {
  position: relative;
  /* float         : left; */
  left: 8%;
  margin-bottom: 20px;
  width: 100%;
  height: 1.6vw;
  text-align: center;
  line-height: 1.6vw;
  font-size: .9vw;
  color: #0efcff;
  letter-spacing: .1vw;
}

.boxhang {
  position: relative;
  float: left;
  /* left: 3%; */
  margin-bottom: 20px;
  width: 100%;
  height: 1.6vw;
  text-align: center;
  line-height: 1.6vw;
  font-size: .9vw;
  color: #0efcff;
  letter-spacing: .1vw;
}

.boxhang1 {
  position: relative;
  float: left;
  /* left: 3%; */
  margin-bottom: 10px;
  width: 100%;
  height: 1.6vw;
  text-align: center;
  line-height: 1.6vw;
  font-size: .9vw;
  color: #0efcff;
  letter-spacing: .1vw;
}
</style>