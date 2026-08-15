import { addLabel } from './labels.js'
import { addPainting } from './paintings.js'
import { createMuseum } from './museum.js'
import * as THREE from 'three'
import './style.css'
import { createControls } from './controls.js'
import { createGalleryLights } from './galleryLights.js'

// ======================================================
// SCÈNE
// ======================================================

const scene = new THREE.Scene()

scene.background = new THREE.Color(0x202020)


// ======================================================
// CAMÉRA
// ======================================================

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)


// ======================================================
// RENDERER
// ======================================================

const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

document.body.appendChild(renderer.domElement)


// ======================================================
// DÉPLACEMENT
// ======================================================

const movement = createControls(
  camera,
  renderer
)

// ======================================================
// CLIC / TOUCHER SUR UN TABLEAU
// ======================================================

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

function checkPaintingClick(clientX, clientY) {

  const rect = renderer.domElement.getBoundingClientRect()

  pointer.x =
    ((clientX - rect.left) / rect.width) * 2 - 1

  pointer.y =
    -((clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(pointer, camera)

  const objects = raycaster.intersectObjects(
    scene.children,
    true
  )

  for (const hit of objects) {

    if (hit.object.userData.onClick) {

      hit.object.userData.onClick()

      break
    }
  }
}
// Clic / toucher sur Mac et iPad
renderer.domElement.addEventListener('pointerup', (event) => {

  checkPaintingClick(
    event.clientX,
    event.clientY
  )

})
// ======================================================
// MUSÉE
// ======================================================

createMuseum(scene)
createGalleryLights(scene)

// ======================================================
// TABLEAUX - MUR DU FOND
// ======================================================
addPainting(scene, "/1.jpeg", "L arbre de vie (D'après Klimt)", -8, 3.4, -9.7, 3.25, 4)

//addPainting(scene, "/2.jpeg", "Paysage méditerranéen", -4, 3.4, -9.7, 1.60, 2.00)

//addPainting(scene, "/3.jpeg", "Composition", 4, 3.4, -9.7, 1.00, 1.20)

//addPainting(scene, "/4.jpeg", "Horizon", 7, 3.4, -9.7, 1.20, 2.40)

//addPainting(scene, "/5.jpeg", "Souvenir", 11, 3.4, -9.7, 2.00, 1.72)
// ======================================================
// CARTELS
// ======================================================
addLabel(scene, "L arbre de vie (D après Klimt) - Coco", -8, 1.15, -9.7)

//addLabel(scene, "Paysage méditerranéen - Coco", -4, 1.15, -9.7)

//addLabel(scene, "Composition - Coco", 4, 1.15, -9.70)

//addLabel(scene, "Horizon - Coco", 7, 1.15, -9.70)

//addLabel(scene, "Souvenir - Coco", 11, 1.15, -9.70)

// ======================================================
// TABLEAU - MUR GAUCHE
// ======================================================

// ======================================================
// TABLEAUX - SALLE 2
// ======================================================
//addPainting(scene, "/6.jpeg", "La lumière du soir", -8, 3.4, -29.7, 1.60, 1.36)

//addPainting(scene, "/7.jpeg", "Paysage méditerranéen", -4, 3.4, -29.7, 1.60, 2.00)

//addPainting(scene, "/8.jpeg", "Composition", 0, 3.4, -29.7, 1.00, 1.20)

//addPainting(scene, "/9.jpeg", "Horizon", 4, 3.4, -29.7, 1.20, 2.40)

//addPainting(scene, "/10.jpeg", "Souvenir", 8, 3.4, -29.7, 2.00, 1.72)

// ======================================================
// POSITION DE DÉPART
// ======================================================
camera.position.set(0,1.7,7)


// ======================================================
// ANIMATION
// ======================================================

function animate() {

  requestAnimationFrame(animate)

  movement.update()

  renderer.render(
    scene,
    camera
  )
}

animate()