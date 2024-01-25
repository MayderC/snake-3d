'use client'
import './style.css'
import { useEffect } from 'react';
import {Render} from '@/three/setup/Render'

export default function Home() {


  useEffect(() => {
    const render = Render.getInstance()
    render.loop()
  }, []);


  return (
    <main className="main" >
      <canvas id="three"></canvas>
    </main>
  );
}
