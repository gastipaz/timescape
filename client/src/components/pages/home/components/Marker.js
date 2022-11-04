import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import './../Home.css'

const Marker = () => {

    function Model(props) {
        const ref = useRef();
        
        useFrame( ({clock}) => {
            ref.current.rotation.y = clock.getElapsedTime() / 5; 
        })

        const { nodes, materials } = useGLTF("/marker.gltf");
        return (
            <group ref={ref} {...props} dispose={null}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes["660011-location-512"].geometry}
                    material={materials["Material.001"]}
                    position={[0.0, 1.55, 0.0]}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={[0.03, 0.03, 0.03]}
                />
            </group>
        );
    }

    return (
        <div className='canvas'>
            <Canvas shadows>
                <Suspense fallback={null}>
                    <ambientLight/>
                    <spotLight intensity={0.9} angle={3} penumbra={3} position={[10,15,10]} castShadow/>
                    <OrbitControls enableRotate={true} enablePan={false} enableZoom={false}/>
                    <Model/>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Marker

