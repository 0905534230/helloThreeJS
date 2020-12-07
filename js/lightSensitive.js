
var lightSensitive=function() {
    //initialize sence, camera, objects and renderer
    var scene, camera, renderer, cube, sphere, cone;
    var ADD = 0.02;
    var init_app = function(){
        // create the sence
        scene = new THREE.Scene();
        
        // create an the local camera
        var canvasWidth = 1280, canvasHeight = 720;
        var fieldOfViewY = 60; aspectRation = canvasWidth/canvasHeight, near = 0.1, far = 100;
        camera = new THREE.PerspectiveCamera(fieldOfViewY, aspectRation, near, far);

        const pointLight = new THREE.PointLight( 0xff0000, 1, 300 , 1 );
        pointLight.position.set( 80, 50, 100 );
        scene.add( pointLight );
        camera.position.z = 15;

        // create Sound
        const listener = new THREE.AudioListener();
        const sound = new THREE.Audio(listener);
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load('data/texture/music.ogg', function(buffer){
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.8);
            sound.play();
        });
        
        //create and locate the objects on the sence

        //create Geometry 
        const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
        const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
        const coneGeometry = new THREE.ConeGeometry(3, 4, 20, 1, true);

        // create Material 
        const materialLambert = new THREE.MeshLambertMaterial({color:0x7fc5f9, side: THREE.DoubleSide, emissive: 0x25673d, emissiveIntentsity: 0.5});
        const materialPhong = new THREE.MeshPhongMaterial({color:0x7fc5f9, side: THREE.DoubleSide, emissive: 0x25673d, emissiveIntentsity: 0.5, shiness: 100 , specular: 0x543131});
        const materialStandard = new THREE.MeshStandardMaterial({color:0x7fc5f9, side: THREE.DoubleSide, emissive: 0x25673d, emissiveIntentsity: 0.5, metalness: 1, roughness: 1});
    
        //Lambert
        cube = new THREE.Mesh(boxGeometry, materialLambert);
        scene.add(cube);
        //Phong
        sphere = new THREE.Mesh(sphereGeometry, materialPhong);
        scene.add(sphere);
        //Standard
        cone = new THREE.Mesh(coneGeometry, materialStandard)
        scene.add(cone);

        //image Map
        imageCube = new THREE.TextureLoader().load(" data/texture/image1.jpg");
        imageSephre = new THREE.TextureLoader().load(" data/texture/image2.jpg");
        imageCone = new THREE.TextureLoader().load(" data/texture/image3.jpeg");
        flowerImage = new THREE.TextureLoader().load("data/texture/flower.jpg");

        const boxGeometryImageMap = new THREE.BoxGeometry(3, 3, 3);
        const sphereGeometryImageMap = new THREE.SphereGeometry(3, 30, 30);
        const cubeGeometryFlower = new THREE.BoxGeometry(3, 3, 3);

        const materialBoxImageMap = new THREE.MeshBasicMaterial({map:imageCube});
        const materialSephreImageMap = new THREE.MeshBasicMaterial({map:imageSephre});
        const materialCubeFlower = new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, alphaMap: flowerImage });

        cubeImageMap = new THREE.Mesh(boxGeometryImageMap, materialBoxImageMap);
        scene.add(cubeImageMap);
        sphereImageMap = new THREE.Mesh(sphereGeometryImageMap, materialSephreImageMap);
        scene.add(sphereImageMap);
        coneImageMap = new THREE.Mesh(cubeGeometryFlower, materialCubeFlower);
        scene.add(coneImageMap);

        var directionalLightUp = new THREE.DirectionalLight(0xffffff);
        scene.add(directionalLightUp);

        // create renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);
    };

    var mainLoop = function(){
        requestAnimationFrame(mainLoop);

        cube.position.x = -7;
        cube.position.y = 5;
        cube.rotation.x += ADD;
        cube.rotation.y += ADD;
        

        sphere.position.x = 0;
        sphere.position.y = 5;
        sphere.rotation.x += ADD;
        sphere.rotation.y += ADD;

        cone.position.x = 8;
        cone.position.y = 5;
        cone.rotation.x += ADD;
        cone.rotation.y += ADD;

        //imageMap

        cubeImageMap.position.x = -7;
        cubeImageMap.position.y = -3;
        cubeImageMap.rotation.x += ADD;
        cubeImageMap.rotation.y += ADD;
        
        sphereImageMap.position.x = 0;
        sphereImageMap.position.y = -3;
        sphereImageMap.rotation.x += ADD;
        sphereImageMap.rotation.y += ADD;

        coneImageMap.position.x = 8;
        coneImageMap.position.y = -3;
        coneImageMap.rotation.x += ADD;
        coneImageMap.rotation.y += ADD;


        renderer.render(scene,camera);
    };
    init_app();
    mainLoop();
}