var solution = function() {
    // init scene, camera, objects and renderer
    var scene, camera, renderer, cube, shpere;
    var fragments = [];
    var ADD = 0.05;
    const dt = 0.02;

    class Fragment {
        constructor(position, velocity, g) {
            this.velocity = velocity;
            this.velocity.multiplyScalar(dt);

            var material = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                color: 0x8a1c8c,
                emissive: 0x8a1c8c,
                emissiveIntensity: 0.4,
                shininess: 100,
                specular: 0x8a1c8c,
                vertexColors: true
            });

            this.shape = new THREE.Mesh(g, material);
            this.shape.position.copy(position);
        }

        move() {
            this.shape.position.add(this.velocity);
            this.shape.rotation.x += ADD;
        }
    };

    var createTriangle = function (p1, p2, p3) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(p1, p2, p3);
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        return geometry;
    };

    var createGeometry = function () {
        var p1 = new THREE.Vector3(0, 1, 0);
        var p2 = new THREE.Vector3(1, 0, 1);
        var p3 = new THREE.Vector3(-1, 0, 1);
        var p4 = new THREE.Vector3(-1, 0, -1);
        var p5 = new THREE.Vector3(1, 0, -1);
        var p6 = new THREE.Vector3(0, -1, 0);

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 6), createTriangle(p1, p2, p3)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, 2, 6), createTriangle(p1, p2, p3)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-2, 2, 6), createTriangle(p1, p3, p4)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-2, -2, 6), createTriangle(p1, p3, p4)));

        fragments.push(new Fragment(new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(2, -2, 6), createTriangle(p1, p3, p4)));

        fragments.forEach(f => scene.add(f.shape));
    };
    var init_app = function() {

        // create the scene
        scene = new THREE.Scene();
        scene.background = new THREE.TextureLoader().load(" data/texture/image3d.jpg");

        // create an locate the camera
        camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight,
            1, 1000);
        camera.position.z = 20;

        var directionalLightUp = new THREE.DirectionalLight(0xffffff);
        scene.add(directionalLightUp);

        createGeometry();

        // create the renderer   
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
    };
    // main animation loop - calls every 50-60ms
    var mainLoop = function() {
        fragments.forEach(f => f.move());

        renderer.render(scene, camera);
        requestAnimationFrame(mainLoop);
    };
    init_app();
    mainLoop();
}