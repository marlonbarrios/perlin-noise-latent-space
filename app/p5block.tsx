import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch: Sketch = (p5) => {
  let xoff = 0; // Offset for x in noise space
  let yoff = 10000; // Offset for y in noise space
  let radiusOff = 3000; // Offset for radius in noise space
  let speedXOff = 40000; // Offset for x speed in noise space
  let speedYOff = 50000; // Offset for y speed in noise space
  let prevMouseX = -1; // Previous mouse X position
  let prevMouseY = -1; // Previous mouse Y position

  p5.setup = () => {
    p5.createCanvas(600, 600);
    p5.noiseDetail(0.80, 24); // Adjust noise detail for more complex patterns
  };

  p5.draw = () => {
    p5.background(0, 5);
    p5.fill(255);
    p5.noStroke();

    // Calculate dynamic speed based on Perlin noise
    let speedX = p5.map(p5.noise(speedXOff), 0, 1, 0.005, 0.03);
    let speedY = p5.map(p5.noise(speedYOff), 0, 1, 0.005, 0.03);

    // Default Perlin noise-driven position, modified by dynamic speed
    let x = p5.map(p5.noise(xoff), 0, 1, 0, p5.width) * 2;
    let y = p5.map(p5.noise(yoff), 0, 1, 0, p5.height) * 2;

    // Use noise to determine the radius size dynamically
    let radius = p5.map(p5.noise(radiusOff), 0, 1, 5, 80); // Map noise value to a radius between 5 and 80

    // If mouse has moved significantly, use mouse position instead
    if (p5.dist(p5.mouseX, p5.mouseY, prevMouseX, prevMouseY) > 1) {
      x = p5.mouseX;
      y = p5.mouseY;
      prevMouseX = p5.mouseX; // Update previous mouse X
      prevMouseY = p5.mouseY; // Update previous mouse Y
    }

    // Increment offsets for the next frame, influenced by dynamic speed
    xoff += speedX;
    yoff += speedY;
    radiusOff += 0.04; // Continue to increment radius offset at a constant rate
    speedXOff += 0.01; // Increment speed offsets to vary speed over time
    speedYOff += 0.01;

    // Draw the circle at the new position with the dynamic radius
    p5.circle(x, y, radius * 2); // Diameter is twice the radius
  };
};

export default function p5block() {
  return <NextReactP5Wrapper sketch={sketch} />;
}
