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
addPainting(scene, "/2.webp", "Place de village", -4, 3.4, -9.7, 1, 2,"back")
addPainting(scene, "/3.webp", "Composition", 4, 3.4, -9.7, 1.2, 0.9,"back")
addPainting(scene, "/4.webp", "Arearea", 8, 3.4, -9.7, 3, 2.5,"back")

// ======================================================
// TABLEAUX - MUR DE GAUCHE
// ======================================================

addPainting(scene, "/nuee.webp", "Nuée de papillons", -14.85, 3.4, -5.6, 2.05, 1.65,"left")
addPainting(scene, "/Nateis1.webp", "Nateis bleu", -14.85, 3.4, -1.8, 2, 2.5,"left")
addPainting(scene, "/lumiere.webp", "Lumiere", -14.85, 3.4, 1.6, 1.2, 1.5,"left")


// ======================================================
// TABLEAUX - MUR DE DROITE
// ======================================================

addPainting(scene, "/tempete.webp", "Tempête", 14.85, 3.4, -5.6, 1.5, 1,"right")
addPainting(scene, "/incendie.webp", "Incendie", 14.85, 3.4, -1.8, 0.8, 1.1,"right")
addPainting(scene, "/papillon.webp", "Papillon", 14.85, 4, 2.8, 4, 5,"right")
// ======================================================
// CARTELS
// ======================================================
addLabel(scene,"Clown blanc",-12,1.4,-9.7,"back")
addLabel(scene, "L arbre de vie (d'après G. Klimt)", -7.6, 0.8, -9.7,"back")
addLabel(scene, "Place de village", -4, 1.8, -9.7,"back")
addLabel(scene, "Composition", 4, 2.4, -9.70,"back")
addLabel(scene, "Arearea (d'après P. Gauguin", 8, 1.5, -9.70,"back")

// ======================================================
// CARTELS MUR DE GAUCHE
// ======================================================
addLabel(scene, "Nuée de papillons", -14.85,1.8,-5.6,"left")
addLabel(scene, "Nateis bleu", -14.85,1.6,-1.8,"left")
addLabel(scene, "Lumière", -14.85, 1.8, 1.6,"left")

// ======================================================
// CARTELS MUR DE DROITE
// ======================================================
addLabel(scene, "Tempête", 14.85,2.3,-5.6,"right")
addLabel(scene, "Incendie", 14.85,2.2,-1.8,"right")
addLabel(scene, "Lumière", 14.85, 1, 2.8,"right")

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
camera.position.set(0,2.5,7)


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