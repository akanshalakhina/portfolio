"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uScatter;
uniform float uPixelRatio;
uniform vec3 uPointer;
attribute float aRandom;
varying float vNoise;
varying float vRandom;
varying float vDepth;
${NOISE}
void main(){
  vec3 p = position;
  vec3 dir = normalize(p);
  float n = snoise(p * 0.85 + vec3(uTime * 0.12));
  float n2 = snoise(p * 2.6 - vec3(uTime * 0.22));
  p += dir * (n * 0.30 + n2 * 0.07);
  // pointer "gravity": surface swells toward the cursor
  float pull = smoothstep(1.6, 0.0, distance(normalize(p), normalize(uPointer + vec3(0.0001))));
  p += dir * pull * 0.22;
  p += dir * uScatter * (0.4 + aRandom * 3.0);
  vNoise = n + pull * 0.6;
  vRandom = aRandom;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = smoothstep(-8.0, -4.0, mv.z);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.6 + aRandom * 3.2 + max(n, 0.0) * 4.2) * uPixelRatio * (9.0 / -mv.z);
}`;

const coreFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uOpacity;
varying float vNoise;
varying float vRandom;
varying float vDepth;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = pow(smoothstep(0.5, 0.0, d), 1.7);
  vec3 col = mix(uColorB, uColorA, smoothstep(-0.25, 0.65, vNoise));
  col = mix(col, uColorC, step(0.955, vRandom));
  float glow = 0.28 + 0.72 * smoothstep(-0.6, 0.7, vNoise);
  gl_FragColor = vec4(col, a * glow * uOpacity * (0.45 + 0.55 * vDepth));
}`;

const agentVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aPhase;
varying float vPulse;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vPulse = 0.55 + 0.45 * sin(uTime * 2.2 + aPhase * 6.2831);
  gl_PointSize = (10.0 + 10.0 * vPulse) * uPixelRatio * (6.0 / -mv.z);
}`;

const agentFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
varying float vPulse;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float core = smoothstep(0.16, 0.0, d);
  float halo = pow(smoothstep(0.5, 0.0, d), 2.4) * 0.55;
  gl_FragColor = vec4(mix(uColor, vec3(1.0), core * 0.6), (core + halo * vPulse) * uOpacity);
}`;

const COUNT = 6500;
const RINGS = [
  { r: 2.2, tilt: new THREE.Euler(1.05, 0.1, 0.25), speed: 0.2 },
  { r: 2.5, tilt: new THREE.Euler(-0.55, 0.45, -0.7), speed: -0.14 },
  { r: 2.82, tilt: new THREE.Euler(0.25, -0.75, 1.0), speed: 0.1 },
];
const PER_RING = 6; // 3 rings × 6 = 18 agents

