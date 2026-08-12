// ======================================================
// Galerie Coco V1
// materials.js
// Tous les matériaux du musée sont définis ici.
// ======================================================

import * as THREE from "three";

// ------------------------------------------------------
// Sol - parquet clair
// ------------------------------------------------------

export const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9c7a3,
    roughness: 0.75,
    metalness: 0.0
});

// ------------------------------------------------------
// Murs
// ------------------------------------------------------

export const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xf6f3ed,
    roughness: 0.92,
    metalness: 0
});

// ------------------------------------------------------
// Plafond
// ------------------------------------------------------

export const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 1
});

// ------------------------------------------------------
// Plinthes
// ------------------------------------------------------

export const baseboardMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    roughness: 0.8
});

// ------------------------------------------------------
// Encadrement des tableaux
// ------------------------------------------------------

export const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.45,
    metalness: 0.15
});

// ------------------------------------------------------
// Cartels
// ------------------------------------------------------

export const labelMaterial = new THREE.MeshStandardMaterial({
    color: 0xfafafa,
    roughness: 1
});