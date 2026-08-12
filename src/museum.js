import * as THREE from 'three'


export function createMuseum(scene) {

  // ======================================================
  // DIMENSIONS
  // ======================================================

  const width = 30
  const depth = 20
  const height = 8


  // ======================================================
  // MATÉRIAUX
  // ======================================================

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8d5cc,
    roughness: 0.8
  })

  const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xb9aa88,
    roughness: 0.9
  })

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xbdbdbd,
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