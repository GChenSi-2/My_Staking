'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const router = useRouter();

  // Store mutable refs for the animation loop
  const isTransitioningRef = useRef(false);
  const animStateRef = useRef({
    camera: null as any,
    renderer: null as any,
    scene: null as any,
    torusKnot: null as any,
    animId: 0,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    let cancelled = false;

    const initThree = async () => {
      const THREE = await import('three');
      if (cancelled || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const W = window.innerWidth;
      const H = window.innerHeight;

      // ── Scene & Camera ──────────────────────────────────────────
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
      camera.position.set(0, 0, 30);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x050510, 1);

      // ── Star field ──────────────────────────────────────────────
      const starGeo = new THREE.BufferGeometry();
      const starCount = 3500;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 600;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 600;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.35,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75,
      });
      scene.add(new THREE.Points(starGeo, starMat));

      // ── Central torus knot ──────────────────────────────────────
      const torusKnotGeo = new THREE.TorusKnotGeometry(7, 2.2, 160, 20);
      const torusKnotMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        opacity: 0.65,
        transparent: true,
      });
      const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
      scene.add(torusKnot);

      // Inner glowing solid core
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.08,
      });
      const coreGeo = new THREE.TorusKnotGeometry(7, 2.2, 80, 16);
      scene.add(new THREE.Mesh(coreGeo, coreMat));

      // ── Orbiting rings ──────────────────────────────────────────
      const mkRing = (r: number, tube: number, color: number, opacity: number, rx: number, ry: number) => {
        const mesh = new THREE.Mesh(
          new THREE.TorusGeometry(r, tube, 16, 128),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
        );
        mesh.rotation.x = rx;
        mesh.rotation.y = ry;
        return mesh;
      };
      const ring1 = mkRing(15, 0.12, 0x818cf8, 0.45, Math.PI / 3, 0);
      const ring2 = mkRing(20, 0.07, 0xa78bfa, 0.25, Math.PI / 6, Math.PI / 4);
      const ring3 = mkRing(12, 0.08, 0xc4b5fd, 0.3, -Math.PI / 4, Math.PI / 3);
      scene.add(ring1, ring2, ring3);

      // ── Floating validator nodes ────────────────────────────────
      const nodeGroup = new THREE.Group();
      const nodeColors = [0x818cf8, 0xa78bfa, 0x6366f1, 0xc4b5fd, 0x7c3aed];
      for (let i = 0; i < 70; i++) {
        const size = 0.15 + Math.random() * 0.25;
        const geo = Math.random() > 0.5
          ? new THREE.OctahedronGeometry(size, 0)
          : new THREE.TetrahedronGeometry(size, 0);
        const mat = new THREE.MeshBasicMaterial({
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          wireframe: Math.random() > 0.6,
        });
        const node = new THREE.Mesh(geo, mat);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 17 + Math.random() * 10;
        node.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        );
        node.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );
        nodeGroup.add(node);
      }
      scene.add(nodeGroup);

      // ── Store refs ──────────────────────────────────────────────
      animStateRef.current = { camera, renderer, scene, torusKnot, animId: 0 };

      // ── Resize ──────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // ── Animation loop ──────────────────────────────────────────
      let t = 0;
      let transitionProgress = 0;

      const animate = () => {
        const id = requestAnimationFrame(animate);
        animStateRef.current.animId = id;
        t += 0.005;

        if (isTransitioningRef.current) {
          // Accelerate into the vortex
          transitionProgress = Math.min(transitionProgress + 0.018, 1);
          const ease = transitionProgress * transitionProgress; // ease-in quad

          torusKnot.rotation.x += 0.01 + ease * 0.08;
          torusKnot.rotation.y += 0.015 + ease * 0.12;
          torusKnot.scale.setScalar(1 + ease * 1.8);

          ring1.rotation.z += 0.02 + ease * 0.06;
          ring2.rotation.z -= 0.015 + ease * 0.05;
          ring3.rotation.z += 0.01 + ease * 0.04;

          nodeGroup.rotation.y += 0.015 + ease * 0.05;
          nodeGroup.rotation.x += ease * 0.02;

          // Zoom camera in
          camera.position.z = Math.max(30 - ease * 29, 1);
          camera.position.x *= (1 - ease * 0.1);
          camera.position.y *= (1 - ease * 0.1);
        } else {
          // Normal idle animation
          torusKnot.rotation.x += 0.003;
          torusKnot.rotation.y += 0.005;

          ring1.rotation.z += 0.003;
          ring2.rotation.z -= 0.002;
          ring3.rotation.z += 0.0015;

          nodeGroup.rotation.y += 0.002;
          nodeGroup.rotation.x = Math.sin(t * 0.3) * 0.08;

          // Individual node spin
          nodeGroup.children.forEach((node, i) => {
            (node as any).rotation.y += 0.008 + (i % 3) * 0.004;
            (node as any).rotation.x += 0.005 + (i % 2) * 0.003;
          });

          // Camera gentle drift
          camera.position.x = Math.sin(t * 0.35) * 3;
          camera.position.y = Math.cos(t * 0.25) * 2;
        }

        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
      };
      animate();

      setLoaded(true);

      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animStateRef.current.animId);
        renderer.dispose();
      };
    };

    let disposeThree: (() => void) | void;
    initThree().then(fn => { disposeThree = fn; });

    return () => {
      cancelled = true;
      disposeThree?.();
      cancelAnimationFrame(animStateRef.current.animId);
    };
  }, []);

  const handleEnter = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);
    isTransitioningRef.current = true;
    setTimeout(() => router.push('/dashboard'), 1300);
  }, [transitioning, router]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#050510',
        fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)',
      }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      />

      {/* Gradient vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,16,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 1.6s ease, transform 1.6s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(129,140,248,0.4)',
            borderRadius: 100,
            padding: '6px 16px',
            marginBottom: 28,
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#818cf8',
              boxShadow: '0 0 8px #818cf8',
              display: 'inline-block',
            }}
          />
          <span style={{ color: '#c4b5fd', fontSize: 13, letterSpacing: '0.06em', fontWeight: 500 }}>
            Web3 · Decentralized Staking
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #e0e7ff 0%, #818cf8 40%, #a78bfa 70%, #c4b5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          STAKING
          <br />
          PORTAL
        </h1>

        {/* Divider line */}
        <div
          style={{
            width: 80,
            height: 1,
            background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
            margin: '24px 0',
          }}
        />

        {/* Tagline */}
        <p
          style={{
            margin: 0,
            color: '#94a3b8',
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 400,
          }}
        >
          Secure &nbsp;·&nbsp; Decentralized &nbsp;·&nbsp; Rewarding
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 48,
            marginBottom: 48,
          }}
        >
          {[
            { label: 'Total Staked', value: '$2.4B+' },
            { label: 'Validators', value: '12,000+' },
            { label: 'APY', value: '~12.5%' },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                  fontWeight: 700,
                  color: '#e0e7ff',
                  letterSpacing: '-0.01em',
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 12, color: '#64748b', letterSpacing: '0.08em', marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleEnter}
          style={{
            position: 'relative',
            padding: '14px 44px',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#fff',
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            border: 'none',
            borderRadius: 100,
            cursor: 'pointer',
            boxShadow: '0 0 32px rgba(99,102,241,0.5), 0 0 64px rgba(99,102,241,0.2)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            outline: 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.05)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 48px rgba(99,102,241,0.7), 0 0 96px rgba(99,102,241,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 32px rgba(99,102,241,0.5), 0 0 64px rgba(99,102,241,0.2)';
          }}
        >
          Launch App
          <span style={{ marginLeft: 10, opacity: 0.8, fontSize: 18, verticalAlign: 'middle' }}>→</span>
        </button>

        {/* Sub-label */}
        <p style={{ margin: '16px 0 0', color: '#475569', fontSize: 13 }}>
          Connect your wallet to get started
        </p>
      </div>

      {/* Transition overlay — fades to black then navigates */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(circle at center, #1a1a3e 0%, #050510 60%, #000 100%)',
          opacity: transitioning ? 1 : 0,
          transition: 'opacity 1.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: transitioning ? 'all' : 'none',
          zIndex: 100,
        }}
      />
    </div>
  );
}
