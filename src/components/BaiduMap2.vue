<template>
    <div id="app">
        <div id="map_container"></div>
        <div class="RightBox4">
            <img src="../img/right3.png" class="img">
            <div class="boxTitle">积水分析</div>
            <div class="boxmain">
                <!--图表-->
                <br>
                <tr class="boxhang1">-----------------热力图----------------------</tr>
                <!-- 热力图 -->
                <button @click="loadHeatmap1" style="width:90%;">场景1</button>
                <button @click="loadHeatmap2" style="width:90%;">场景2</button>
                <br>
                <tr class="boxhang1">-----------------热力网格----------------------</tr>
                <!-- 热力柱网格 -->
                <button @click="loadHeatGrid3" style="width:90%;">场景1</button>
                <button @click="loadHeatGrid4" style="width:90%;">场景2</button>
            </div>
        </div>
    </div>
</template>
  
<script>
/* global BMapGL, BMAP_ANCHOR_BOTTOM_RIGHT, BMAP_ANCHOR_BOTTOM_LEFT, mapvgl*/
import axios from 'axios';

export default {
    data() {
        return {
            map: null,
            grid: new mapvgl.HeatGridLayer(),
            heatmap: new mapvgl.HeatmapLayer(),
            getGridDataRange: {},
        };
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            this.map = new BMapGL.Map("map_container");
            this.map.centerAndZoom(new BMapGL.Point(113.543000, 34.82100), 17);


            this.map.setMapStyleV2({
                styleId: '2cd2d0647854f1b38f743ca6f98ceacd'
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

            const view = new mapvgl.View({
                map: this.map,
            });

            this.grid = new mapvgl.HeatGridLayer({
                max: 300,
                min: 10,
                gridSize: 50,
                gradient: {
                    0: 'rgb(50, 50, 256)',
                    0.3: 'rgb(178, 202, 256)',
                    1: 'rgb(250, 250, 256)'
                },
                riseTime: 1800,
                maxHeight: 300,
                minHeight: 50
            });
            view.addLayer(this.grid);

            this.heatmap = new mapvgl.HeatmapLayer({
                size: 70,
                max: 200,
                height: 0,
                unit: 'm',
                gradient: {
                    0.25: 'rgba(0, 0, 255, 1)',
                    0.55: 'rgba(0, 255, 0, 1)',
                    0.85: 'rgba(255, 255, 0, 1)',
                    1: 'rgba(255, 0, 0, 1)'
                }
            });
            view.addLayer(this.heatmap);
            this.loadHeatmap1();
        },
        toggleLayerVisibility(layer, isVisible) {
            if (isVisible) {
                layer.show();
            } else {
                layer.hide();
            }
        },
        loadHeatmap1() {
            this.loadData('/11.json', this.heatmap);
            this.toggleLayerVisibility(this.heatmap, true);
            this.toggleLayerVisibility(this.grid, false);
            this.heatmapVisible = true;
            this.gridVisible = false;
            this.map.setHeading(0);
            this.map.setTilt(0);
        },
        loadHeatmap2() {
            this.loadData('/22.json', this.heatmap);
            this.toggleLayerVisibility(this.heatmap, true);
            this.toggleLayerVisibility(this.grid, false);
            this.heatmapVisible = true;
            this.gridVisible = false;
        },
        loadHeatGrid3() {
            this.loadData('/11.json', this.grid);
            this.toggleLayerVisibility(this.heatmap, true);
            this.toggleLayerVisibility(this.grid, true);
            this.heatmapVisible = true;
            this.gridVisible = true;
            this.map.setHeading(30);
            this.map.setTilt(45);
        },
        loadHeatGrid4() {
            this.loadData('/22.json', this.grid);
            this.toggleLayerVisibility(this.heatmap, true);
            this.toggleLayerVisibility(this.grid, true);
            this.heatmapVisible = true;
            this.gridVisible = true;
            this.map.setHeading(30);
            this.map.setTilt(45);
        },
        loadData(url, layer) {
            axios.get(url)
                .then(response => {
                    const newData = response.data.result.data[0].bound;
                    const data = newData.map(item => ({
                        geometry: {
                            type: 'Point',
                            coordinates: [item[0], item[1]],
                        },
                        properties: {
                            count: item[2],
                        },
                    }));
                    // 确保在调用 'setData' 之前 'layer' 是已定义的
                    if (layer) {
                        layer.setData(data);
                    } else {
                        console.error('图层未定义');
                    }
                })
                .catch(error => {
                    console.error('获取数据时发生错误:', error);
                });
        },
    },
};
</script>
  
<style scoped>
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
    height: 60%;
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
