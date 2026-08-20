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
addPainting(scene, "/ClownBlanc.webp", "Clown blanc", -12, 3.4, -9.7, 2.5, 2.5,"back")

addPainting(scene, "/1.webp", "L arbre de vie (D'après Klimt)", -7.6, 3.4, -9.7, 3.25, 4,"back")

addPainting(scene, "/2.webp", "Paysage méditerranéen", -4, 3.4, -9.7, 1, 2,"back")

addPainting(scene, "/3.webp", "Composition", 4, 3.4, -9.7, 1.2, 0.9,"back")

addPainting(scene, "/4.webp", "Arearea", 8, 3.4, -9.7, 3, 2.5,"back")

//addPainting(scene, "/4.webp", "Arearea", -9.7, 3.4, -4.7, 3, 2.5,"left")

// ======================================================
// TABLEAUX - MUR DE GAUCHE
// ======================================================

addPainting(scene, "/rectangles.webp", "Rectangles", -14.85, 3.4, -4.7, 3, 2.5,"left")
// ======================================================
// CARTELS
// ======================================================
addLabel(scene,"Clown blanc",-12,1.4,-9.7)

addLabel(scene, "L arbre de vie (d'après G. Klimt)", -7.6, 0.8, -9.7)

addLabel(scene, "Paysage méditerranéen", -4, 1.8, -9.7)

addLabel(scene, "Composition", 4, 2.4, -9.70)

addLabel(scene, "Arearea (d'après P. Gauguin", 8, 1.5, -9.70)



// ======================================================
// TABLEAU - MUR GAUCHE
// ======================================================
addPainting(scene, "/Rectangles.webp", "Rectangles", -14.85, 3.4, -6, 2.05, 1.65, "left")

//addPainting(scene, "/ClownBlanc.webp", "Clown blanc", -12, 3.4, -9.7, 2.5, 2.5)

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