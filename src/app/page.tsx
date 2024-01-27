'use client'

import './style.css'
import { useEffect } from 'react';
import {Render} from '@/three/setup/Render'
import MobileControls from '@/components/MobileControls';

export default function Home() {


  useEffect(() => {
    const render = Render.getInstance()
    render.loop()
  }, []);


  return (
    <main className="main relative" >
      <canvas id="three" className='absolute -z-10'></canvas>
      <MobileControls />
    </main>
  );
}
