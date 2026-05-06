"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[747],{4307:function(e,t,r){r.d(t,{j:function(){return c}});var o=r(2988),i=r(2265),n=r(7776),a=r(705);let s={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},l={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},c=i.forwardRef(({scale:e=10,frames:t=1/0,opacity:r=1,width:c=1,height:m=1,blur:u=1,near:f=0,far:v=10,resolution:d=512,smooth:h=!0,color:p="#000000",depthWrite:g=!1,renderOrder:x,...y},M)=>{let D,E;let S=i.useRef(null),b=(0,a.D)(e=>e.scene),C=(0,a.D)(e=>e.gl),w=i.useRef(null);c*=Array.isArray(e)?e[0]:e||1,m*=Array.isArray(e)?e[1]:e||1;let[k,U,P,R,A,F,T]=i.useMemo(()=>{let e=new n.WebGLRenderTarget(d,d),t=new n.WebGLRenderTarget(d,d);t.texture.generateMipmaps=e.texture.generateMipmaps=!1;let r=new n.PlaneGeometry(c,m).rotateX(Math.PI/2),o=new n.Mesh(r),i=new n.MeshDepthMaterial;i.depthTest=i.depthWrite=!1,i.onBeforeCompile=e=>{e.uniforms={...e.uniforms,ucolor:{value:new n.Color(p)}},e.fragmentShader=e.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),e.fragmentShader=e.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};let a=new n.ShaderMaterial(s),u=new n.ShaderMaterial(l);return u.depthTest=a.depthTest=!1,[e,r,i,o,a,u,t]},[d,c,m,e,p]),L=e=>{R.visible=!0,R.material=A,A.uniforms.tDiffuse.value=k.texture,A.uniforms.h.value=1*e/256,C.setRenderTarget(T),C.render(R,w.current),R.material=F,F.uniforms.tDiffuse.value=T.texture,F.uniforms.v.value=1*e/256,C.setRenderTarget(k),C.render(R,w.current),R.visible=!1},_=0;return(0,a.F)(()=>{w.current&&(t===1/0||_<t)&&(_++,D=b.background,E=b.overrideMaterial,S.current.visible=!1,b.background=null,b.overrideMaterial=P,C.setRenderTarget(k),C.render(b,w.current),L(u),h&&L(.4*u),C.setRenderTarget(null),S.current.visible=!0,b.overrideMaterial=E,b.background=D)}),i.useImperativeHandle(M,()=>S.current,[]),i.createElement("group",(0,o.Z)({"rotation-x":Math.PI/2},y,{ref:S}),i.createElement("mesh",{renderOrder:x,geometry:U,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},i.createElement("meshBasicMaterial",{transparent:!0,map:k.texture,opacity:r,depthWrite:g})),i.createElement("orthographicCamera",{ref:w,args:[-c/2,c/2,m/2,-m/2,f,v]}))})},1196:function(e,t,r){r.d(t,{z:function(){return m}});var o=r(2988),i=r(7776),n=r(2265),a=r(705),s=r(3680);let l=function(e,t,r,o){let n=class extends i.ShaderMaterial{constructor(o={}){let n=Object.entries(e);super({uniforms:n.reduce((e,[t,r])=>{let o=i.UniformsUtils.clone({[t]:{value:r}});return{...e,...o}},{}),vertexShader:t,fragmentShader:r}),this.key="",n.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t})),Object.assign(this,o)}};return n.key=i.MathUtils.generateUUID(),n}({},"void main() { }","void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");class c extends i.MeshPhysicalMaterial{constructor(e=6,t=!1){super(),this.uniforms={chromaticAberration:{value:.05},transmission:{value:0},_transmission:{value:1},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new i.Color("white")},anisotropicBlur:{value:.1},time:{value:0},distortion:{value:0},distortionScale:{value:.5},temporalDistortion:{value:0},buffer:{value:null}},this.onBeforeCompile=r=>{r.uniforms={...r.uniforms,...this.uniforms},this.anisotropy>0&&(r.defines.USE_ANISOTROPY=""),t?r.defines.USE_SAMPLER="":r.defines.USE_TRANSMISSION="",r.fragmentShader=`
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <transmission_pars_fragment>",`
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`),r.fragmentShader=r.fragmentShader.replace("#include <transmission_fragment>",`  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${e}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${e})) , material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${e})), material.thickness + thickness_smear * (i + randomCoords) / float(${e}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${e}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`)},Object.keys(this.uniforms).forEach(e=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t}))}}let m=n.forwardRef(({buffer:e,transmissionSampler:t=!1,backside:r=!1,side:m=i.FrontSide,transmission:u=1,thickness:f=0,backsideThickness:v=0,backsideEnvMapIntensity:d=1,samples:h=10,resolution:p,backsideResolution:g,background:x,anisotropy:y,anisotropicBlur:M,...D},E)=>{let S,b,C,w;(0,a.e)({MeshTransmissionMaterial:c});let k=n.useRef(null),[U]=n.useState(()=>new l),P=(0,s.R)(g||p),R=(0,s.R)(p);return(0,a.F)(e=>{k.current.time=e.clock.elapsedTime,k.current.buffer===R.texture&&!t&&(w=k.current.__r3f.parent)&&(C=e.gl.toneMapping,S=e.scene.background,b=k.current.envMapIntensity,e.gl.toneMapping=i.NoToneMapping,x&&(e.scene.background=x),w.material=U,r&&(e.gl.setRenderTarget(P),e.gl.render(e.scene,e.camera),w.material=k.current,w.material.buffer=P.texture,w.material.thickness=v,w.material.side=i.BackSide,w.material.envMapIntensity=d),e.gl.setRenderTarget(R),e.gl.render(e.scene,e.camera),w.material=k.current,w.material.thickness=f,w.material.side=m,w.material.buffer=R.texture,w.material.envMapIntensity=b,e.scene.background=S,e.gl.setRenderTarget(null),e.gl.toneMapping=C)}),n.useImperativeHandle(E,()=>k.current,[]),n.createElement("meshTransmissionMaterial",(0,o.Z)({args:[h,t],ref:k},D,{buffer:e||R.texture,_transmission:u,anisotropicBlur:null!=M?M:y,transmission:t?u:0,thickness:f,side:m}))})},7498:function(e,t,r){r.d(t,{q:function(){return x}});var o=r(2988),i=r(705),n=r(2265),a=r(7776),s=r(4190),l=Object.defineProperty,c=(e,t,r)=>t in e?l(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,m=(e,t,r)=>(c(e,"symbol"!=typeof t?t+"":t,r),r);let u=new a.Euler(0,0,0,"YXZ"),f=new a.Vector3,v={type:"change"},d={type:"lock"},h={type:"unlock"},p=Math.PI/2;class g extends s.p{constructor(e,t){super(),m(this,"camera"),m(this,"domElement"),m(this,"isLocked"),m(this,"minPolarAngle"),m(this,"maxPolarAngle"),m(this,"pointerSpeed"),m(this,"onMouseMove",e=>{this.domElement&&!1!==this.isLocked&&(u.setFromQuaternion(this.camera.quaternion),u.y-=.002*e.movementX*this.pointerSpeed,u.x-=.002*e.movementY*this.pointerSpeed,u.x=Math.max(p-this.maxPolarAngle,Math.min(p-this.minPolarAngle,u.x)),this.camera.quaternion.setFromEuler(u),this.dispatchEvent(v))}),m(this,"onPointerlockChange",()=>{this.domElement&&(this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(d),this.isLocked=!0):(this.dispatchEvent(h),this.isLocked=!1))}),m(this,"onPointerlockError",()=>{console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}),m(this,"connect",e=>{this.domElement=e||this.domElement,this.domElement&&(this.domElement.ownerDocument.addEventListener("mousemove",this.onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this.onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this.onPointerlockError))}),m(this,"disconnect",()=>{this.domElement&&(this.domElement.ownerDocument.removeEventListener("mousemove",this.onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this.onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this.onPointerlockError))}),m(this,"dispose",()=>{this.disconnect()}),m(this,"getObject",()=>this.camera),m(this,"direction",new a.Vector3(0,0,-1)),m(this,"getDirection",e=>e.copy(this.direction).applyQuaternion(this.camera.quaternion)),m(this,"moveForward",e=>{f.setFromMatrixColumn(this.camera.matrix,0),f.crossVectors(this.camera.up,f),this.camera.position.addScaledVector(f,e)}),m(this,"moveRight",e=>{f.setFromMatrixColumn(this.camera.matrix,0),this.camera.position.addScaledVector(f,e)}),m(this,"lock",()=>{this.domElement&&this.domElement.requestPointerLock()}),m(this,"unlock",()=>{this.domElement&&this.domElement.ownerDocument.exitPointerLock()}),this.camera=e,this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,t&&this.connect(t)}}let x=n.forwardRef(({domElement:e,selector:t,onChange:r,onLock:a,onUnlock:s,enabled:l=!0,makeDefault:c,...m},u)=>{let{camera:f,...v}=m,d=(0,i.D)(e=>e.setEvents),h=(0,i.D)(e=>e.gl),p=(0,i.D)(e=>e.camera),x=(0,i.D)(e=>e.invalidate),y=(0,i.D)(e=>e.events),M=(0,i.D)(e=>e.get),D=(0,i.D)(e=>e.set),E=f||p,S=e||y.connected||h.domElement,b=n.useMemo(()=>new g(E),[E]);return n.useEffect(()=>{if(l){b.connect(S);let e=M().events.compute;return d({compute(e,t){let r=t.size.width/2,o=t.size.height/2;t.pointer.set(r/t.size.width*2-1,-(o/t.size.height*2)+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),()=>{b.disconnect(),d({compute:e})}}},[l,b]),n.useEffect(()=>{let e=e=>{x(),r&&r(e)};b.addEventListener("change",e),a&&b.addEventListener("lock",a),s&&b.addEventListener("unlock",s);let o=()=>b.lock(),i=t?Array.from(document.querySelectorAll(t)):[document];return i.forEach(e=>e&&e.addEventListener("click",o)),()=>{b.removeEventListener("change",e),a&&b.removeEventListener("lock",a),s&&b.removeEventListener("unlock",s),i.forEach(e=>e?e.removeEventListener("click",o):void 0)}},[r,a,s,t,b,x]),n.useEffect(()=>{if(c){let e=M().controls;return D({controls:b}),()=>D({controls:e})}},[c,b]),n.createElement("primitive",(0,o.Z)({ref:u,object:b},v))})},5471:function(e,t,r){r.d(t,{P:function(){return d}});var o=r(2988),i=r(2265),n=r(7776),a=r(705),s=r(9449);class l extends n.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
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
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}}let c=e=>e&&e.constructor===Float32Array,m=e=>[e.r,e.g,e.b],u=e=>e instanceof n.Vector2||e instanceof n.Vector3||e instanceof n.Vector4,f=e=>Array.isArray(e)?e:u(e)?e.toArray():[e,e,e];function v(e,t,r){return i.useMemo(()=>{if(void 0!==t){if(c(t))return t;if(t instanceof n.Color){let r=Array.from({length:3*e},()=>m(t)).flat();return Float32Array.from(r)}if(u(t)||Array.isArray(t)){let r=Array.from({length:3*e},()=>f(t)).flat();return Float32Array.from(r)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},r)},[t])}let d=i.forwardRef(({noise:e=1,count:t=100,speed:r=1,opacity:s=1,scale:m=1,size:u,color:d,children:h,...p},g)=>{i.useMemo(()=>(0,a.e)({SparklesImplMaterial:l}),[]);let x=i.useRef(null),y=(0,a.D)(e=>e.viewport.dpr),M=f(m),D=i.useMemo(()=>Float32Array.from(Array.from({length:t},()=>M.map(n.MathUtils.randFloatSpread)).flat()),[t,...M]),E=v(t,u,Math.random),S=v(t,s),b=v(t,r),C=v(3*t,e),w=v(void 0===d?3*t:t,c(d)?d:new n.Color(d),()=>1);return(0,a.F)(e=>{x.current&&x.current.material&&(x.current.material.time=e.clock.elapsedTime)}),i.useImperativeHandle(g,()=>x.current,[]),i.createElement("points",(0,o.Z)({key:`particle-${t}-${JSON.stringify(m)}`},p,{ref:x}),i.createElement("bufferGeometry",null,i.createElement("bufferAttribute",{attach:"attributes-position",args:[D,3]}),i.createElement("bufferAttribute",{attach:"attributes-size",args:[E,1]}),i.createElement("bufferAttribute",{attach:"attributes-opacity",args:[S,1]}),i.createElement("bufferAttribute",{attach:"attributes-speed",args:[b,1]}),i.createElement("bufferAttribute",{attach:"attributes-color",args:[w,3]}),i.createElement("bufferAttribute",{attach:"attributes-noise",args:[C,3]})),h||i.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:y,depthWrite:!1}))})}}]);