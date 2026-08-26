import * as THREE from 'three'

export function createGalleryLights(scene) {

  // ==========================================
  // LUMIÈRE AMBIANTE
  // ==========================================

  const ambient = new THREE.AmbientLight(
    0xfff8ed,
    0.60
  )

  scene.add(ambient)


  // ==========================================
  // ÉCLAIRAGE GÉNÉRAL
  // ==========================================

  const ceilingLight = new THREE.HemisphereLight(
    0xfff5e6,   // lumière chaude venant du plafond
    0x918a7c,   // lumière réfléchie par le sol
    0.55
  )

  scene.add(ceilingLight)


  // ==========================================
  // LUMIÈRE DOUCE DU PLAFOND
  // ==========================================

  /* const centralLight = new THREE.PointLight(
    0xffe8c8,
    7,
    25,
    1.5
  )

  centralLight.position.set(
    0,
    7,
    -6
  )

  scene.add(centralLight) */


  // ==========================================
  // SALLE 1
  // ==========================================

  const paintingsRoom1 = [
    -12,
    -7.6,
    -4,
     4,
     8,
     12.5
  ]

  paintingsRoom1.forEach((x) => {

    const spot = new THREE.SpotLight(
      0xffead0,
      10,
      22,
      Math.PI / 6,
      0.92,
      1.2
    )

    // Projecteur au plafond
    spot.position.set(
      x,
      7,
      -4.5
    )

    // Zone éclairée sur le mur
    spot.target.position.set(
      x,
      3.5,
      -7.9
    )

    scene.add(spot)
    scene.add(spot.target)
  })


// ==========================================
// SALLE 1 — MURS LATÉRAUX
// ==========================================

const leftWallPaintingsRoom1 = [
  { z: -5.6, y: 3.4 },
  { z: -1.8, y: 3.4 },
  { z: 1.6, y: 3.4 }
]

leftWallPaintingsRoom1.forEach(({ z, y }) => {
  const spot = new THREE.SpotLight(
    0xffead0,
    7,
    13,
    Math.PI / 7,
    0.92,
    1.2
  )

  spot.position.set(-11.7, 7, z)
  spot.target.position.set(-14.7, y, z)

  scene.add(spot)
  scene.add(spot.target)
})

const rightWallPaintingsRoom1 = [
  { z: -5.6, y: 3.4 },
  { z: -1.8, y: 3.4 },
  { z: 2.8, y: 4 }
]

rightWallPaintingsRoom1.forEach(({ z, y }) => {
  const spot = new THREE.SpotLight(
    0xffead0,
    7,
    13,
    Math.PI / 7,
    0.92,
    1.2
  )

  spot.position.set(11.7, 7, z)
  spot.target.position.set(14.7, y, z)

  scene.add(spot)
  scene.add(spot.target)
})

  // ==========================================
  // SALLE 2
  // ==========================================

  const paintingsRoom2 = [
    -12,
    -8,
    -4,
     0,
     4,
     8
  ]

  paintingsRoom2.forEach((x) => {

    const spot = new THREE.SpotLight(
      0xffead0,
      10,
      22,
      Math.PI / 6,
      0.92,
      1.2
    )

    // Projecteur au plafond
    spot.position.set(
      x,
      7,
      -24.5
    )

    // Cible sur le mur
    spot.target.position.set(
      x,
      3.5,
      -29.7
    )

    scene.add(spot)
    scene.add(spot.target)
  })


  /* // ==========================================
  // LUMIÈRE DU PASSAGE ENTRE LES SALLES
  // ==========================================

  const corridorLight = new THREE.PointLight(
    0xffe8c8,
    5,
    12,
    1.5
  )

  corridorLight.position.set(
    0,
    5,
    -16
  )

  scene.add(corridorLight) */
}