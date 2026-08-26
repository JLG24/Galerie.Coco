import * as THREE from 'three'

export function addPainting(
  scene,
  imagePath,
  title,
  x,
  y,
  z,
  width,
  height,
  wall = "back"
) {

  const textureLoader = new THREE.TextureLoader()

  textureLoader.load(
    import.meta.env.BASE_URL + imagePath.replace(/^\/+/, ''),
    (texture) => {

      // =====================================================
      // GROUPE TABLEAU + CADRE
      // =====================================================

      const paintingGroup = new THREE.Group()

      paintingGroup.position.set(x, y, z)


      // =====================================================
      // ORIENTATION SELON LE MUR
      // =====================================================

      if (wall === "back") {
        paintingGroup.rotation.y = 0
      }

      if (wall === "left") {
        paintingGroup.rotation.y = Math.PI / 2
      }

      if (wall === "right") {
        paintingGroup.rotation.y = -Math.PI / 2
      }


      // =====================================================
      // TABLEAU
      // =====================================================

        texture.colorSpace = THREE.SRGBColorSpace

        const paintingMaterial = new THREE.MeshBasicMaterial({
            map: texture
        })

        const painting = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            paintingMaterial
        )

      painting.position.z=0.008

      painting.userData.imagePath = imagePath

      painting.userData.onClick = () => {
        openPainting(imagePath, title)
      }

      paintingGroup.add(painting)


      // =====================================================
      // CADRE 3D MOULURÉ
      // =====================================================

      const frameWidth = 0.12
      const frameDepth = 0.055

      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x4c2e1b,
        roughness: 0.52,
        metalness: 0
      })


      // Forme extérieure

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


      // Volume 3D

      const frameGeometry = new THREE.ExtrudeGeometry(
        shape,
        {
          depth: frameDepth,
          bevelEnabled: true,
          bevelThickness: 0.014,
          bevelSize: 0.012,
          bevelSegments: 2
        }
      )

      const frame = new THREE.Mesh(
        frameGeometry,
        frameMaterial
      )

      frame.position.set(
        0,
        0,
        0
      )

      frame.castShadow = true
      frame.receiveShadow = true

      paintingGroup.add(frame)


      // =====================================================
      // AJOUT DU GROUPE À LA SALLE
      // =====================================================

      scene.add(paintingGroup)
ap
    }
  )
}


// =========================================================
// AFFICHAGE GRAND FORMAT AVEC ZOOM SUR IPAD
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
  viewer.style.overflow = 'hidden'


  // =====================================================
  // IMAGE
  // =====================================================

  const image = document.createElement('img')

  image.src =
    import.meta.env.BASE_URL +
    imagePath.replace(/^\/+/, '')

  image.style.maxWidth = '90vw'
  image.style.maxHeight = '78vh'

  image.style.objectFit = 'contain'
  image.style.userSelect = 'none'

  image.style.touchAction = 'none'

  image.style.transformOrigin = 'center center'

  let scale = 1
  let startDistance = 0
  let startScale = 1


  // =====================================================
  // CALCUL DISTANCE ENTRE DEUX DOIGTS
  // =====================================================

  function getDistance(touch1, touch2) {

    const dx =
      touch1.clientX - touch2.clientX

    const dy =
      touch1.clientY - touch2.clientY

    return Math.sqrt(
      dx * dx + dy * dy
    )
  }


  // =====================================================
  // PINCH-TO-ZOOM IPAD
  // =====================================================

  viewer.addEventListener('touchstart', (event) => {

    if (event.touches.length === 2) {

      startDistance = getDistance(
        event.touches[0],
        event.touches[1]
      )

      startScale = scale

    }

  }, { passive: false })


  viewer.addEventListener('touchmove', (event) => {

    if (event.touches.length === 2) {

      event.preventDefault()

      const distance = getDistance(
        event.touches[0],
        event.touches[1]
      )

      scale =
        startScale *
        (distance / startDistance)

      // Limites du zoom
      scale = Math.max(
        1,
        Math.min(scale, 4)
      )

      image.style.transform =
        `scale(${scale})`
    }

  }, { passive: false })


  // =====================================================
  // TITRE
  // =====================================================

  const titleElement = document.createElement('div')

  titleElement.textContent = title

  titleElement.style.color = 'white'
  titleElement.style.fontFamily = 'Arial, sans-serif'
  titleElement.style.fontSize = '22px'
  titleElement.style.marginTop = '18px'
  titleElement.style.textAlign = 'center'


  // =====================================================
  // ARTISTE
  // =====================================================

  const artistElement = document.createElement('div')

  artistElement.textContent = ''

  artistElement.style.color = '#cccccc'
  artistElement.style.fontFamily = 'Arial, sans-serif'
  artistElement.style.fontSize = '17px'
  artistElement.style.marginTop = '6px'


  // =====================================================
  // BOUTON FERMER
  // =====================================================

  const closeButton = document.createElement('button')

  closeButton.textContent = '✕'

  closeButton.style.position = 'absolute'
  closeButton.style.top = '20px'
  closeButton.style.right = '25px'

  closeButton.style.width = '55px'
  closeButton.style.height = '55px'

  closeButton.style.borderRadius = '50%'
  closeButton.style.border = 'none'

  closeButton.style.background =
    'rgba(255,255,255,0.85)'

  closeButton.style.fontSize = '28px'


  closeButton.addEventListener('click', () => {

    viewer.remove()

  })


  // =====================================================
  // AJOUT DES ELEMENTS
  // =====================================================

  viewer.appendChild(image)
  viewer.appendChild(titleElement)
  viewer.appendChild(artistElement)
  viewer.appendChild(closeButton)

  document.body.appendChild(viewer)
}