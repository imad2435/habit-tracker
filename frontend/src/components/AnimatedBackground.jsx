import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

function AnimatedBackground() {
  const particlesInit = useCallback(async (engine) => {
    // This loads the tsparticles package bundle
    await loadSlim(engine);
  }, []);

  const options = {
    background: {
      color: {
        value: '#0d1117', // A dark slate/almost black
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: false, // We don't want lines connecting stars
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'out',
        },
        random: true,
        speed: 0.1, // Very slow, gentle drift
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 120, // Number of particles
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" init={particlesInit} options={options} />;
}

export default AnimatedBackground;