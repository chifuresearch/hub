/*
IIA studio - Media + Architecture Program
-----------------------------------------
P5js + BabylonJS + Scene Template -- by chifu 
- v1 2023.01.09 
- v2 2023.05.11 
- v2 2023.05.19 improve selection and raycaster 
*****************************************
ref. from= https://doc.babylonjs.com/features/starterSceneCode
ended Notion pages = https://www.notion.so/Babylon-Basic-548bca17f43942568b7295d550e26f36
*/

// ***************************************** 宣告 *****************************************
// 設置 babylon engine 畫布
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// ***************************************** 建置 GUI *****************************************
// ********* 宣告 *********
var object; // 可重繪目標物件，每次更改參數時重繪物件
var types = ["sphere","cone","torus"]
var mats = ["rock_wall_04","plank_flooring"]

var scene;
var cam;
var dude;
var bubbles=[]
var bsel;
var rotationAngle=0
// var Walk, Tpose, Run, Idle;

var param = {
  type:types[2],
  mat:mats[0],
  notions:{
    scaling:2,
    descript:'',
    clicksav:false
  }
}

var shadowGenerator;
var inputMap = {};
var shiftPressed = false;

var advancedTexture;    
// ********* 初始化 GUI *********
// var gui = new dat.GUI();	
// gui.domElement.style.marginTop = "15px";
// gui.domElement.id = "datGUI";

// ********* 控制狀況 *********

// 新增資料夾
// 執行基本屬性

// 注意 每次重繪時也要 更新 材質
// function updateMaterial(){
//   object.material = applyPBR('object','dragon-scales',24,1,0.3)
// 	if (shadowGenerator){
//       shadowGenerator.addShadowCaster(object);
// 	}
// }
// 匯入外部 GLB/GLTF 物件
var ms=[]
function loadAssets(scene,sg){
  
    var mainMaterial = new BABYLON.StandardMaterial("main", scene);
    // 匯入場景
    BABYLON.SceneLoader.ImportMesh(
      null,
      'https://rawcdn.githack.com/mediaplusarchi/GLTFassets/25d3600743403a25a18063aed7b485809cc11cb6/',
      'spheron.glb',
       scene, 
       (meshes, particleSystems, skeletons) =>{
        // 對匯入的東西 加掛能力
         meshes.forEach((m,i) => {
            // 陰影
           // if (i==2){
             
              sg.getShadowMap().renderList.push(m);
              m.receiveShadows = true; // 會接收陰影
              mainMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0.5);	
              // mainMaterial.reflectionTexture = probe.cubeTexture;
              mainMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
              mainMaterial.reflectionFresnelParameters.bias = 0.02;

              ms.push(m)
             console.log(m.name)
           // }
            
           // console.log(m)

          });           
    });
}

// ***************************************** 建置場景 *****************************************
// 將場景指派給 sceneToRender
const createScene = ()=> {

    // 場景背景
    scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black;
    // 攝影機
    const alpha =  Math.PI/4;
    const beta = Math.PI/3;
    const radius = 20;
    // const target = new BABYLON.Vector3(-5, 0, 0);

    // cam = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    // cam = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0.5, 0), scene);
    cam = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0,-2.3), scene);
    cam.rotationQuaternion = new BABYLON.Quaternion();
    cam.fov=1.135;
    cam.target = new BABYLON.Vector3(-0.8, 0, 0);
    cam.attachControl(canvas, true); 
  
  
          // Create a camera pointing at your model.
        // scene.createDefaultCameraOrLight(true, true, true);

        // Create a default ground and skybox.
        var environment = scene.createDefaultEnvironment({
            createGround: false,
            createSkybox: true,
            enableGroundMirror: false
        });
        
        // UI
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
  
    // scene.createDefaultCameraOrLight(1, 1, 1);
// //     followCamera.lockedTarget = sphere;
//     scene.actionManager = new BABYLON.ActionManager(scene);
//     scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
//         inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
//     }));
//     scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
//         inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
//     }));
  
  
//     // // 攝影機控制
//     cam.keysUp = [87,38]; //w / up
//     cam.keysDown = [83, 40];  //s / down
//     cam.keysLeft = [65, 37];  //a / left
//     cam.keysRight = [68, 39];  //w / up
//     cam.inertia = 0.2;
//     cam.fov = 1.3;
//     cam.maxZ = 1000000
//     cam.minZ = 0.1;
//     cam.angularSensibility = 500;
//     cam.speed = 2.5;
//     scene.gravity = new BABYLON.Vector3(0, -9.81/60, 0);
//     scene.collisionsEnabled = true;
//     cam.checkCollisions = true;
//     cam.applyGravity = true;
//     cam.ellipsoid = new BABYLON.Vector3(0.25, 1.5, 0.25);
//     cam._needMoveForGravity = true;

    // 設置環境場景
    // const envTex = new BABYLON.CubeTexture("https://rawcdn.githack.com/iiastudio/assets/1a85256ff180edaf4d17572d4c22a7c483383df4/skybox_blur.env", scene);
    // scene.environmentTexture = envTex;
    // scene.createDefaultSkybox(envTex, true)
    // 特效光暈
