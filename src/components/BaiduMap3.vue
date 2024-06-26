<template>
    <div id="app">
        <div id="map_container"></div>
        <div class="RightBox4">
            <img src="../img/right3.png" class="img">
            <div class="boxTitle">险区识别</div>
            <div class="boxmain">
                <tr class="boxhang1">---------------------------------------</tr>
                <div class="boxpassage" style="height: 25%;">
                    <tr>待识别地区：</tr>
                    <img v-if="selectedWaterArea" :src="selectedWaterArea.imageUrl" alt="水域图片"
                        style="max-width: 100%; max-height: 70%;">
                </div>
                <tr class="boxhang">---------------------------------------</tr>
                <div class="boxpassage" style="height: 25%;">
                    <button @click="showRecognitionResult">识别</button>
                    <tr>识别结果：</tr>
                    <img v-if="showResultImage" src="/识别结果.png" alt="识别结果图片" style="max-width: 80%; max-height: 70%;">
                </div>
                <tr class="boxhang">---------------------------------------</tr>
                <div class="boxpassage" style="height: 30%; display: flex; align-items: center;">
                    <tr>水深：{{ waterDepth }}</tr>
                    <tr style="margin-left: 50px;">人数：{{ count }}</tr>
                    <!-- <tr>水深：55</tr> -->
                    <!-- <tr style="margin-left: 50px;">人数：2</tr>
                    <div v-if="waterDepth > 50" style="margin-left: 50px;"> -->
                    <button @click="navigateToSafetyZone">导航至避难所</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
/* global BMapGL, BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_ANCHOR_BOTTOM_LEFT*/
export default {
    data() {
        return {
            map: null,
            fireHydrantData: [
                { lng: 113.541215, lat: 34.821385, label: '水域1' },
                // { lng: 113.538144, lat: 34.826515, label: '水域2' },
            ],
            selectedWaterArea: null, // 存储点击的水域信息和图片链接
            showResultImage: false, // 控制是否显示识别结果图片
            waterDepth: null,// 存储水深信息
            count: null
        };
    },
    mounted() {
        this.initializeMap();
        this.addFireHydrantLayer();
        this.generateRandomCount();
    },
    methods: {
        initializeMap() {
            this.map = new BMapGL.Map("map_container");
            this.map.centerAndZoom(new BMapGL.Point(113.543000, 34.82100), 17);

            this.map.setMapStyleV2({
                styleId: '2cd2d0647854f1b38f743ca6f98ceacd',
            });
            this.map.enableScrollWheelZoom(true);
            //控件添加
            var navi3DCtrl = new BMapGL.NavigationControl3D({
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                // 控件基于停靠位置的偏移量（可选）
                offset: new BMapGL.Size(50, 100)
            });  // 添加3D控件
            this.map.addControl(navi3DCtrl);

            var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
            this.map.addControl(scaleCtrl);
            var zoomCtrl = new BMapGL.ZoomControl({
                anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                // 控件基于停靠位置的偏移量（可选）
                offset: new BMapGL.Size(20, 100)
            });  // 添加缩放控件
            this.map.addControl(zoomCtrl);
            // 创建定位控件
            var locationControl = new BMapGL.LocationControl({
                // 控件的停靠位置（可选，默认左上角）
                anchor: BMAP_ANCHOR_BOTTOM_LEFT,
                // 控件基于停靠位置的偏移量（可选）
                offset: new BMapGL.Size(10, 100)
            });
            // 将控件添加到地图上
            this.map.addControl(locationControl);
        },
        addFireHydrantLayer() {
            const icon = new BMapGL.Icon('/water.png', new BMapGL.Size(32, 32));

            this.fireHydrantData.forEach((location) => {
                const point = new BMapGL.Point(location.lng, location.lat);
                const marker = new BMapGL.Marker(point, { icon });
                marker.addEventListener('click', () => {
                    // 存储点击的水域信息和图片链接
                    this.selectedWaterArea = {
                        label: location.label,
                        imageUrl: '/待识别水域.jpg', // 替换为实际的图片链接
                        lng: location.lng,
                        lat: location.lat
                    };
                    // Create an info window and set its content to the label
                    const infoWindow = new BMapGL.InfoWindow(location.label);
                    // Open the info window at the marker's position
                    this.map.openInfoWindow(infoWindow, point);
                });
                this.map.addOverlay(marker);
            });
        },
        // Method to generate random water depth value (0-100)
        generateRandomWaterDepth() {
            return Math.floor(Math.random() * 50) + 51; // 生成51到100之间的随机数
        },
        generateRandomCount() {
            // 生成1到2之间的随机数
            return Math.floor(Math.random() * 2) + 1;
        },
        showRecognitionResult() {
            // Generate random water depth
            this.waterDepth = this.generateRandomWaterDepth();
            this.count = this.generateRandomCount();
            // Show recognition result image
            this.showResultImage = true;

            // Check if water depth is greater than 50
            if (this.waterDepth > 50) {
                // Create a red circle overlay
                const circle = new BMapGL.Circle(
                    new BMapGL.Point(this.selectedWaterArea.lng, this.selectedWaterArea.lat),
                    50, // Set the radius of the circle (adjust as needed)
                    {
                        strokeColor: "red", // Set stroke color to red
                        strokeWeight: 2, // Set stroke weight
                        strokeOpacity: 0.8, // Set stroke opacity
                        fillColor: "red", // Set fill color to red
                        fillOpacity: 0.4 // Set fill opacity
                    }
                );
                // Add the circle overlay to the map
                this.map.addOverlay(circle);
            }
        },
        navigateToSafetyZone() {
            // Navigate to safety zone (location: 113.54254, 34.827941)
            const driving = new BMapGL.DrivingRoute(this.map, {
                renderOptions: { map: this.map },
                onSearchComplete: () => {
                    const point = new BMapGL.Point(113.54254, 34.827941);
                    this.map.centerAndZoom(point, 17);
                }
            });
            const startPoint = new BMapGL.Point(this.selectedWaterArea.lng, this.selectedWaterArea.lat);
            const endPoint = new BMapGL.Point(113.543878, 34.827556);
            driving.search(startPoint, endPoint);
        }
    }
};
</script>
  
<style>
#app {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
}

#map_container {
    width: 100%;
    height: 100%;
    margin: 0;
}

.RightBox4 {
    position: absolute;
    height: 1000px;
    width: 27%;
    z-index: 10;
    top: 0;
    right: 0;
    pointer-events: auto;
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
