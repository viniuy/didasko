'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min.js';

export default function VantaBackground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x3f6770,
          midtoneColor: 0x1cafb9,
          lowlightColor: 0x443398,
          baseColor: 0xf7f7f7,
          blurFactor: 0.29,
          speed: 0.9,
          zoom: 1.4,
          THREE,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className='absolute inset-0'></div>;
}
