'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as fal from "@fal-ai/serverless-client";
import Image from 'next/image';
import P5Block from './p5block'; // Make sure this path matches the location of your P5Block component

fal.config({
  proxyUrl: "/api/fal/proxy",
});

 const seed = 110602490;
// const seed = Math.floor(Math.random() * 100000);

export default function Home() {
  const [input, setInput] = useState('3D, black background, dramatic light, impossible organic architectures of water, oil and light and strange colors');
  // const [input, setInput] = useState('3D, balck background, dramatic light, complex system, liquid light, hight dimensional spaces, non euclidian, meta abstraction,  blackhole,  internal sun neuron, morphing black and white, networks');
  const [strength, setStrength] = useState(0.75);
  const [image, setImage] = useState(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => { setIsClient(true) }, []);

  const { send } = fal.realtime.connect('110602490-sdxl-turbo-realtime', {
    connectionKey: 'fal-ai/fast-lightning-sdxl',
    onResult(result) {
      if (result.error) return;
      setImage(result.images[0].url);
    }
  });

  const captureAndSendImage = useCallback(async () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const image_url = canvas.toDataURL();
      send({
        sync_mode: true,
        strength: strength,
        seed: seed,
        prompt: input,
        image_url: image_url
      });
    }
  }, [strength, input, send]); // captureAndSendImage's dependencies

  useEffect(() => {
    if (isClient) {
      const interval = setInterval(() => {
        captureAndSendImage();
      }, 100); // Automatically capture and send image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isClient, captureAndSendImage]); // useEffect's dependencies, including captureAndSendImage

  return (
    <main className="p-12">
      <p className="text-xl mb-2">Perlin Noise in Latent Space</p>
      <p className="text-xl mb-2">Generative P5 Sketch + Fal SDXL Turbo | concept and programming by Marlon Barrios Solano</p>
      {/* <input
        className='border rounded-lg p-2 w-full mb-2'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      /> */}
      <div className="mb-4">
        {/* <label htmlFor="strengthSlider" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Strength: {strength}</label> */}
        {/* <input
          id="strengthSlider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={strength}
          onChange={(e) => setStrength(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        /> */}
      </div>
      <div className='flex'>
        <div className="w-[600px] h-[600px]">
          {isClient && (
            <P5Block />
          )}
        </div>
        {image && (
          <Image
            src={image}
            width={600}
            height={600}
            alt='Generated Image'
          />
        )}
      </div>
    </main>
  );
}
