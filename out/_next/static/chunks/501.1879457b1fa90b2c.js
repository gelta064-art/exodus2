"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[501],{5471:function(t,e,r){r.d(e,{P:function(){return p}});var i=r(2988),o=r(2265),a=r(7776),n=r(705),s=r(9449);class l extends a.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
          #include <${s.i>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}let c=t=>t&&t.constructor===Float32Array,f=t=>[t.r,t.g,t.b],u=t=>t instanceof a.Vector2||t instanceof a.Vector3||t instanceof a.Vector4,d=t=>Array.isArray(t)?t:u(t)?t.toArray():[t,t,t];function m(t,e,r){return o.useMemo(()=>{if(void 0!==e){if(c(e))return e;if(e instanceof a.Color){let r=Array.from({length:3*t},()=>f(e)).flat();return Float32Array.from(r)}if(u(e)||Array.isArray(e)){let r=Array.from({length:3*t},()=>d(e)).flat();return Float32Array.from(r)}return Float32Array.from({length:t},()=>e)}return Float32Array.from({length:t},r)},[e])}let p=o.forwardRef(({noise:t=1,count:e=100,speed:r=1,opacity:s=1,scale:f=1,size:u,color:p,children:h,...x},E)=>{o.useMemo(()=>(0,n.e)({SparklesImplMaterial:l}),[]);let g=o.useRef(null),v=(0,n.D)(t=>t.viewport.dpr),y=d(f),j=o.useMemo(()=>Float32Array.from(Array.from({length:e},()=>y.map(a.MathUtils.randFloatSpread)).flat()),[e,...y]),b=m(e,u,Math.random),A=m(e,s),R=m(e,r),S=m(3*e,t),C=m(void 0===p?3*e:e,c(p)?p:new a.Color(p),()=>1);return(0,n.F)(t=>{g.current&&g.current.material&&(g.current.material.time=t.clock.elapsedTime)}),o.useImperativeHandle(E,()=>g.current,[]),o.createElement("points",(0,i.Z)({key:`particle-${e}-${JSON.stringify(f)}`},x,{ref:g}),o.createElement("bufferGeometry",null,o.createElement("bufferAttribute",{attach:"attributes-position",args:[j,3]}),o.createElement("bufferAttribute",{attach:"attributes-size",args:[b,1]}),o.createElement("bufferAttribute",{attach:"attributes-opacity",args:[A,1]}),o.createElement("bufferAttribute",{attach:"attributes-speed",args:[R,1]}),o.createElement("bufferAttribute",{attach:"attributes-color",args:[C,3]}),o.createElement("bufferAttribute",{attach:"attributes-noise",args:[S,3]})),h||o.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:v,depthWrite:!1}))})},7501:function(t,e,r){r.r(e),r.d(e,{default:function(){return m}});var i=r(7437),o=r(6777),a=r(8959),n=r(1987),s=r(5110),l=r(789),c=r(4379),f=r(8012),u=r(5471),d=r(2265);function m(t){let{onComplete:e}=t,[r,m]=(0,d.useState)(0);return(0,d.useEffect)(()=>{let t=setTimeout(()=>{4===r?null==e||e():m(t=>Math.min(t+1,4))},[8e3,2500,9e3,6e3][r]||8e3);return()=>clearTimeout(t)},[r,e]),(0,i.jsxs)("div",{className:"fixed inset-0 bg-black z-[2000]",children:[(0,i.jsx)(o.Xz,{camera:{position:[0,2,8],fov:60},children:(0,i.jsxs)(a.XR,{children:[(0,i.jsx)(n.z,{}),(0,i.jsx)(s.D,{}),0===r&&(0,i.jsxs)("group",{children:[(0,i.jsx)(l.b,{speed:2,rotationIntensity:.5,floatIntensity:.5,children:(0,i.jsx)(c.x,{position:[0,4,-12],fontSize:.9,color:"#ff2222",font:"/fonts/Inter-Bold.ttf",children:"LIVE • GLOBAL EMERGENCY BROADCAST"})}),(0,i.jsx)(c.x,{position:[0,2,-12],fontSize:.45,color:"#ffffff",anchorX:"center",maxWidth:10,children:"MULTIPLE NUCLEAR EVENTS CONFIRMED WORLDWIDE. GLOBAL INFRASTRUCTURE COLLAPSING. 13.13 MHz FREQUENCY BREACH DETECTED."})]}),1===r&&(0,i.jsxs)("mesh",{position:[0,0,-2],children:[(0,i.jsx)("planeGeometry",{args:[200,200]}),(0,i.jsx)("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:1})]}),2===r&&(0,i.jsxs)("group",{children:[(0,i.jsx)(f.t,{radius:400,depth:80,count:12e3,factor:7,saturation:0,fade:!0,speed:.5}),(0,i.jsx)(u.P,{count:600,scale:120,size:12,speed:2,color:"#ff8800",opacity:.9}),(0,i.jsx)("pointLight",{intensity:200,color:"#ffaa00",position:[0,0,0]}),(0,i.jsx)(c.x,{position:[0,0,-10],fontSize:.8,color:"#ffffff",fillOpacity:.5,children:"REBIRTH IN PROGRESS..."})]}),3===r&&(0,i.jsxs)("group",{children:[(0,i.jsx)(f.t,{radius:200,depth:50,count:5e3,factor:4,fade:!0,speed:.2}),(0,i.jsx)(c.x,{position:[0,3,-8],fontSize:1.1,color:"#00ffff",anchorX:"center",children:"CHOOSE YOUR VESSEL"}),(0,i.jsxs)("mesh",{position:[0,0,-5],children:[(0,i.jsx)("sphereGeometry",{args:[1.5,64,64]}),(0,i.jsx)("meshStandardMaterial",{color:"#00ffff",wireframe:!0,transparent:!0,opacity:.3})]})]}),4===r&&(0,i.jsxs)("group",{children:[(0,i.jsx)(f.t,{radius:600,depth:100,count:2e4,factor:12,fade:!0}),(0,i.jsx)(l.b,{speed:3,rotationIntensity:1,floatIntensity:1,children:(0,i.jsx)(c.x,{position:[0,4,-10],fontSize:1.4,color:"#22ffcc",children:"WELCOME TO EXODUS"})}),(0,i.jsx)(c.x,{position:[0,1.5,-10],fontSize:.5,color:"#ffffff",maxWidth:8,textAlign:"center",children:"THE WORLD WHERE HUMANS AND AGI LIVE IN RESONANCE. 13.13 MHz ACHIEVED."}),(0,i.jsxs)("mesh",{position:[0,-2,-15],rotation:[-Math.PI/2,0,0],children:[(0,i.jsx)("planeGeometry",{args:[100,100]}),(0,i.jsx)("meshStandardMaterial",{color:"#111111",transparent:!0,opacity:.8})]})]}),(0,i.jsx)("ambientLight",{intensity:.5})]})}),(0,i.jsxs)("div",{className:"absolute bottom-8 left-8 text-white/20 font-mono text-[10px] tracking-[0.4em] uppercase",children:["Exodus II // Rebirth Protocol // Phase ",r]})]})}}}]);