import * as THREE from 'three'
export function addLabel(scene, text, x, y, z) {

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    canvas.width = 512
    canvas.height = 96

    // Fond blanc
    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Texte
    context.fillStyle = "#111111"
    context.font = "34px Arial"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    })

   const label = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 0.32),
    material
)
    label.position.set(x, y, z)

    scene.add(label)
}