
import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  analyser: AnalyserNode | null;
  active: boolean;
  theme?: 'cyan' | 'red' | 'amber';
}

export const Visualizer: React.FC<VisualizerProps> = ({ analyser, active, theme = 'cyan' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!active) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Darker background for consistency
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        if (theme === 'red') {
            gradient.addColorStop(0, '#ef4444'); // Red 500
            gradient.addColorStop(1, '#7f1d1d'); // Red 900
        } else if (theme === 'amber') {
            gradient.addColorStop(0, '#f59e0b'); // Amber 500
            gradient.addColorStop(1, '#78350f'); // Amber 900
        } else {
            gradient.addColorStop(0, '#22d3ee'); // Cyan 400
            gradient.addColorStop(1, '#06b6d4'); // Cyan 500
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    if (active) {
        draw();
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, active, theme]);

  return (
    <canvas 
        ref={canvasRef} 
        width={600} 
        height={80} 
        className="w-full h-full rounded-lg"
    />
  );
};
