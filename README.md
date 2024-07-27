# ZZU_FloodPlatform
#### 1.系统开发关键技术

本平台在开发过程中主要利用了 HTML、CSS、JavaScript、Vue 框架、Axios库百度 API 中的 MapVGL库，其中， HTML 和 CSS 用于页面结构和样式设计，JavaScript 用于实现交互逻辑；Vue作为一款简洁、灵活、高性能且具有丰富的生态系统的前端框架来搭建平台开发环境；Axios库则负责与后端进行数据通信，获取数据并在前端应用中进行处理和展示；百度 API 中的 MapVGL 库用来展示大量基于 3D 的地理信息点线面数据，使得项目能够直观展示地理信息数据。

<img src="https://github.com/user-attachments/assets/9c679888-ff49-4b73-82fb-6d60aab03317" style="width: 100%; height: auto;" alt="Image">

#### 2.功能实现 

##### 2.1基本信息与路径规划
显示校园建筑基本信息以及规划路径

<img src="https://github.com/user-attachments/assets/42265261-96c4-4647-8e88-0faef5964831" style="width: 40%; height: auto;" alt="Image">

<img src="https://github.com/user-attachments/assets/b4c9665b-38e0-4dd2-990a-029ddbb5e25b" style="width: 50%; height: auto;" alt="Image">

##### 2.2积水地带可视化 

对校园各区域根据其积水频率进行热力图与热力柱绘制，通过可视化来直观的得到校园内的积水高发区，从而对该区域提高注意，加强管控。

<img src="https://github.com/user-attachments/assets/a51176ce-6f1b-4ea7-abca-85f8aafb670a" style="width: 50%; height: auto;" alt="Image">

##### 2.3险区识别

对水体进行水深及周围人群识别，如果水体深度超过50cm，认为是危险水体，在地图进行红色标注，若周围有人群，进行人群疏散，导航至避难所 

<img src="https://github.com/user-attachments/assets/a72f7d5a-3e3e-4bb8-8b94-04a688598c52" style="width: 50%; height: auto;" alt="Image">

##### 2.4人员救援

在发现溺水人员后，上传溺水地点，在地图上显示能够参与救援的人员姓名及其联系方式，方便及时呼救，保障生命安全。

<img src="https://github.com/user-attachments/assets/6f72c96f-a5e7-49fa-b7da-33026678742a" style="width: 50%; height: auto;" alt="Image">


