var normal = function() {
    // init scene, camera, objects and renderer
    var scene, camera, renderer, cube1, cube2, plane;
    let ADD = 0.02;   
    var init_app = function() {
        // 1. Create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        // 2. Create and locate the camera
        var canvasWidth = 1600, canvasHeight = 900;
        var fieldOfViewY = 60, aspectRatio = canvasWidth / canvasHeight, near = 0.1, far = 100.0;
        camera = new THREE.PerspectiveCamera(fieldOfViewY, aspectRatio, near, far);
        camera.position.z = 25;

        // 3. Create and locate the objects on the scene

        // Geometry
        const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);

        // Material
        const redMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
        const yellowMaterial = new THREE.MeshBasicMaterial({color: 0xffff00});

        const planeMaterial = new THREE.MeshBasicMaterial({color: 0Xa6f995, wireframe: true});

        // Object
        cube1 = new THREE.Mesh(boxGeometry, redMaterial);
        cube1.position.z = -6;
        cube1.position.y = -5;

        cube2 = new THREE.Mesh(boxGeometry, yellowMaterial);
        cube2.position.z = 6;
        cube2.position.y = -5;

        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = Math.PI / 2;
        plane.position.y = -100;

        scene.add(plane);
        scene.add(cube1);
        scene.add(cube2);

        // 4. Create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);
    };
    // main animation loop - calls every 50-60ms
    var mainLoop = function() {
        requestAnimationFrame(mainLoop);
        cube1.position.x += ADD;
        cube2.position.x -= ADD;
        if (cube1.position.x > 6 || cube1.position.x < -6) {
            ADD *= -1;
        }
        renderer.render(scene, camera);
    };
    init_app();
    mainLoop();
}