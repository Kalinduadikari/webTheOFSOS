import React, { useRef, useState } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/threeModel/scene.gltf');
  const mesh = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0.6); // set initial rotation speed

  const deceleration = 0.005; // Deceleration rate
  const normalSpeed = 0.002; // Normal speed

  useFrame(() => {
    if (mesh.current) {
      // Decrease speed
      if (rotationSpeed > normalSpeed) {
        setRotationSpeed(prevSpeed => prevSpeed - deceleration);
      } else if (rotationSpeed < normalSpeed) {
        setRotationSpeed(normalSpeed);
      }
      mesh.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group position={[0, -0.8, 0]}> {/* Adjust the Y position here */}
      <primitive
        ref={mesh}
        object={gltf.scene}
        scale={[3.2, 3.2, 3.2]}
        dispose={null}
      />
    </group>
  );
};

export default Model;
