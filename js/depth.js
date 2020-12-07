var depth = function() {
    // init scene, camera, objects and renderer
    var scene, camera, renderer, cube, shpere;
    let ADD = 0.02;   
    var init_app = function() {
        // 1. Create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        // 2. Create and locate the camera
        var canvasWidth = 1600, canvasHeight = 900;
        var fieldOfViewY = 60, aspectRatio = canvasWidth / canvasHeight, near = 0.1, far = 100.0;
        camera = new THREE.PerspectiveCamera(fieldOfViewY, aspectRatio, near, far);
        camera.position.z = 15;


        // 3. Create and locate the objects on the scene

        // Geometry
        const boxGeometry = new THREE.BoxGeometry(3, 2, 4); 
        const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);

        // Material
        const material = new THREE.MeshDepthMaterial();

        // Object
        cube = new THREE.Mesh(boxGeometry, material);
        cube.position.z = -10;
        cube.position.x = -5;

        sphere = new THREE.Mesh(sphereGeometry, material);
        sphere.position.z = 0;
        sphere.position.x = 5;

        scene.add(cube);
        scene.add(sphere);
    
        // 4. Create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);
    };
    // main animation loop - calls every 50-60ms
    var mainLoop = function() {
        requestAnimationFrame(mainLoop);
        cube.position.z += ADD;
        sphere.position.z -= ADD;
        if (cube.position.z >= 6 || cube.position.z <= -16) {
            ADD *= -1;
        }
        renderer.render(scene, camera);
    };
    init_app();
    mainLoop();
}