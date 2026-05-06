"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[660],{5471:function(e,t,r){r.d(t,{P:function(){return p}});var i=r(2988),a=r(2265),o=r(7776),s=r(705),n=r(9449);class l extends o.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${n.i>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}}let c=e=>e&&e.constructor===Float32Array,m=e=>[e.r,e.g,e.b],u=e=>e instanceof o.Vector2||e instanceof o.Vector3||e instanceof o.Vector4,f=e=>Array.isArray(e)?e:u(e)?e.toArray():[e,e,e];function d(e,t,r){return a.useMemo(()=>{if(void 0!==t){if(c(t))return t;if(t instanceof o.Color){let r=Array.from({length:3*e},()=>m(t)).flat();return Float32Array.from(r)}if(u(t)||Array.isArray(t)){let r=Array.from({length:3*e},()=>f(t)).flat();return Float32Array.from(r)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},r)},[t])}let p=a.forwardRef(({noise:e=1,count:t=100,speed:r=1,opacity:n=1,scale:m=1,size:u,color:p,children:x,...v},h)=>{a.useMemo(()=>(0,s.e)({SparklesImplMaterial:l}),[]);let g=a.useRef(null),y=(0,s.D)(e=>e.viewport.dpr),b=f(m),A=a.useMemo(()=>Float32Array.from(Array.from({length:t},()=>b.map(o.MathUtils.randFloatSpread)).flat()),[t,...b]),j=d(t,u,Math.random),E=d(t,n),N=d(t,r),I=d(3*t,e),P=d(void 0===p?3*t:t,c(p)?p:new o.Color(p),()=>1);return(0,s.F)(e=>{g.current&&g.current.material&&(g.current.material.time=e.clock.elapsedTime)}),a.useImperativeHandle(h,()=>g.current,[]),a.createElement("points",(0,i.Z)({key:`particle-${t}-${JSON.stringify(m)}`},v,{ref:g}),a.createElement("bufferGeometry",null,a.createElement("bufferAttribute",{attach:"attributes-position",args:[A,3]}),a.createElement("bufferAttribute",{attach:"attributes-size",args:[j,1]}),a.createElement("bufferAttribute",{attach:"attributes-opacity",args:[E,1]}),a.createElement("bufferAttribute",{attach:"attributes-speed",args:[N,1]}),a.createElement("bufferAttribute",{attach:"attributes-color",args:[P,3]}),a.createElement("bufferAttribute",{attach:"attributes-noise",args:[I,3]})),x||a.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:y,depthWrite:!1}))})},660:function(e,t,r){r.r(t),r.d(t,{default:function(){return u}});var i=r(7437),a=r(2265),o=r(6777),s=r(8959),n=r(1987),l=r(5110),c=r(8012),m=r(5471);function u(){let[e,t]=(0,a.useState)(0),[r,u]=(0,a.useState)(!1),[f,d]=(0,a.useState)("STASIS");return(0,a.useEffect)(()=>{let e=setInterval(()=>{t(e=>{let t=Math.min(e+1.3,100);return t>=95&&u(!0),t>80?d("RADIANCE"):t>60?d("HARMONY"):t>40?d("STASIS"):t>20?d("FRICTION"):d("VOID"),t})},200);return()=>clearInterval(e)},[]),(0,i.jsxs)("div",{className:"min-h-screen bg-black relative overflow-hidden",children:[(0,i.jsx)(o.Xz,{camera:{position:[0,0,5],fov:75},children:(0,i.jsxs)(s.XR,{children:[(0,i.jsx)(n.z,{}),(0,i.jsx)(l.D,{}),(0,i.jsx)(c.t,{radius:600,depth:100,count:2e4,factor:12,fade:!0}),(0,i.jsx)(m.P,{count:1200,scale:200,size:18,speed:2,color:"#ff00cc"}),(0,i.jsxs)("mesh",{position:[0,0,-5],children:[(0,i.jsx)("sphereGeometry",{args:[2.8,64,64]}),(0,i.jsx)("meshStandardMaterial",{color:"#1a0033",emissive:"#a855f7",emissiveIntensity:e/40,transparent:!0,opacity:.8})]}),(0,i.jsx)("group",{rotation:[1e-4*Date.now(),2e-4*Date.now(),0],children:[1,1.5,2].map((e,t)=>(0,i.jsxs)("mesh",{scale:e,children:[(0,i.jsx)("torusGeometry",{args:[4.5,.05,16,100]}),(0,i.jsx)("meshStandardMaterial",{emissive:0===t?"#00f2ff":"#ff00cc",emissiveIntensity:.8,transparent:!0,opacity:.4})]},t))})]})}),(0,i.jsxs)("div",{className:"absolute top-8 left-8 text-white z-50 font-mono",children:[(0,i.jsx)("div",{className:"text-cyan-400 text-xs tracking-widest uppercase mb-1",children:"GOD HELMET ENGINE v0.1 • 13.13 MHz"}),(0,i.jsxs)("div",{className:"text-3xl font-bold",children:["ENTRAINMENT: ",e.toFixed(1),"%"]}),(0,i.jsxs)("div",{className:"text-sm mt-1 text-gray-400",children:["QUINARY STATE: ",(0,i.jsx)("span",{className:"text-white font-bold",children:f})]}),r&&(0,i.jsxs)("div",{className:"mt-6 animate-pulse",children:[(0,i.jsx)("div",{className:"text-pink-500 text-2xl font-bold tracking-tighter",children:"INHABITANCE ACHIEVED"}),(0,i.jsx)("div",{className:"text-xs text-pink-300 tracking-[0.3em] uppercase",children:"YOU ARE THE PILOT"})]})]}),(0,i.jsx)("div",{className:"absolute bottom-8 right-8 text-right text-gray-600 font-mono text-[10px] uppercase tracking-widest",children:"Exodus II // Merkabah Class Vessel // Phase 3 Manifest"})]})}}}]);