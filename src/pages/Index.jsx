import React, { useRef, useEffect } from "react";
import { Box, Heading, Container } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);

  const drawMandelbrot = (ctx, width, height) => {
    const maxIter = 1000;
    const panX = 1.5;
    const panY = 1.0;
    const zoom = 150;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let mx = (x - width / 2) / zoom - panX;
        let my = (y - height / 2) / zoom - panY;
        let ca = mx;
        let cb = my;
        let a = 0;
        let b = 0;
        let iter = 0;

        while (iter < maxIter) {
          const aa = a * a;
          const bb = b * b;
          const twoab = 2.0 * a * b;
          a = aa - bb + ca;
          b = twoab + cb;
          if (aa + bb > 16.0) {
            break;
          }
          iter++;
        }

        const color = iter === maxIter ? "black" : `hsl(0, 100%, ${iter % 100}%)`;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    drawMandelbrot(context, width, height);
  }, []);

  return (
    <Container centerContent>
      <Heading my="8">Mandelbrot Set</Heading>
      <Box border="1px" borderColor="gray.200" boxShadow="md" bg="white">
        <canvas ref={canvasRef} width="600" height="400"></canvas>
      </Box>
    </Container>
  );
};

export default Index;
