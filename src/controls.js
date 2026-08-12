import * as THREE from 'three'

export function createControls(camera, renderer) {

    const keys = {
        forward: false,
        backward: false,
        left: false,
        right: false
    }

    // =====================================================
    // CLAVIER — Mac
    // =====================================================

    document.addEventListener('keydown', (event) => {

        switch (event.code) {

            case 'KeyW':
            case 'KeyZ':
                keys.forward = true
                break

            case 'KeyS':
                keys.backward = true
                break

            case 'KeyA':
            case 'KeyQ':
                keys.left = true
                break

            case 'KeyD':
                keys.right = true
                break
        }
    })

    document.addEventListener('keyup', (event) => {

        switch (event.code) {

            case 'KeyW':
            case 'KeyZ':
                keys.forward = false
                break

            case 'KeyS':
                keys.backward = false
                break

            case 'KeyA':
            case 'KeyQ':
                keys.left = false
                break

            case 'KeyD':
                keys.right = false
                break
        }
    })


    // =====================================================
    // CONTRÔLE TACTILE
    // =====================================================

    let touchStartX = 0
    let touchStartY = 0

    renderer.domElement.addEventListener(
        'touchstart',
        (event) => {

            if (event.touches.length !== 1) return

            touchStartX = event.touches[0].clientX
            touchStartY = event.touches[0].clientY
        },
        { passive: true }
    )


    renderer.domElement.addEventListener(
        'touchmove',
        (event) => {

            if (event.touches.length !== 1) return

            const touch = event.touches[0]

            const deltaX = touch.clientX - touchStartX
            const deltaY = touch.clientY - touchStartY

            // Sensibilité
            const sensitivity = 0.003

            // Rotation horizontale
            camera.rotation.y -= deltaX * sensitivity

            // Rotation verticale
            camera.rotation.x -= deltaY * sensitivity

            // Limite verticale
            camera.rotation.x = THREE.MathUtils.clamp(
                camera.rotation.x,
                -Math.PI / 3,
                Math.PI / 3
            )

            touchStartX = touch.clientX
            touchStartY = touch.clientY

            event.preventDefault()
        },
        { passive: false }
    )


    // =====================================================
// BOUTONS AVANCER / RECULER
// =====================================================

function createMoveButton(symbol, bottom, direction) {

    const button = document.createElement('button')

    button.textContent = symbol

    button.style.position = 'fixed'
    button.style.bottom = bottom + 'px'
    button.style.left = '50%'
    button.style.transform = 'translateX(-50%)'

    button.style.width = '65px'
    button.style.height = '65px'

    button.style.borderRadius = '50%'
    button.style.border = 'none'

    button.style.background = 'rgba(255,255,255,0.7)'
    button.style.fontSize = '28px'

    button.style.zIndex = '1000'

    document.body.appendChild(button)


    button.addEventListener(
        'touchstart',
        (event) => {

            keys[direction] = true

            event.preventDefault()
        },
        { passive: false }
    )


    button.addEventListener(
        'touchend',
        (event) => {

            keys[direction] = false

            event.preventDefault()
        },
        { passive: false }
    )


    button.addEventListener(
        'touchcancel',
        () => {

            keys[direction] = false

        }
    )
}


// Avancer
createMoveButton('▲', 105, 'forward')

// Reculer
createMoveButton('▼', 30, 'backward')

    // =====================================================
    // DÉPLACEMENT
    // =====================================================

    function update() {

        const speed = 0.08

        if (keys.forward) {

            camera.translateZ(-speed)

        }

        if (keys.backward) {

            camera.translateZ(speed)

        }

        if (keys.left) {

            camera.translateX(-speed)

        }

        if (keys.right) {

            camera.translateX(speed)

        }


        // =================================================
        // LIMITES DE LA SALLE
        // =================================================

        camera.position.x = THREE.MathUtils.clamp(
            camera.position.x,
            -13,
            13
        )

        camera.position.z = THREE.MathUtils.clamp(
            camera.position.z,
            -26.5,
            13
        )


        // Hauteur des yeux
        camera.position.y = 1.7
    }


    return {
        update
    }
}