// Create the "God Rays" effect (volumetric light scattering)
  var light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 20, 100), scene);
  light0.intensity = 0.15;
	// var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, cam, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

	// By default it uses a billboard to render the sun, just apply the desired texture
	// position and scale
	// godrays.mesh.material.diffuseTexture = new BABYLON.Texture('textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	// godrays.mesh.material.diffuseTexture.hasAlpha = true;
	// godrays.mesh.position = new BABYLON.Vector3(0, 0, 1.50);
	// godrays.mesh.scaling = new BABYLON.Vector3(0, 0, 1.50);

	// light.position =  new BABYLON.Vector3(0, 0, 1.50)
    
  
    var box = BABYLON.MeshBuilder.CreateSphere("plane",{diameter:10}, scene);
    box.position.y = 0;

	var gradientMaterial = new BABYLON.GradientMaterial("grad", scene);
    gradientMaterial.topColor = new BABYLON.Color3(0.11, 0.53, 0.9);
    gradientMaterial.bottomColor = new BABYLON.Color3(0.3, 0.59, 0.61);
    gradientMaterial.offset = 0.5;
    gradientMaterial.smoothness = 1;
    gradientMaterial.scale = 0.1
    gradientMaterial.backFaceCulling=false
    box.material = gradientMaterial;
    // 光源
// scene.createDefaultCameraOrLight(1, 1, 1);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    // scene.lights[0].dispose();
    var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-1, -3, 1), scene);
    light.position = new BABYLON.Vector3(3, 15, 3);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    
  
  // 陰影 Shadows
	shadowGenerator = new BABYLON.ShadowGenerator(1024, light); // 設定陰影渲染器
    shadowGenerator.useBlurCloseExponentialShadowMap = true;
    shadowGenerator.forceBackFacesOnly = true;
    shadowGenerator.blurKernel = 32;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.usePercentageCloserFiltering = true;

    light.shadowMinZ = 1;
    light.shadowMaxZ = 100;
	shadowGenerator.setDarkness(0.9); // 設定陰影為半透明 0 最黑 1 陰影會消失
	shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH; // 陰影品質  
	// shadowGenerator.useBlurExponentialShadowMap = false; // 陰影邊緣羽化
	shadowGenerator.getShadowMap().refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
	light.autoUpdateExtends = false;
  
    // 加入重力
    scene.enablePhysics(new BABYLON.Vector3(0, -5, 0), new BABYLON.CannonJSPlugin());
    var physicsEngine = scene.getPhysicsEngine(); // 場景重力
    
    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");    
  
    // 匯入外部資料
    loadAssets(scene, shadowGenerator) 
  
    // 確保 texture 載入完成
    
    // 制動
    // const cnv = document.getElementById('renderCanvas');
//     canvas.addEventListener("pointerup", handleMouseClick);
//     function handleMouseClick(event) {
//       // 只感應 中鍵
//       if (event.button==1){
//         // Get the mouse coordinates
//         const mouseX = event.clientX;
//         const mouseY = event.clientY;


//         // Perform a picking operation
//         const pickResult = scene.pick(mouseX, mouseY);

//         if (pickResult.hit) {
//           // The mouse click hit an object in the scene
//           const pickedMesh = pickResult.pickedMesh;
//           // const pickedPoint = ;
//           // console.log(pickedPoint);
//           let pickedBubble = pickedMesh.name.split('_')[0] == 'bubble'
//           // 若非重複選取 才建構
//           if (!pickedBubble){

//           // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! 建構泡泡
//             // input = (scene,posVector3, isotimestamp, size(option), r(option), g(option), b(option))
//             new bubble(scene,pickResult.pickedPoint,new Date().toISOString())
//           // Create a bullet mesh
// //             var bubble = BABYLON.MeshBuilder.CreateSphere("bubble_"+bubbles.length, { diameter: 2 }, scene);
// //             var bmat = new BABYLON.StandardMaterial(bubble.name+'_mat', scene);
// //             bmat.diffuseColor = new BABYLON.Color3(1, 0, 0);
// //             bmat.material = bmat;
// //             bubble.position = pickResult.pickedPoint;


// //             bubble.actionManager = new BABYLON.ActionManager(scene);

// //             let act1 = new BABYLON.ExecuteCodeAction(
// //               BABYLON.ActionManager.OnPointerOverTrigger,
// //               () =>{
// //                 bmat.emissiveColor = BABYLON.Color3.White();
// //                 bubble.material= bmat;
// //               }
// //             );
// //             let act2 = new BABYLON.ExecuteCodeAction(
// //               BABYLON.ActionManager.OnPointerOutTrigger,
// //               () =>{
// //                 bmat.emissiveColor = BABYLON.Color3.Black();
// //                 bubble.material= bmat;
// //               }
// //             );
// //             bubble.actionManager.registerAction(act1);
// //             bubble.actionManager.registerAction(act2);
// //             bubbles.push(bubble)

