import * as THREE from 'three'

export function createGalleryLights(scene) {

  // ==========================================
  // LUMIÈRE AMBIANTE
  // ==========================================

  const ambient = new THREE.AmbientLight(
    0xffffff,
    0.45
  )

  scene.add(ambient)


  // ==========================================
  // ÉCLAIRAGE GÉNÉRAL
  // ==========================================

  const ceilingLight = new THREE.HemisphereLight(
    0xffffff,
    0x777777,
    0.35
  )

  scene.add(ceilingLight)


  // ==========================================
  // SALLE 1
  // ==========================================

  const paintingsRoom1 = [
    -8,
    -4,
     0,
     4,
     8
  ]

  paintingsRoom1.forEach((x) => {

    const spot = new THREE.SpotLight(
      0xfff8ed,
      18,
      15,
      Math.PI / 7,
      0.65,
      2
    )

    spot.position.set(
      x,
      7,
      -4.5
    )

    spot.target.position.set(
      x,
      3,
      -7.9
    )

    scene.add(spot)
    scene.add(spot.target)
  })


  // ==========================================
  // SALLE 2
  // ==========================================

  const paintingsRoom2 = [
    -8,
    -4,
     0,
     4,
     8
  ]

  paintingsRoom2.forEach((x) => {

    const spot = new THREE.SpotLight(
      0xfff8ed,
      18,
      15,
      Math.PI / 7,
      0.65,
      2
    )

    // Projecteur au-dessus du tableau
    spot.position.set(
      x,
      7,
      -24.5
    )

    // Cible sur le tableau
    spot.target.position.set(
      x,
      3.4,
      -29.7
    )

    scene.add(spot)
    scene.add(spot.target)
  })

}