var linePoints = function() {
    // init scene, camera, objects and renderer
    var scene, camera, renderer, cube, shpere;
    // var random =100;
    let ADD = 0.02;   
    var init_app = function() {
        // 1. Create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // 2. Create and locate the camera
        var canvasWidth = 1600, canvasHeight = 900;
        var fieldOfViewY = 60, aspectRatio = canvasWidth / canvasHeight, near = 0.1, far = 100.0;
        camera = new THREE.PerspectiveCamera(fieldOfViewY, aspectRatio, near, far);
        camera.position.z = 25;

        // 3. Create and locate the objects on the scene

        // Geometry
        // const cylinderGeometry = new THREE.CylinderGeometry(3, 2, 4); 
        // const sphereGeometry = new THREE.SphereGeometry(3, 30, 30);
        const geometry = new THREE.BoxGeometry(5,5,5);

        // Material
        // const material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1});
        // const dashedMaterial = new THREE.LineDashedMaterial({color: 0xffffff, linewidth: 1, dashSize: 5, gapSize: 1});
        const pointsMaterial = new THREE.PointsMaterial({color: 0xffffff , size: 0.5});
        geometry.computeBoundingSphere();
        particles = new THREE.Points(geometry, pointsMaterial);


        // Object
        // cylinder = new THREE.Line(cylinderGeometry, dashedMaterial);
        // cylinder = new THREE.Points(cylinderGeometry,pointsMaterial);
        // cylinder.position.z = -10;
        // cylinder.position.x = -5;

        // sphere = new THREE.Line(sphereGeometry, pointsMaterial);
        // sphere.position.z = 0;
        // sphere.position.x = 5;

        for(let i = 1 ; i <= 1000; i++){
            let x = Math.random()* 100;
            let y = Math.random()*20;
            let z = Math.random();
            geometry.vertices.push(new THREE.Vector3(x , y , z));

        }

        // cylinderGeometry.computeLineDistances();
        // sphereGeometry.computeLineDistances();

        scene.add(particles);
        // scene.add(sphere);
    
        // 4. Create the renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);
        document.body.appendChild(renderer.domElement);
    };
    // main animation loop - calls every 50-60ms
    var mainLoop = function() {
        requestAnimationFrame(mainLoop);
        particles.position.x = -24;
        particles.position.y = -7;

        renderer.render(scene, camera);
    };
    init_app();
    mainLoop();
}