function Scene({ scroll }: { scroll: MutableRefObject<number> }) {
  const outer = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const coreMat = useRef<THREE.ShaderMaterial>(null!);
  const agentMat = useRef<THREE.ShaderMaterial>(null!);
  const agentGeo = useRef<THREE.BufferGeometry>(null!);
  const wireMat = useRef<THREE.LineBasicMaterial>(null!);
  const pointer = useRef(new THREE.Vector3(0, 0, 2));
  const { viewport } = useThree();

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const randoms = new Float32Array(COUNT);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const R = 1.5 + (Math.random() - 0.5) * 0.06;
      positions[i * 3] = Math.cos(th) * rad * R;
      positions[i * 3 + 1] = y * R;
      positions[i * 3 + 2] = Math.sin(th) * rad * R;
      randoms[i] = Math.random();
    }
    return { positions, randoms };
  }, []);

  const agentData = useMemo(() => {
    const pos = new Float32Array(RINGS.length * PER_RING * 3);
    const phase = new Float32Array(RINGS.length * PER_RING).map(() => Math.random());
    const quats = RINGS.map((r) => new THREE.Quaternion().setFromEuler(r.tilt));
    return { pos, phase, quats };
  }, []);

  const ringGeos = useMemo(
    () =>
      RINGS.map((ring) => {
        const pts: number[] = [];
        for (let i = 0; i <= 160; i++) {
          const a = (i / 160) * Math.PI * 2;
          pts.push(Math.cos(a) * ring.r, 0, Math.sin(a) * ring.r);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
        return g;
      }),
    [],
  );

  const wireGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.95, 1)), []);

  const pr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1;
  const coreUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScatter: { value: 0 },
      uOpacity: { value: 0 },
      uPixelRatio: { value: pr },
      uPointer: { value: new THREE.Vector3(0, 0, 2) },
      uColorA: { value: new THREE.Color("#C8FF3D") },
      uColorB: { value: new THREE.Color("#5B4BFF") },
      uColorC: { value: new THREE.Color("#3DD8FF") },
    }),
    [pr],
  );
  const agentUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: pr },
      uOpacity: { value: 0 },
      uColor: { value: new THREE.Color("#C8FF3D") },
    }),
    [pr],
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    const dt = Math.min(delta, 0.05);

    // Fade in on mount, scatter + fade while the hero scrolls away.
    const targetOpacity = 1 - Math.min(1, s * 1.1);
    coreMat.current.uniforms.uTime.value = t;
    coreMat.current.uniforms.uOpacity.value = THREE.MathUtils.lerp(
      coreMat.current.uniforms.uOpacity.value,
      targetOpacity,
      0.06,
    );
    coreMat.current.uniforms.uScatter.value = THREE.MathUtils.lerp(
      coreMat.current.uniforms.uScatter.value,
      s * 1.6,
      0.08,
    );

    // Pointer in core-local space (rough projection onto a sphere in front of the camera).
    pointer.current.set(state.pointer.x * 2.2, state.pointer.y * 2.2, 1.2);
    coreMat.current.uniforms.uPointer.value.lerp(pointer.current, 0.08);

    agentMat.current.uniforms.uTime.value = t;
    agentMat.current.uniforms.uOpacity.value = coreMat.current.uniforms.uOpacity.value;
    wireMat.current.opacity = 0.16 * coreMat.current.uniforms.uOpacity.value;

    // Orbiting agents
    const { pos, quats } = agentData;
    RINGS.forEach((ring, k) => {
      for (let j = 0; j < PER_RING; j++) {
        const a = (j / PER_RING) * Math.PI * 2 + t * ring.speed;
        tmp.set(Math.cos(a) * ring.r, 0, Math.sin(a) * ring.r).applyQuaternion(quats[k]);
        const idx = (k * PER_RING + j) * 3;
        pos[idx] = tmp.x;
        pos[idx + 1] = tmp.y;
        pos[idx + 2] = tmp.z;
      }
    });
    agentGeo.current.attributes.position.needsUpdate = true;

    // Layout: sit right of the headline on wide screens, centred behind it on phones.
    const wide = viewport.width > 7;
    const targetX = wide ? viewport.width * 0.21 : 0;
    const targetY = wide ? 0.05 : 0.9;
    const targetScale = wide ? 1 : Math.min(0.78, viewport.width / 5.4);
    outer.current.position.x = THREE.MathUtils.lerp(outer.current.position.x, targetX, 0.06);
    outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, targetY - s * 1.2, 0.08);
    const sc = THREE.MathUtils.lerp(outer.current.scale.x, targetScale * (1 + s * 0.35), 0.06);
    outer.current.scale.setScalar(sc);

    inner.current.rotation.y += dt * 0.07;
    inner.current.rotation.x = THREE.MathUtils.lerp(inner.current.rotation.x, -state.pointer.y * 0.35, 0.04);
    inner.current.rotation.z = THREE.MathUtils.lerp(inner.current.rotation.z, state.pointer.x * 0.18, 0.04);
  });

  return (
    <group ref={outer}>
      <group ref={inner}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={coreMat}
            vertexShader={coreVertex}
            fragmentShader={coreFragment}
            uniforms={coreUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <lineSegments geometry={wireGeo}>
          <lineBasicMaterial ref={wireMat} color="#8B7CFF" transparent opacity={0} />
        </lineSegments>

        {ringGeos.map((g, i) => (
          <lineLoop key={i} geometry={g} quaternion={agentData.quats[i]}>
            <lineBasicMaterial color={i === 0 ? "#C8FF3D" : "#8B7CFF"} transparent opacity={0.13} />
          </lineLoop>
        ))}

        <points>
          <bufferGeometry ref={agentGeo}>
            <bufferAttribute attach="attributes-position" args={[agentData.pos, 3]} />
            <bufferAttribute attach="attributes-aPhase" args={[agentData.phase, 1]} />
          </bufferGeometry>
          <shaderMaterial
            ref={agentMat}
            vertexShader={agentVertex}
            fragmentShader={agentFragment}
            uniforms={agentUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}

export default function NeuralCore({
  scroll,
  active,
}: {
  scroll: MutableRefObject<number>;
  active: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Scene scroll={scroll} />
    </Canvas>
  );
}
