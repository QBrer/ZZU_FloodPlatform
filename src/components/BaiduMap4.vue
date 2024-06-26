<template>
  <div>
    <div id="map4"></div>
    <div class="RightBox4">
      <img src="../img/right3.png" class="img">
      <div class="boxTitle">缓冲区分析</div>
      <div class="boxmain">
        <!--图表-->
        <label for="duration" class="boxpassage" style="left: 0%;">缓冲区半径</label>
        <input type="range" id="duration" v-model="animationDuration" min="100" max="5000" step="100" />
        <span class="boxpassage" style="left: 0%;">{{ animationDuration * 0.2 }} m</span>
        <button @click="removeAllCircles">删除所有覆盖物</button><br>
        <div class="boxpassage" style="left: 0%;">
          <p>可参与救援的人员有：</p>
          <ul>
            <li v-for="hydrant in availableHydrants" :key="hydrant.label">{{ hydrant.label }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
/* global BMapGL,BMAP_ANCHOR_TOP_LEFT*/
export default {
  data() {
    return {
      animationDuration: 1000,
      map: null,
      lastCustomOverlay: null,
      expandingCircles: [],
      coordinates: [
        { lng: 113.541194, lat: 34.823448, label: '保安1' },
        { lng: 113.54131, lat: 34.822534, label: '保安2' },
        { lng: 113.543709, lat: 34.822419, label: '保安3' },
        { lng: 113.544432, lat: 34.822396, label: '保安4' },
        // { lng: 113.545515, lat: 34.822341, label: '保安5' },
        { lng: 113.546664, lat: 34.822296, label: '谢婷 15088869958' },
        { lng: 113.547599, lat: 34.821537, label: '王军 18037869954' },
        // { lng: 113.547504, lat: 34.820593, label: '保安8' },
        { lng: 113.547491, lat: 34.819485, label: '张伟 15037378654' },
        // { lng: 113.546714, lat: 34.819285, label: '保安10' },
        { lng: 113.545649, lat: 34.81934, label: '王安 15337869954' },
        // { lng: 113.544702, lat: 34.819392, label: '保安12' },
        // { lng: 113.544068, lat: 34.820833, label: '保安13' },
        // { lng: 113.542501, lat: 34.819537, label: '保安14' },
        { lng: 113.541423, lat: 34.819533, label: '保安15' }
      ],
      availableHydrants: [],
    };
  },
  watch: {
    animationDuration(newDuration) {
      this.expandingCircles.forEach((circle) => {
        this.updateCircleDuration(circle, newDuration);
      });
    },
  },
  mounted() {
    this.map = new BMapGL.Map('map4');
    this.map.centerAndZoom(new BMapGL.Point(113.543663, 34.821000), 18);
    this.map.enableScrollWheelZoom(true);
    this.map.setTilt(45);
    this.navigation = new BMapGL.NavigationControl({
      enableGeolocation: true,
      enableAutoLocation: true,
    });
    this.map.addControl(this.navigation);
    this.map.setMapStyleV2({
      styleId: '2cd2d0647854f1b38f743ca6f98ceacd',
    });
    // 添加3D导航控件
    var navi3DCtrl = new BMapGL.NavigationControl3D({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      offset: new BMapGL.Size(100, 10)
    });
    this.map.addControl(navi3DCtrl);
    for (const coordinate of this.coordinates) {
      const point = new BMapGL.Point(coordinate.lng, coordinate.lat);
      const marker = new BMapGL.Marker(point);
      marker.addEventListener('click', function (label) {
        return function () {
          alert(label);
        };
      }(coordinate.label));

      const myIcon = new BMapGL.Icon('/保卫处.png', new BMapGL.Size(32, 32));
      marker.setIcon(myIcon);

      this.map.addOverlay(marker);
    }

    const menu = new BMapGL.ContextMenu();
    const addCustomOverlayItem = new BMapGL.MenuItem('上传溺水地点', (e) => {
      const point = new BMapGL.Point(e.lng, e.lat);
      const myIcon = new BMapGL.Icon('/落水报警.png', new BMapGL.Size(32, 32));
      const marker = new BMapGL.Marker(point, { icon: myIcon });
      this.map.addOverlay(marker);
      this.addExpandingCircle(point);
    });
    menu.addItem(addCustomOverlayItem);
    this.map.addContextMenu(menu);
  },
  methods: {
    removeAllCircles() {
      this.expandingCircles.forEach((circleInterval) => {
        clearInterval(circleInterval);
      });
      this.expandingCircles = [];

      // 保存消防栓图层
      const hydrantOverlays = [];
      const overlays = this.map.getOverlays();
      for (const overlay of overlays) {
        if (overlay instanceof BMapGL.Marker && overlay.getIcon() && overlay.getIcon().imageUrl === '/保卫处.png') {
          hydrantOverlays.push(overlay);
        }
      }

      // 删除地图上的所有覆盖物（包括火灾地点和扩散圆图层）
      this.map.clearOverlays();

      // 重新添加消防栓图层
      for (const hydrantOverlay of hydrantOverlays) {
        this.map.addOverlay(hydrantOverlay);
      }
    },
    addExpandingCircle(centerPoint) {
      const duration = this.animationDuration;
      const steps = 10;
      let currentStep = 0;

      function animateCircle() {
        if (currentStep >= steps) {
          currentStep = 0;
        }

        const radius = currentStep * (duration / (steps * 10));

        const circle = new BMapGL.Circle(centerPoint, radius, {
          strokeColor: 'red',
          strokeWeight: 2,
          strokeOpacity: 0.8,
          fillColor: 'red',
          fillOpacity: 0.3,
        });

        this.map.addOverlay(circle);

        this.checkFireHydrantsDistance(circle, centerPoint, radius);

        setTimeout(() => {
          this.map.removeOverlay(circle);
        }, duration);

        currentStep++;
      }

      const animationInterval = setInterval(animateCircle.bind(this), duration / steps);
      this.expandingCircles.push(animationInterval);

      const totalIterations = 50;
      setTimeout(() => {
        clearInterval(animationInterval);
        this.expandingCircles = [];
      }, totalIterations * duration);
    },
    updateCircleDuration(circle, newDuration) {
      clearInterval(circle);
      circle = setInterval(() => {
        this.animateCircle(circle);
      }, newDuration / 10);
    },
    animateCircle(circle) {
      const duration = this.animationDuration;
      const steps = 10;
      let currentStep = 0;

      function updateCircle() {
        if (currentStep >= steps) {
          currentStep = 0;
        }

        const radius = currentStep * (duration / (steps * 10));

        circle.setRadius(radius);

        currentStep++;
      }

      updateCircle();

      const animationInterval = setInterval(updateCircle, duration / steps);

      setTimeout(() => {
        clearInterval(animationInterval);
      }, steps * duration);
    },
    startNavigation(startPoint, endPoint) {
      const driving = new BMapGL.DrivingRoute(this.map, {
        renderOptions: { map: this.map, autoViewport: true },
      });

      driving.search(startPoint, endPoint);
    },
    checkFireHydrantsDistance(circle, centerPoint, radius) {
      const fireIcon = new BMapGL.Icon('/保卫处.png', new BMapGL.Size(32, 32));
      const hydrantsWithinRadius = [];

      for (const coordinate of this.coordinates) {
        const hydrantPoint = new BMapGL.Point(coordinate.lng, coordinate.lat);
        const distance = this.map.getDistance(centerPoint, hydrantPoint);

        if (distance < radius) {
          hydrantsWithinRadius.push(coordinate);
          const marker = new BMapGL.Marker(hydrantPoint, { icon: fireIcon });
          const label = new BMapGL.Label(coordinate.label, { offset: new BMapGL.Size(20, -10) });
          marker.setLabel(label);
          // 添加点击事件，触发路径规划
          marker.addEventListener('click', () => {
            this.startNavigation(centerPoint, hydrantPoint);
          });

          this.map.addOverlay(marker);
          this.map.addOverlay(marker);
        }
      }

      this.availableHydrants = hydrantsWithinRadius;
    },
  },
};
</script>


<style>
#map4 {
  overflow: hidden;
  width: 100%;
  height: 800px;
  margin: 0;
  font-family: '微软雅黑';
}

.RightBox4 {
  position: absolute;
  height: 80%;
  width: 27%;
  z-index: 10;
  top: 0;
  right: 0;
  pointer-events: auto;
}
</style>
