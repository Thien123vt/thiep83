import React, { useEffect, useRef } from 'react';

interface ParticleTextProps {
  text: string;
}

export default function ParticleText({ text }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let isAnimating = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (isAnimating) {
        initParticles();
      }
    };

    class Particle {
      x: number;
      y: number;
      destX: number;
      destY: number;
      vx: number;
      vy: number;
      accX: number;
      accY: number;
      friction: number;
      color: string;
      size: number;
      isStar: boolean;
      angle: number;
      spinSpeed: number;

      constructor(x: number, y: number, destX: number, destY: number, color: string) {
        this.x = x;
        this.y = y;
        this.destX = destX;
        this.destY = destY;
        this.vx = (Math.random() - 0.5) * 30;
        this.vy = (Math.random() - 0.5) * 30;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random() * 0.04 + 0.90; // 0.90 to 0.94 for smooth settling
        this.color = color;
        this.size = Math.random() * 2.5 + 1;
        this.isStar = Math.random() > 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.2;
      }

      drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
      }

      render(ctx: CanvasRenderingContext2D) {
        this.accX = (this.destX - this.x) / 60;
        this.accY = (this.destY - this.y) / 60;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spinSpeed;

        ctx.fillStyle = this.color;
        
        if (this.isStar) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          this.drawStar(ctx, 0, 0, 5, this.size * 2, this.size);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const initParticles = () => {
      particles = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = 'white';
      const fontSize = Math.min(canvas.width / 2.5, 280);
      ctx.font = `bold ${fontSize}px "Playfair Display", serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const textY = canvas.height * 0.35;
      ctx.fillText(text, canvas.width / 2, textY);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Added a warm gold/yellow color for more magical feel
      const colors = ['#ff7eb3', '#ff758c', '#ff8a9d', '#ffb2c1', '#f43f5e', '#fb7185', '#fcd34d'];

      const step = Math.max(Math.floor(canvas.width / 150), 4);
      
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          const alpha = imgData[index + 3];
          if (alpha > 128) {
            const startX = Math.random() * canvas.width * 2 - canvas.width / 2;
            const startY = Math.random() * canvas.height * 2 - canvas.height / 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(startX, startY, x, y, color));
          }
        }
      }
    };

    const animate = () => {
      if (!isAnimating) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffb2c1';
      
      particles.forEach(p => p.render(ctx));
      
      ctx.shadowBlur = 0;
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      isAnimating = false;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}
