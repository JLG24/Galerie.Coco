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
  60,
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
//=======================================================
// //SALLE 1
// ======================================================
// TABLEAUX - MUR DU FOND 1
// ======================================================
addPainting(scene, "/ClownBlanc.webp", "Clown blanc", -12, 3.4, -9.7, 2.5, 2.5,"back")
addPainting(scene, "/ArbreDeVie.webp", "L arbre de vie (D'après Klimt)", -7.6, 3.4, -9.7, 3.25, 4,"back")
addPainting(scene, "/Place.webp", "Place de village", -4, 3.4, -9.7, 1, 2,"back")
addPainting(scene, "/Composition.webp", "Composition", 4, 3.4, -9.7, 1.2, 0.9,"back")
addPainting(scene, "/Arearea.webp", "Arearea", 8, 3.4, -9.7, 3, 2.5,"back")
addPainting(scene, "/fillette.webp", "Fillette", 12.5, 3.4, -9.7, 2.5, 2.5,"back")

// ======================================================
// TABLEAUX - MUR DE GAUCHE 1
// ======================================================

addPainting(scene, "/nuee.webp", "Nuée de papillons", -14.85, 3.4, -5.6, 2.05, 1.65,"left")
addPainting(scene, "/Nateis1.webp", "Nateis bleu", -14.85, 3.4, -1.8, 2, 2.5,"left")
addPainting(scene, "/lumiere.webp", "Lumiere", -14.85, 3.4, 1.6, 1.2, 1.5,"left")


// ======================================================
// TABLEAUX - MUR DE DROITE 1
// ======================================================

addPainting(scene, "/tempete.webp", "Tempête", 14.85, 3.4, -5.6, 1.5, 1,"right")
addPainting(scene, "/incendie.webp", "Incendie", 14.85, 3.4, -1.8, 0.8, 1.1,"right")
addPainting(scene, "/papillon.webp", "Papillon", 14.85, 4, 2.8, 4, 5,"right")
// ======================================================
// CARTELS 1
// ======================================================
addLabel(scene,"Clown blanc",-12,1.4,-9.7,"back")
addLabel(scene, "L arbre de vie (d'après G. Klimt)", -7.6, 0.8, -9.7,"back")
addLabel(scene, "Place de village", -4, 1.8, -9.7,"back")
addLabel(scene, "Composition", 4, 2.4, -9.70,"back")
addLabel(scene, "Arearea (d'après P. Gauguin", 8, 1.5, -9.70,"back")
addLabel(scene, "Fillette", 12.5, 1.5, -9.7,"back")

// ======================================================
// CARTELS MUR DE GAUCHE 1
// ======================================================
addLabel(scene, "Nuée de papillons", -14.85,1.8,-5.6,"left")
addLabel(scene, "Nateis bleu", -14.85,1.6,-1.8,"left")
addLabel(scene, "Lumière", -14.85, 1.8, 1.6,"left")

// ======================================================
// CARTELS MUR DE DROITE 1
// ======================================================
addLabel(scene, "Tempête", 14.85,2.3,-5.6,"right")
addLabel(scene, "Incendie", 14.85,2.2,-1.8,"right")
addLabel(scene, "Lumière", 14.85, 1, 2.8,"right")

// ======================================================
// TABLEAUX - SALLE 2
// ======================================================


// ======================================================
// TABLEAUX - MUR DU FOND 2
// ======================================================
addPainting(scene, "/zulma.webp", "Zulma (d'après H. Matisse)", -12, 3.4, -29.7, 2, 4,"back")
addPainting(scene, "/Larbre qui reve.webp", "L'arbre qui rêve", -8, 3.4, -29.7, 1,2, 1.5,"back")
addPainting(scene, "/descente.webp", "Descente", -4, 3.4, -29.7, 1, 2.5,"back")
addPainting(scene, "/descente2.webp", "Descente", 0, 3.4, -29.7, 1, 2,"back")
addPainting(scene, "/Papillon sur une fleur.webp", "Papillon sur une fleur", 4, 3.4, -29.7, 2.05, 1.65,"back")
addPainting(scene, "/mai.webp", "Mai", 8, 3.4, -29.7, 1.5, 1.5,"back")
addPainting(scene, "/Nateis2.webp", "Nateis2", 12, 3.4, -29.7, 2, 2.5,"back")
//addPainting(scene, "/fillette.webp", "Fillette", 12.5, 3.4, -9.7, 2.5, 2.5,"back")