//           }
//           // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! 建構泡泡 end

//         } else {
//           // The mouse click did not hit any object in the scene
//           console.log('No object picked.');
//         }
        
//       }// 中鍵 感應end

//     }
       // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
//     var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
//     ground.receiveShadows = true;
//     ground.position.y = -1.2;
    
//     // Create and tweak the background material.
//     var backgroundMaterial = new BABYLON.BackgroundMaterial("backgroundMaterial", scene);
//     backgroundMaterial.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/backgroundGround.png", scene);
//     backgroundMaterial.diffuseTexture.hasAlpha = true;
//     backgroundMaterial.opacityFresnel = false;
//     backgroundMaterial.shadowLevel = 0.4;

//     var mirror = new BABYLON.MirrorTexture("mirror", 512, scene);
//     mirror.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
//     ms.forEach((m)=>{
//       mirror.renderList.push(m);
//     })
    
//     backgroundMaterial.reflectionTexture = mirror;
//     backgroundMaterial.reflectionFresnel = true;
//     backgroundMaterial.reflectionStandardFresnelWeight = 0.8;

//     ground.material = backgroundMaterial;
  
  
  
  
//   scene.clearColor = new BABYLON.Color4(0.8, 0.6, 0.4, 1);
//   scene.registerBeforeRender(function () {
//   var gradient = scene.getEngine().getRenderingCanvas().getContext("2d").createLinearGradient(0, 0, 0, scene.getEngine().getRenderingCanvas().height);
//     gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
//     gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)");
//     scene.getEngine().getRenderingCanvas().style.background = gradient;
// });
  // var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Directly configure the color curves on the scene    
    var curve = new BABYLON.ColorCurves();
    curve.globalHue = 200;
    curve.globalDensity = 80;
    curve.globalSaturation = 80;

    curve.highlightsHue = 20;
    curve.highlightsDensity = 80;
    curve.highlightsSaturation = -80;

    curve.shadowsHue = 2;
    curve.shadowsDensity = 80;
    curve.shadowsSaturation = 40;
    scene.imageProcessingConfiguration.colorCurvesEnabled = true;
    scene.imageProcessingConfiguration.colorCurves = curve;
  
  
  
  
  
    // Create the SSR post-process!
    const forceGeometryBuffer = false;
    const useMSAA = true;
    const ssr = new BABYLON.SSRRenderingPipeline("ssr", scene, [scene.activeCamera], forceGeometryBuffer, BABYLON.Constants.TEXTURETYPE_UNSIGNED_BYTE);

    //ssr.environmentTexture = skyboxMaterial.reflectionTexture;
    ssr.thickness = 0.1;
    ssr.enableSmoothReflections = true;
    ssr.step = 15;

    if (useMSAA) {
        if (forceGeometryBuffer) {
            ssr.samples = 4;
        } else {
            new BABYLON.FxaaPostProcess("fxaa", 1, cam);
        }
    }

    /*window.setTimeout(() => {
        scene.stopAllAnimations();
    }, 2000);*/

    window.ssr=ssr
  
			// scene.registerBeforeRender(()=> {
			// // light.position = camera.position;
			// ms[0].rotation.y += 0.05;
			// ms[1].rotation.y += 0.05;
			// });

			// scene.registerBeforeRender(() => {
			// // if (scene.getMeshByName("root")){
			// cam.rotation.y += 0.05;
			// // }
			// }); 
    return scene;
};
const sceneToRender = createScene(); // 每次重繪執行 sceneToRender

// // 跳
// var isJumping = false;
// var jumplimit = 3;
// var jumpheight = 0;

// window.addEventListener("keydown", function (event) {
//   if (event.keyCode === 32 ) { // space key
//     isJumping = true;
//     jumpheight = 0
//   }
// });

// function jump() {
//   // Add jump animation
//     if (isJumping) {
//         cam.position.y += 2;
//         jumpheight +=0.25
      
//         if (jumpheight > jumplimit){
//           isJumping = false
//         }
//     }
// }
// ***************************************** 更新 *****************************************
// 設置 babylon 更新與渲染
engine.runRenderLoop(()=>{
    // jump();
  // console.log(rotationAngle)
  // scene.registerBeforeRender(() => {
  //   // Increment the rotation angle by a certain value
  //   rotationAngle += 0.01; // Adjust the value as needed for the desired rotation speed
  // });
  // if (ms.length>0){
  //   ms[1].rotate(BABYLON.Axis.Y, rotationAngle, BABYLON.Space.WORLD);
  // }
 
  
  
    sceneToRender.render();

    
});

// 設置 babylon 拉伸
// Resize
window.addEventListener("resize", ()=> {
    engine.resize();
});
