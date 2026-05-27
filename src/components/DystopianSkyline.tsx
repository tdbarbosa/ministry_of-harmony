import { useEffect, useRef } from 'react';

interface SkylineProps {
  isHacked: boolean;
  glitchActive: boolean;
  resonanceFreq: number; // 100 to 1000 Hz, with 444Hz as key sweet-spot
}

export default function DystopianSkyline({ isHacked, glitchActive, resonanceFreq }: SkylineProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // relative to window
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Resize observer to dynamic resize canvas without losing scale
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Interactive assets
    // Particles
    const particlesCount = 120;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      colorFactor: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.4 - 0.1, // gently float upward
        alpha: Math.random() * 0.5 + 0.1,
        colorFactor: Math.random(),
      });
    }

    // Rain
    const rainCount = 150;
    const raindrops: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < rainCount; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        length: Math.random() * 25 + 10,
        speed: Math.random() * 15 + 12,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    // Brutalist Towers definition
    // We place 4 main towers spaced across the canvas
    const towers = [
      { xFactor: 0.18, heightFactor: 0.75, widthFactor: 0.06, subTowers: true, pulse: 0 },
      { xFactor: 0.42, heightFactor: 0.85, widthFactor: 0.07, mainEmiter: true, pulse: 0.2 },
      { xFactor: 0.65, heightFactor: 0.70, widthFactor: 0.05, subTowers: false, pulse: 0.5 },
      { xFactor: 0.82, heightFactor: 0.80, widthFactor: 0.06, subTowers: true, pulse: 0.8 },
    ];

    let globalTime = 0;

    // Render loop
    const render = () => {
      globalTime += 0.005;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Color Palette shifting
      // Normal: Black base, deep crimson towers, intense red energy
      // Unlocked/Hacked: Deep charcoal blue background, high-contrast gold/amber towers and glorious gold rays
      const targetBgColor = isHacked ? [10, 10, 14] : [4, 4, 6]; // RGB
      const baseWaveColor = isHacked ? [195, 155, 52] : [139, 0, 0]; // Gold vs Red
      
      // Clear with very slight transparency to leave beautiful trails (blooming smoke effect)
      ctx.fillStyle = `rgba(${targetBgColor[0]}, ${targetBgColor[1]}, ${targetBgColor[2]}, 0.22)`;
      ctx.fillRect(0, 0, width, height);

      // 1. DISTANT CLOUDS & FOG (Layer depth)
      ctx.fillStyle = isHacked 
        ? `rgba(195, 155, 52, ${0.015 + Math.sin(globalTime * 2) * 0.005})`
        : `rgba(139, 0, 0, ${0.012 + Math.sin(globalTime * 3) * 0.004})`;
      ctx.beginPath();
      ctx.arc(width * 0.3, height * 0.4, 250 + Math.sin(globalTime) * 100, 0, Math.PI * 2);
      ctx.arc(width * 0.7, height * 0.5, 300 + Math.cos(globalTime * 0.8) * 120, 0, Math.PI * 2);
      ctx.fill();

      // Subtle lightning spikes in normal or gold flash in hacked
      if (Math.random() > 0.993) {
        ctx.fillStyle = isHacked 
          ? 'rgba(255, 235, 180, 0.08)' 
          : 'rgba(255, 100, 100, 0.06)';
        ctx.fillRect(0, 0, width, height);
      }

      // 2. TOWERS AND PULSES (The Transmitter Array)
      towers.forEach((tower) => {
        const towerX = tower.xFactor * width;
        const towerW = tower.widthFactor * width;
        const towerH = (1 - tower.heightFactor) * height; // Top of the tower
        const hReal = height - towerH;

        // Apply mouse-based parallax
        const parallaxOffsetX = ((mouseRef.current.x - width / 2) / width) * (tower.heightFactor * 15);
        const drawX = towerX + parallaxOffsetX;

        // Draw the concrete tower shadow structure
        const grad = ctx.createLinearGradient(drawX, towerH, drawX + towerW, height);
        if (isHacked) {
          grad.addColorStop(0, '#1c1c22');
          grad.addColorStop(0.5, '#16161c');
          grad.addColorStop(1, '#0c0c10');
        } else {
          grad.addColorStop(0, '#150606');
          grad.addColorStop(0.5, '#0e0404');
          grad.addColorStop(1, '#040202');
        }
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(drawX + towerW * 0.1, towerH);
        ctx.lineTo(drawX + towerW * 0.9, towerH);
        ctx.lineTo(drawX + towerW, height);
        ctx.lineTo(drawX, height);
        ctx.fill();

        // Tower brutalist architectural details (vertical light ribbons)
        ctx.strokeStyle = isHacked ? 'rgba(195, 155, 52, 0.15)' : 'rgba(139, 0, 0, 0.2)';
        ctx.lineWidth = 1;
        for (let j = 0.25; j <= 0.75; j += 0.25) {
          ctx.beginPath();
          ctx.moveTo(drawX + towerW * j, towerH + 20);
          ctx.lineTo(drawX + towerW * j, height);
          ctx.stroke();
        }

        // Horizontal hazard lights
        const blinking = Math.floor(globalTime * 50) % 10 === 0;
        ctx.fillStyle = blinking 
          ? (isHacked ? '#e2ba4e' : '#ff3333') 
          : (isHacked ? '#5c4114' : '#5a0000');
        ctx.beginPath();
        ctx.arc(drawX + towerW * 0.5, towerH + 5, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw concentric soundwaves originating from tower tip
        if (tower.mainEmiter || tower.subTowers) {
          const wavePulse = (globalTime * 0.75 + tower.pulse) % 1.0;
          const maxRadius = tower.mainEmiter ? width * 0.35 : width * 0.2;
          const r = wavePulse * maxRadius;
          const alpha = (1 - wavePulse) * (tower.mainEmiter ? 0.35 : 0.2);

          ctx.strokeStyle = `rgba(${baseWaveColor[0]}, ${baseWaveColor[1]}, ${baseWaveColor[2]}, ${alpha})`;
          ctx.lineWidth = tower.mainEmiter ? 2.5 : 1.5;
          ctx.beginPath();
          // Arc emitted upward/outward
          ctx.arc(drawX + towerW * 0.5, towerH, r, Math.PI, Math.PI * 2);
          ctx.stroke();

          // In hacked mode, show sacred cross or soundwaves pulsing inside chapel ruins under the main tower
          if (tower.mainEmiter && isHacked) {
            // Golden beams shooting upwards
            const beamGrad = ctx.createLinearGradient(drawX + towerW*0.5, towerH, drawX + towerW*0.5, 0);
            beamGrad.addColorStop(0, 'rgba(195, 155, 52, 0.4)');
            beamGrad.addColorStop(1, 'rgba(195, 155, 52, 0)');
            ctx.fillStyle = beamGrad;
            ctx.beginPath();
            ctx.moveTo(drawX + towerW * 0.3, towerH);
            ctx.lineTo(drawX + towerW * 0.5 - 40, 0);
            ctx.lineTo(drawX + towerW * 0.5 + 40, 0);
            ctx.lineTo(drawX + towerW * 0.7, towerH);
            ctx.fill();
          }
        }
      });

      // 3. SECRETS OF STONE (Hidden crosses / ciphers embedded in fog)
      // If user holds a certain frequency, show sacred geometric motifs subtly breaking out
      if (Math.abs(resonanceFreq - 444) < 15 || isHacked) {
        ctx.strokeStyle = `rgba(195, 155, 52, ${isHacked ? 0.2 : 0.08})`;
        ctx.lineWidth = 1.5;
        // Drawing an elegant ancient cross surrounded by a musical circle (symbolizing broken altars)
        const crossX = width * 0.5;
        const crossY = height * 0.45;
        
        ctx.beginPath();
        // Circle
        ctx.arc(crossX, crossY, 60, 0, Math.PI * 2);
        // Vertical line
        ctx.moveTo(crossX, crossY - 90);
        ctx.lineTo(crossX, crossY + 90);
        // Horizontal line
        ctx.moveTo(crossX - 50, crossY - 25);
        ctx.lineTo(crossX + 50, crossY - 25);
        // Break lines (symbolizing broken chains)
        ctx.stroke();

        ctx.fillStyle = `rgba(195, 155, 52, ${isHacked ? 0.25 : 0.08})`;
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AUDIOSFREE // FREQ 444 HZ', crossX, crossY + 115);
        ctx.fillText('THE ALTARS SHAKE', crossX, crossY - 110);
      }

      // 4. FLOATING PARTICLES (Hover Interactive)
      particles.forEach((p) => {
        // float particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Interaction: particles get minor push or pull based on mouse
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        // boundaries loop
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        const opacity = p.alpha * (isHacked ? 1.0 : 0.7);
        ctx.fillStyle = isHacked
          ? `rgba(226, 186, 78, ${opacity})` // Beautiful gold particles
          : `rgba(180, 50, 50, ${opacity})`; // Crimson/red ember particles

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. DISTANT HEAVY RAIN
      ctx.strokeStyle = isHacked ? 'rgba(195, 155, 52, 0.08)' : 'rgba(150, 150, 200, 0.08)';
      ctx.lineWidth = 1;
      raindrops.forEach((r) => {
        r.y += r.speed;
        r.x += Math.sin(globalTime * 0.1) * 0.5; // slight wind

        if (r.y > height) {
          r.y = Math.random() * -100;
          r.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x + Math.sin(globalTime * 0.1) * 2, r.y + r.length);
        ctx.stroke();
      });

      // 6. ANALOG STATIC / INTERACTION GLITCH
      if (glitchActive || (Math.random() > 0.995 && !isHacked)) {
        // Draw dramatic analog tracking lines distortion
        const lineCount = Math.floor(Math.random() * 5) + 2;
        ctx.fillStyle = isHacked ? 'rgba(195, 155, 52, 0.15)' : 'rgba(139, 0, 0, 0.18)';
        for (let i = 0; i < lineCount; i++) {
          const y = Math.random() * height;
          const h = Math.random() * 25 + 5;
          ctx.fillRect(0, y, width, h);
        }

        // Horizontal visual offset glitch (slice copy paste)
        if (Math.random() > 0.3) {
          const sliceY = Math.random() * height;
          const sliceH = Math.random() * 60 + 20;
          const offset = (Math.random() - 0.5) * 40;
          ctx.drawImage(canvas, 0, sliceY, width, sliceH, offset, sliceY, width, sliceH);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isHacked, glitchActive, resonanceFreq]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic noise layer */}
      <div className="grain" />
      
      {/* Main interactive sky canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Vignette Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,4,0.7)_100%)] pointer-events-none" />
    </div>
  );
}
