import * as THREE from 'three'

export function addPaintingLight(scene, x, y, z) {

  const light = new THREE.SpotLight(
    0xffffff,
    20,
    10,
    Math.PI / 6,
    0.7,
    1
)

    light.position.set(x, y, z)

    light.castShadow = true

    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024

    const target = new THREE.Object3D()

    target.position.set(
        x,
        3,
        -8
    )

    scene.add(target)

    light.target = target

    scene.add(light)
}