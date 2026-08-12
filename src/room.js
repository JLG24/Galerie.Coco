// ======================================================
// Galerie Coco V1
// room.js  (Version 2)
// ======================================================

import * as THREE from "three";

import {
    floorMaterial,
    wallMaterial,
    ceilingMaterial,
    baseboardMaterial
} from "./materials.js";

export function createRoom({
    width = 20,
    depth = 20,
    height = 6,
    wallThickness = 0.25,
    doorLeft = false,
    doorRight = false
} = {}) {

    const room = new THREE.Group();

    //--------------------------------------------------
    // SOL
    //--------------------------------------------------

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(width, depth),
        floorMaterial
    );

    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    room.add(floor);

    //--------------------------------------------------
    // PLAFOND
    //--------------------------------------------------

    const ceiling = new THREE.Mesh(
        new THREE.PlaneGeometry(width, depth),
        ceilingMaterial
    );

    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = height;
    room.add(ceiling);

    //--------------------------------------------------
    // MUR FOND
    //--------------------------------------------------

    room.add(createHorizontalWall(
        width,
        height,
        wallThickness,
        0,
        height / 2,
        -depth / 2
    ));

    //--------------------------------------------------
    // MUR AVANT
    //--------------------------------------------------

    room.add(createHorizontalWall(
        width,
        height,
        wallThickness,
        0,
        height / 2,
        depth / 2
    ));

    //--------------------------------------------------
    // MUR GAUCHE
    //--------------------------------------------------

    if (doorLeft) {

        createDoorWall(
            room,
            -width / 2,
            depth,
            height,
            wallThickness
        );

    } else {

        room.add(createVerticalWall(
            depth,
            height,
            wallThickness,
            -width / 2,
            height / 2,
            0
        ));

    }

    //--------------------------------------------------
    // MUR DROIT
    //--------------------------------------------------

    if (doorRight) {

        createDoorWall(
            room,
            width / 2,
            depth,
            height,
            wallThickness
        );

    } else {

        room.add(createVerticalWall(
            depth,
            height,
            wallThickness,
            width / 2,
            height / 2,
            0
        ));

    }

    //--------------------------------------------------
    // PLINTHES
    //--------------------------------------------------

    createBaseboards(room, width, depth);

    return room;
}

//======================================================

function createHorizontalWall(w, h, e, x, y, z) {

    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, e),
        wallMaterial
    );

    wall.position.set(x, y, z);

    return wall;
}

//======================================================

function createVerticalWall(d, h, e, x, y, z) {

    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(e, h, d),
        wallMaterial
    );

    wall.position.set(x, y, z);

    return wall;
}

//======================================================
// Mur avec grande ouverture
//======================================================

function createDoorWall(room, x, depth, height, thickness) {

    const doorWidth = 5;
    const doorHeight = 3;

    const side = (depth - doorWidth) / 2;

    // Partie avant

    const front = new THREE.Mesh(
        new THREE.BoxGeometry(
            thickness,
            height,
            side
        ),
        wallMaterial
    );

    front.position.set(
        x,
        height / 2,
        -depth / 2 + side / 2
    );

    room.add(front);

    // Partie arrière

    const back = front.clone();

    back.position.z =
        depth / 2 - side / 2;

    room.add(back);

    // Linteau

    const lintel = new THREE.Mesh(
        new THREE.BoxGeometry(
            thickness,
            height - doorHeight,
            doorWidth
        ),
        wallMaterial
    );

    lintel.position.set(
        x,
        doorHeight + (height - doorHeight) / 2,
        0
    );

    room.add(lintel);
}

//======================================================

function createBaseboards(room, width, depth) {

    const h = 0.12;
    const e = 0.08;

    const longBoard =
        new THREE.BoxGeometry(width, h, e);

    const shortBoard =
        new THREE.BoxGeometry(e, h, depth);

    const b1 = new THREE.Mesh(
        longBoard,
        baseboardMaterial
    );

    b1.position.set(
        0,
        h / 2,
        -depth / 2 + e / 2
    );

    room.add(b1);

    const b2 = b1.clone();
    b2.position.z = depth / 2 - e / 2;
    room.add(b2);

    const b3 = new THREE.Mesh(
        shortBoard,
        baseboardMaterial
    );

    b3.position.set(
        -width / 2 + e / 2,
        h / 2,
        0
    );

    room.add(b3);

    const b4 = b3.clone();
    b4.position.x = width / 2 - e / 2;
    room.add(b4);
}