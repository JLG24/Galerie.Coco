import * as THREE from 'three'

export function addPainting(scene, imagePath, title, x, y, z, width, height) {

  const textureLoader = new THREE.TextureLoader()

 textureLoader.load(import.meta.env.BASE_URL + imagePath.replace(/^\/+/, ''), (texture) => {

    // =====================================================
    // TABLEAU
    // =====================================================

    const paintingMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.75
    })

    const painting = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      paintingMaterial
    )

    painting.position.set(x, y, z)

    painting.userData.imagePath = imagePath

    painting.userData.onClick = () => {
      openPainting(imagePath, title)
    }

    scene.add(painting)

// =====================================================
// CADRE 3D MOULURÉ
// =====================================================

const frameWidth = 0.16
const frameDepth = 0.14

const frameMaterial = new THREE.MeshStandardMaterial({
  color: 0x5a381f,
  roughness: 0.42,
  metalness: 0.05
})


// Forme extérieure du cadre
const shape = new THREE.Shape()

shape.moveTo(
  -width / 2 - frameWidth,
  -height / 2 - frameWidth
)

shape.lineTo(
  width / 2 + frameWidth,
  -height / 2 - frameWidth
)

shape.lineTo(
  width / 2 + frameWidth,
  height / 2 + frameWidth
)

shape.lineTo(
  -width / 2 - frameWidth,
  height / 2 + frameWidth
)

shape.closePath()


// Ouverture centrale
const hole = new THREE.Path()

hole.moveTo(
  -width / 2,
  -height / 2
)

hole.lineTo(
  width / 2,
  -height / 2
)

hole.lineTo(
  width / 2,
  height / 2
)

hole.lineTo(
  -width / 2,
  height / 2
)

hole.closePath()

shape.holes.push(hole)


// Création du volume 3D
const frameGeometry = new THREE.ExtrudeGeometry(
  shape,
  {
    depth: frameDepth,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 2
  }
)

const frame = new THREE.Mesh(
  frameGeometry,
  frameMaterial
)

frame.position.set(
  x,
  y,
  z - frameDepth / 2
)

frame.castShadow = true
frame.receiveShadow = true

scene.add(frame)



  })
}


// =========================================================
// AFFICHAGE GRAND FORMAT
// =========================================================

function openPainting(imagePath, title) {

  if (document.getElementById('paintingViewer')) return

  const viewer = document.createElement('div')

  viewer.id = 'paintingViewer'

  viewer.style.position = 'fixed'
  viewer.style.inset = '0'

  viewer.style.background = 'rgba(0,0,0,0.94)'

  viewer.style.display = 'flex'
  viewer.style.flexDirection = 'column'
  viewer.style.alignItems = 'center'
  viewer.style.justifyContent = 'center'

  viewer.style.zIndex = '2000'

  viewer.style.touchAction = 'none'


  const image = document.createElement('img')

  image.src = imagePath

  image.style.maxWidth = '90vw'
  image.style.maxHeight = '78vh'

  image.style.objectFit = 'contain'

  image.style.userSelect = 'none'

  image.style.touchAction = 'none'


  const titleElement = document.createElement('div')

  titleElement.textContent = title

  titleElement.style.color = 'white'
  titleElement.style.fontFamily = 'Arial, sans-serif'
  titleElement.style.fontSize = '22px'
  titleElement.style.marginTop = '18px'
  titleElement.style.textAlign = 'center'


  const artistElement = document.createElement('div')

  artistElement.textContent = 'Coco'

  artistElement.style.color = '#cccccc'
  artistElement.style.fontFamily = 'Arial, sans-serif'
  artistElement.style.fontSize = '17px'
  artistElement.style.marginTop = '6px'


  const closeButton = document.createElement('button')

  closeButton.textContent = '✕'

  closeButton.style.position = 'absolute'
  closeButton.style.top = '20px'
  closeButton.style.right = '25px'

  closeButton.style.width = '55px'
  closeButton.style.height = '55px'

  closeButton.style.borderRadius = '50%'
  closeButton.style.border = 'none'

  closeButton.style.background = 'rgba(255,255,255,0.85)'

  closeButton.style.fontSize = '28px'


  closeButton.addEventListener('click', () => {
    viewer.remove()
  })


  viewer.appendChild(image)
  viewer.appendChild(titleElement)
  viewer.appendChild(artistElement)
  viewer.appendChild(closeButton)

  document.body.appendChild(viewer)
}