// ======================================================
// TABLEAUX - MUR DE GAUCHE 2
// ======================================================

addPainting(scene, "/LumiereBrulee.webp", "Lumière brulée", -14.85, 3.4, -25.6, 1.2, 0.9,"left")
addPainting(scene, "/Triptyque a.webp", "Triptyque A", -14.85, 3.4, -21.6, 2.5,3,"left")
addPainting(scene, "/Ressac.webp", "Ressac au couchant", -14.85, 3.4, -18.6, 1.2, 0.9,"left")
addPainting(scene, "/Tonnelle.webp", "Tonnelle", -14.85, 3.4, -15.6, 1, 1.75,"left")


// ======================================================
// TABLEAUX - MUR DE DROITE 2
// ======================================================

addPainting(scene, "/NateisNoir.webp", "NateisNoir", 14.85, 3.4, -25.6, 2, 2.5,"right")
addPainting(scene, "/Empreintes IJL.webp", "Empreinte IJL", 14.85, 3.4, -21.6, 1.5, 2,"right")
addPainting(scene, "/Empreintes CJI.webp", "Empreinte CJI", 14.85, 3.4, -17.6, 1.5, 2,"right")
addPainting(scene, "/JL.webp", "JL", 14.85, 3.4, -13.6, 2, 2.5,"right")
// ======================================================
// CARTELS 2
// ======================================================
addLabel(scene,"Zulma (d'après H. Matisse)",-12,0.9,-29.7,"back")
addLabel(scene, "L'arbre qui rêve", -8, 1.8, -29.7,"back")
addLabel(scene, "Descente", -4, 1.5, -29.7,"back")
addLabel(scene, "Descente2", 0, 1.6, -29.7,"back")
addLabel(scene, "Papillon sur une fleur", 4, 1.8, -29.7,"back")
addLabel(scene, "Mai", 8, 1.8, -29.7,"back")
addLabel(scene, "Nateis2", 12, 1.5, -29.7,"back")

// ======================================================
// CARTELS MUR DE GAUCHE 2
// ======================================================
addLabel(scene, "Lumière brulée", -14.85,2,-25.6,"left")
addLabel(scene, "Triptyque A", -14.85,1.6,-21.6,"left")
addLabel(scene, "Ressac au couchant", -14.85,2,-18.6,"left")
addLabel(scene, "Tonnelle", -14.85,2,-15.6,"left")

// ======================================================
// CARTELS MUR DE DROITE 2
// ======================================================
addLabel(scene, "NateisNoir", 14.85,1.6,-25.6,"right")
addLabel(scene, "Empreintes IJL", 14.85,1.6,-21.6,"right")
addLabel(scene, "Empreintes CJI", 14.85,1.6,-17.6,"right")
addLabel(scene, "JL", 14.85, 1.5, -13.6,"right")



//addPainting(scene, "/7.jpeg", "Paysage méditerranéen", -4, 3.4, -29.7, 1.60, 2.00)

//addPainting(scene, "/8.jpeg", "Composition", 0, 3.4, -29.7, 1.00, 1.20)

//addPainting(scene, "/9.jpeg", "Horizon", 4, 3.4, -29.7, 1.20, 2.40)

//addPainting(scene, "/10.jpeg", "Souvenir", 8, 3.4, -29.7, 2.00, 1.72)

// ======================================================
// POSITION DE DÉPART
// ======================================================
camera.position.set(0,3,7)


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