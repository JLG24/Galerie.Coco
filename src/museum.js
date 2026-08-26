import * as THREE from 'three'


export function createMuseum(scene) {

  // ======================================================
  // DIMENSIONS
  // ======================================================

  const width = 30
  const depth = 20
  const height = 8


  // ======================================================
// TEXTURE PARQUET BOIS CLAIR
// ======================================================


function createWoodTexture() {

  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024

  const ctx = canvas.getContext('2d')

  // Fond bois clair
  ctx.fillStyle = '#c8bda5'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // ====================================================
  // GRANDES PLANCHES
  // ====================================================

  const plankWidth = 320

  for (let x = 0; x <= canvas.width; x += plankWidth) {

    ctx.strokeStyle = 'rgba(80, 65, 45, 0.025)'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, canvas.height)
    ctx.stroke()
  }

  // ====================================================
  // VEINES TRÈS DISCRÈTES
  // ====================================================

  for (let x = 0; x < canvas.width; x += plankWidth) {

    for (let i = 0; i < 2; i++) {

      const offset =
        30 + Math.random() * (plankWidth - 60)

      ctx.strokeStyle = 'rgba(90, 75, 55, 0.025)'
      ctx.lineWidth = 2

      ctx.beginPath()

      ctx.moveTo(
        x + offset,
        0
      )

      for (let y = 0; y < canvas.height; y += 160) {

        ctx.lineTo(
          x + offset + (Math.random() - 0.5) * 10,
          y + 160
        )
      }

      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)

  texture.colorSpace = THREE.SRGBColorSpace

  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  // Peu de répétitions = grandes lames
  texture.repeat.set(2, 1)

  return texture
}

const woodTexture = createWoodTexture()

function createWallTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 1024

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#d8d5cc'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Micro-variations de l’enduit
  for (let i = 0; i < 2400; i++) {
    const shade = Math.random() > 0.5
      ? 'rgba(255,255,255,0.018)'
      : 'rgba(85,78,67,0.014)'

    ctx.fillStyle = shade

    const size = 1 + Math.random() * 3

    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      size,
      size
    )
  }

  // Nuances larges presque imperceptibles
  for (let i = 0; i < 55; i++) {
    ctx.fillStyle = 'rgba(255,255,255,0.012)'
    ctx.beginPath()
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      20 + Math.random() * 70,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return texture
}

const wallTexture = createWallTexture()

  // ======================================================
  // MATÉRIAUX
  // ======================================================

 const wallMaterial = new THREE.MeshStandardMaterial({
  map: wallTexture,
  color: 0xffffff,
  roughness: 0.88
})

 const floorMaterial = new THREE.MeshStandardMaterial({
  map: woodTexture,
  color: 0xffffff,
  roughness: 0.85
})

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xd6d2c9,
    roughness: 1
  })


  // ======================================================
  // SALLE 1 — SOL
  // ======================================================

  const floor1 = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.2, depth),
    floorMaterial
  )

  floor1.position.set(0, -0.1, 0)
  floor1.receiveShadow = true
  scene.add(floor1)


  // ======================================================
  // SALLE 1 — MUR GAUCHE
  // ======================================================

  const leftWall1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, height, depth),
    wallMaterial
  )

  leftWall1.position.set(-width / 2, height / 2, 0)
  leftWall1.receiveShadow = true
  scene.add(leftWall1)


  // ======================================================
  // SALLE 1 — MUR DROIT
  // ======================================================

  const rightWall1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, height, depth),
    wallMaterial
  )

  rightWall1.position.set(width / 2, height / 2, 0)
  rightWall1.receiveShadow = true
  scene.add(rightWall1)


  // ======================================================
  // SALLE 1 — MUR DU FOND AVEC OUVERTURE
  // ======================================================

  // Partie gauche
  const backLeft = new THREE.Mesh(
    new THREE.BoxGeometry(13, height, 0.2),
    wallMaterial
  )

  backLeft.position.set(-8.5, height / 2, -depth / 2)
  scene.add(backLeft)


  // Partie droite
  const backRight = new THREE.Mesh(
    new THREE.BoxGeometry(13, height, 0.2),
    wallMaterial
  )

  backRight.position.set(8.5, height / 2, -depth / 2)
  scene.add(backRight)


  // ======================================================
  // SALLE 1 — PLAFOND
  // ======================================================

  const ceiling1 = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.2, depth),
    ceilingMaterial
  )

  ceiling1.position.set(0, height, 0)
  scene.add(ceiling1)


  // ======================================================
  // SALLE 2 — SOL
  // ======================================================

  const floor2 = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.2, depth),
    floorMaterial
  )

  floor2.position.set(0, -0.1, -20)
  floor2.receiveShadow = true
  scene.add(floor2)


  // ======================================================
  // SALLE 2 — MUR GAUCHE
  // ======================================================

  const leftWall2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, height, depth),
    wallMaterial
  )

  leftWall2.position.set(-width / 2, height / 2, -20)
  leftWall2.receiveShadow = true
  scene.add(leftWall2)


  // ======================================================
  // SALLE 2 — MUR DROIT
  // ======================================================

  const rightWall2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, height, depth),
    wallMaterial
  )

  rightWall2.position.set(width / 2, height / 2, -20)
  rightWall2.receiveShadow = true
  scene.add(rightWall2)


  // ======================================================
  // SALLE 2 — MUR DU FOND
  // ======================================================

  const backWall2 = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, 0.2),
    wallMaterial
  )

  backWall2.position.set(0, height / 2, -30)
  backWall2.receiveShadow = true
  scene.add(backWall2)


  // ======================================================
  // SALLE 2 — PLAFOND
  // ======================================================

  const ceiling2 = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.2, depth),
    ceilingMaterial
  )

  ceiling2.position.set(0, height, -20)
  scene.add(ceiling2)

}