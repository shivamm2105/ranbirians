import React, { useEffect, useRef } from 'react';

export default function BackgroundParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor((width * height) / 12000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(251, 191, 36, ' : 'rgba(245, 158, 11, ',
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3 - 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Soft ambient radial gradient spotlight follow
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        width > 768 ? 600 : 350
      );
      gradient.addColorStop(0, 'rgba(245, 158, 11, 0.07)');
      gradient.addColorStop(0.5, 'rgba(20, 13, 7, 0.02)');
      gradient.addColorStop(1, 'rgba(8, 5, 3, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw floating golden particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        p.alpha += p.pulseSpeed * p.pulseDir;
        if (p.alpha >= 0.85) p.pulseDir = -1;
        if (p.alpha <= 0.15) p.pulseDir = 1;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
