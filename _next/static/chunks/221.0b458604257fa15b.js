"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[221],{4823:function(e,t,n){n.d(t,{KC:function(){return a},aL:function(){return s}});var r=n(2988),i=n(2265);function o(e,t){let n=e+"Geometry";return i.forwardRef(({args:e,children:o,...s},a)=>{let l=i.useRef(null);return i.useImperativeHandle(a,()=>l.current),i.useLayoutEffect(()=>void(null==t||t(l.current))),i.createElement("mesh",(0,r.Z)({ref:l},s),i.createElement(n,{attach:"geometry",args:e}),o)})}let s=o("sphere"),a=o("torus")},6777:function(e,t,n){n.d(t,{Xz:function(){return z}});var r,i,o=n(705),s=n(2265),a=n(7776);function l(e,t){let n;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}let c=["x","y","top","bottom","left","right","width","height"],u=(e,t)=>c.every(n=>e[n]===t[n]);var d=Object.defineProperty,f=Object.defineProperties,h=Object.getOwnPropertyDescriptors,p=Object.getOwnPropertySymbols,m=Object.prototype.hasOwnProperty,v=Object.prototype.propertyIsEnumerable,y=(e,t,n)=>t in e?d(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,w=(e,t)=>{for(var n in t||(t={}))m.call(t,n)&&y(e,n,t[n]);if(p)for(var n of p(t))v.call(t,n)&&y(e,n,t[n]);return e},x=(e,t)=>f(e,h(t));function g(e){try{return Object.defineProperties(e,{_currentRenderer:{get:()=>null,set(){}},_currentRenderer2:{get:()=>null,set(){}}})}catch(t){return e}}"undefined"!=typeof window&&((null==(r=window.document)?void 0:r.createElement)||(null==(i=window.navigator)?void 0:i.product)==="ReactNative")?s.useLayoutEffect:s.useEffect;let b=console.error;console.error=function(){let e=[...arguments].join("");if((null==e?void 0:e.startsWith("Warning:"))&&e.includes("useContext")){console.error=b;return}return b.apply(this,arguments)};let S=g(s.createContext(null));class E extends s.Component{render(){return s.createElement(S.Provider,{value:this._reactInternals},this.props.children)}}var _=n(7437);n(2777),n(1543),n(7494);let L=s.forwardRef(function({children:e,fallback:t,resize:n,style:r,gl:i,events:c=o.c,eventSource:d,eventPrefix:f,shadows:h,linear:p,flat:m,legacy:v,orthographic:y,frameloop:b,dpr:L,performance:z,raycaster:A,camera:j,scene:M,onPointerMissed:O,onCreated:C,...U},B){s.useMemo(()=>(0,o.e)(a),[]);let D=function(){let e=function(){let e=function(){let e=s.useContext(S);if(null===e)throw Error("its-fine: useFiber must be called within a <FiberProvider />!");let t=s.useId();return s.useMemo(()=>{for(let n of[e,null==e?void 0:e.alternate]){if(!n)continue;let e=function e(t,n,r){if(!t)return;if(!0===r(t))return t;let i=n?t.return:t.child;for(;i;){let t=e(i,n,r);if(t)return t;i=n?null:i.sibling}}(n,!1,e=>{let n=e.memoizedState;for(;n;){if(n.memoizedState===t)return!0;n=n.next}});if(e)return e}},[e,t])}(),[t]=s.useState(()=>new Map);t.clear();let n=e;for(;n;){if(n.type&&"object"==typeof n.type){let e=void 0===n.type._context&&n.type.Provider===n.type?n.type:n.type._context;e&&e!==S&&!t.has(e)&&t.set(e,s.useContext(g(e)))}n=n.return}return t}();return s.useMemo(()=>Array.from(e.keys()).reduce((t,n)=>r=>s.createElement(t,null,s.createElement(n.Provider,x(w({},r),{value:e.get(n)}))),e=>s.createElement(E,w({},e))),[e])}(),[P,I]=function({debounce:e,scroll:t,polyfill:n,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){var i;let o=n||("undefined"==typeof window?class{}:window.ResizeObserver);if(!o)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[a,c]=(0,s.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),d=(0,s.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:a,orientationHandler:null}),f=e?"number"==typeof e?e:e.scroll:null,h=e?"number"==typeof e?e:e.resize:null,p=(0,s.useRef)(!1);(0,s.useEffect)(()=>(p.current=!0,()=>void(p.current=!1)));let[m,v,y]=(0,s.useMemo)(()=>{let e=()=>{if(!d.current.element)return;let{left:e,top:t,width:n,height:i,bottom:o,right:s,x:a,y:l}=d.current.element.getBoundingClientRect(),f={left:e,top:t,width:n,height:i,bottom:o,right:s,x:a,y:l};d.current.element instanceof HTMLElement&&r&&(f.height=d.current.element.offsetHeight,f.width=d.current.element.offsetWidth),Object.freeze(f),p.current&&!u(d.current.lastBounds,f)&&c(d.current.lastBounds=f)};return[e,h?l(e,h):e,f?l(e,f):e]},[c,r,f,h]);function w(){d.current.scrollContainers&&(d.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",y,!0)),d.current.scrollContainers=null),d.current.resizeObserver&&(d.current.resizeObserver.disconnect(),d.current.resizeObserver=null),d.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",d.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",d.current.orientationHandler))}function x(){d.current.element&&(d.current.resizeObserver=new o(y),d.current.resizeObserver.observe(d.current.element),t&&d.current.scrollContainers&&d.current.scrollContainers.forEach(e=>e.addEventListener("scroll",y,{capture:!0,passive:!0})),d.current.orientationHandler=()=>{y()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",d.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",d.current.orientationHandler))}return i=!!t,(0,s.useEffect)(()=>{if(i)return window.addEventListener("scroll",y,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",y,!0)},[y,i]),(0,s.useEffect)(()=>(window.addEventListener("resize",v),()=>void window.removeEventListener("resize",v)),[v]),(0,s.useEffect)(()=>{w(),x()},[t,y,v]),(0,s.useEffect)(()=>w,[]),[e=>{e&&e!==d.current.element&&(w(),d.current.element=e,d.current.scrollContainers=function e(t){let n=[];if(!t||t===document.body)return n;let{overflow:r,overflowX:i,overflowY:o}=window.getComputedStyle(t);return[r,i,o].some(e=>"auto"===e||"scroll"===e)&&n.push(t),[...n,...e(t.parentElement)]}(e),x())},a,m]}({scroll:!0,debounce:{scroll:50,resize:0},...n}),R=s.useRef(null),H=s.useRef(null);s.useImperativeHandle(B,()=>R.current);let N=(0,o.u)(O),[T,V]=s.useState(!1),[F,W]=s.useState(!1);if(T)throw T;if(F)throw F;let G=s.useRef(null);(0,o.a)(()=>{let t=R.current;I.width>0&&I.height>0&&t&&(G.current||(G.current=(0,o.b)(t)),G.current.configure({gl:i,events:c,shadows:h,linear:p,flat:m,legacy:v,orthographic:y,frameloop:b,dpr:L,performance:z,raycaster:A,camera:j,scene:M,size:I,onPointerMissed:(...e)=>null==N.current?void 0:N.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(d?(0,o.i)(d)?d.current:d:H.current),f&&e.setEvents({compute:(e,t)=>{let n=e[f+"X"],r=e[f+"Y"];t.pointer.set(n/t.size.width*2-1,-(r/t.size.height*2)+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==C||C(e)}}),G.current.render((0,_.jsx)(D,{children:(0,_.jsx)(o.E,{set:W,children:(0,_.jsx)(s.Suspense,{fallback:(0,_.jsx)(o.B,{set:V}),children:null!=e?e:null})})})))}),s.useEffect(()=>{let e=R.current;if(e)return()=>(0,o.d)(e)},[]);let k=d?"none":"auto";return(0,_.jsx)("div",{ref:H,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:k,...r},...U,children:(0,_.jsx)("div",{ref:P,style:{width:"100%",height:"100%"},children:(0,_.jsx)("canvas",{ref:R,style:{display:"block"},children:t})})})}),z=s.forwardRef(function(e,t){return(0,_.jsx)(E,{children:(0,_.jsx)(L,{...e,ref:t})})})},8221:function(e,t,n){let r,i;n.r(t),n.d(t,{default:function(){return T}});var o=n(7437),s=n(2265),a=n(6777),l=n(4823),c=n(4379),u=n(789),d=n(2988),f=n(7776),h=n(705);let p=new f.Box3,m=new f.Vector3;class v extends f.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new f.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new f.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new f.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new f.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new f.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new f.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new f.InterleavedBufferAttribute(r,t,0)),this.setAttribute("instanceColorEnd",new f.InterleavedBufferAttribute(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new f.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new f.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),p.setFromBufferAttribute(t),this.boundingBox.union(p))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new f.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,o=e.count;i<o;i++)m.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(m)),m.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(m));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var y=n(6231);class w extends f.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:f.UniformsUtils.clone(f.UniformsUtils.merge([f.UniformsLib.common,f.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${y.i>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let x=y.i>=125?"uv1":"uv2",g=new f.Vector4,b=new f.Vector3,S=new f.Vector3,E=new f.Vector4,_=new f.Vector4,L=new f.Vector4,z=new f.Vector3,A=new f.Matrix4,j=new f.Line3,M=new f.Vector3,O=new f.Box3,C=new f.Sphere,U=new f.Vector4;function B(e,t,n){return U.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),U.multiplyScalar(1/U.w),U.x=i/n.width,U.y=i/n.height,U.applyMatrix4(e.projectionMatrixInverse),U.multiplyScalar(1/U.w),Math.abs(Math.max(U.x,U.y))}class D extends f.Mesh{constructor(e=new v,t=new w({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,o=t.count;e<o;e++,i+=2)b.fromBufferAttribute(t,e),S.fromBufferAttribute(n,e),r[i]=0===i?0:r[i-1],r[i+1]=r[i]+b.distanceTo(S);let i=new f.InstancedInterleavedBuffer(r,2,1);return e.setAttribute("instanceDistanceStart",new f.InterleavedBufferAttribute(i,1,0)),e.setAttribute("instanceDistanceEnd",new f.InterleavedBufferAttribute(i,1,1)),this}raycast(e,t){let n,o;let s=this.material.worldUnits,a=e.camera;null!==a||s||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;r=e.ray;let c=this.matrixWorld,u=this.geometry,d=this.material;if(i=d.linewidth+l,null===u.boundingSphere&&u.computeBoundingSphere(),C.copy(u.boundingSphere).applyMatrix4(c),s)n=.5*i;else{let e=Math.max(a.near,C.distanceToPoint(r.origin));n=B(a,e,d.resolution)}if(C.radius+=n,!1!==r.intersectsSphere(C)){if(null===u.boundingBox&&u.computeBoundingBox(),O.copy(u.boundingBox).applyMatrix4(c),s)o=.5*i;else{let e=Math.max(a.near,O.distanceToPoint(r.origin));o=B(a,e,d.resolution)}O.expandByScalar(o),!1!==r.intersectsBox(O)&&(s?function(e,t){let n=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,a=o.attributes.instanceEnd,l=Math.min(o.instanceCount,s.count);for(let o=0;o<l;o++){j.start.fromBufferAttribute(s,o),j.end.fromBufferAttribute(a,o),j.applyMatrix4(n);let l=new f.Vector3,c=new f.Vector3;r.distanceSqToSegment(j.start,j.end,c,l),c.distanceTo(l)<.5*i&&t.push({point:c,pointOnLine:l,distance:r.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[x]:null})}}(this,t):function(e,t,n){let o=t.projectionMatrix,s=e.material.resolution,a=e.matrixWorld,l=e.geometry,c=l.attributes.instanceStart,u=l.attributes.instanceEnd,d=Math.min(l.instanceCount,c.count),h=-t.near;r.at(1,L),L.w=1,L.applyMatrix4(t.matrixWorldInverse),L.applyMatrix4(o),L.multiplyScalar(1/L.w),L.x*=s.x/2,L.y*=s.y/2,L.z=0,z.copy(L),A.multiplyMatrices(t.matrixWorldInverse,a);for(let t=0;t<d;t++){if(E.fromBufferAttribute(c,t),_.fromBufferAttribute(u,t),E.w=1,_.w=1,E.applyMatrix4(A),_.applyMatrix4(A),E.z>h&&_.z>h)continue;if(E.z>h){let e=E.z-_.z,t=(E.z-h)/e;E.lerp(_,t)}else if(_.z>h){let e=_.z-E.z,t=(_.z-h)/e;_.lerp(E,t)}E.applyMatrix4(o),_.applyMatrix4(o),E.multiplyScalar(1/E.w),_.multiplyScalar(1/_.w),E.x*=s.x/2,E.y*=s.y/2,_.x*=s.x/2,_.y*=s.y/2,j.start.copy(E),j.start.z=0,j.end.copy(_),j.end.z=0;let l=j.closestPointToPointParameter(z,!0);j.at(l,M);let d=f.MathUtils.lerp(E.z,_.z,l),p=d>=-1&&d<=1,m=z.distanceTo(M)<.5*i;if(p&&m){j.start.fromBufferAttribute(c,t),j.end.fromBufferAttribute(u,t),j.start.applyMatrix4(a),j.end.applyMatrix4(a);let i=new f.Vector3,o=new f.Vector3;r.distanceSqToSegment(j.start,j.end,o,i),n.push({point:o,pointOnLine:i,distance:r.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[x]:null})}}}(this,a,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(g),this.material.uniforms.resolution.value.set(g.z,g.w))}}class P extends v{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(3===t)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class I extends D{constructor(e=new P,t=new w({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let R=s.forwardRef(function({points:e,color:t=16777215,vertexColors:n,linewidth:r,lineWidth:i,segments:o,dashed:a,...l},c){var u,p;let m=(0,h.D)(e=>e.size),y=s.useMemo(()=>o?new D:new I,[o]),[x]=s.useState(()=>new w),g=(null==n||null==(u=n[0])?void 0:u.length)===4?4:3,b=s.useMemo(()=>{let r=o?new v:new P,i=e.map(e=>{let t=Array.isArray(e);return e instanceof f.Vector3||e instanceof f.Vector4?[e.x,e.y,e.z]:e instanceof f.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=16777215;let e=n.map(e=>e instanceof f.Color?e.toArray():e);r.setColors(e.flat(),g)}return r},[e,o,n,g]);return s.useLayoutEffect(()=>{y.computeLineDistances()},[e,y]),s.useLayoutEffect(()=>{a?x.defines.USE_DASH="":delete x.defines.USE_DASH,x.needsUpdate=!0},[a,x]),s.useEffect(()=>()=>{b.dispose(),x.dispose()},[b]),s.createElement("primitive",(0,d.Z)({object:y,ref:c},l),s.createElement("primitive",{object:b,attach:"geometry"}),s.createElement("primitive",(0,d.Z)({object:x,attach:"material",color:t,vertexColors:!!n,resolution:[m.width,m.height],linewidth:null!==(p=null!=r?r:i)&&void 0!==p?p:1,dashed:a,transparent:4===g},l)))});var H=n(906);function N(e){let{position:t,color:n,onDrag:r,label:i}=e;(0,s.useRef)(null);let[a,u]=(0,s.useState)(!1);return(0,o.jsxs)("group",{position:t,children:[(0,o.jsx)(l.aL,{args:[.2,32,32],onPointerOver:()=>u(!0),onPointerOut:()=>u(!1),children:(0,o.jsx)("meshStandardMaterial",{color:n,emissive:n,emissiveIntensity:a?2:.5})}),(0,o.jsx)(c.x,{position:[0,.5,0],fontSize:.2,color:"white",font:"/fonts/Inter-Bold.ttf",children:i})]})}function T(e){let{onUnlock:t}=e,[n,r]=(0,s.useState)(new f.Vector3(0,2,0)),[i,l]=(0,s.useState)(new f.Vector3(-2,-1,0)),[d,h]=(0,s.useState)(new f.Vector3(2,-1,0)),[p,m]=(0,s.useState)(0),[v,y]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{let e=Math.max(0,100-20*Math.abs(.5*Math.abs(n.x*(i.y-d.y)+i.x*(d.y-n.y)+d.x*(n.y-i.y))-5.2));m(e),e>98&&!v&&(y(!0),setTimeout(t,2e3))},[n,i,d,t,v]),(0,o.jsxs)("div",{className:"w-full h-full bg-black/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 relative overflow-hidden flex flex-col",children:[(0,o.jsxs)("div",{className:"absolute top-8 left-8 z-10 font-mono",children:[(0,o.jsx)("h3",{className:"text-cyan-400 text-xs tracking-widest uppercase mb-1",children:"Gate 0: Triangle Cipher"}),(0,o.jsx)("h2",{className:"text-2xl text-white font-light tracking-tighter",children:"Align the Alchemical Vertices"})]}),(0,o.jsxs)(a.Xz,{camera:{position:[0,0,5]},children:[(0,o.jsx)("ambientLight",{intensity:.5}),(0,o.jsx)("pointLight",{position:[10,10,10]}),(0,o.jsx)(u.b,{speed:2,rotationIntensity:.5,floatIntensity:.5,children:(0,o.jsxs)("group",{children:[(0,o.jsx)(R,{points:[n,i,d,n],color:p>90?"#00f2ff":"#ff00cc",lineWidth:2}),(0,o.jsx)(N,{position:[n.x,n.y,n.z],color:"#ff00cc",label:"ALIF",onDrag:e=>r(e)}),(0,o.jsx)(N,{position:[i.x,i.y,i.z],color:"#00f2ff",label:"LAM",onDrag:e=>l(e)}),(0,o.jsx)(N,{position:[d.x,d.y,d.z],color:"#f59e0b",label:"MEEM",onDrag:e=>h(e)})]})}),(0,o.jsxs)(c.x,{position:[0,-2.5,0],fontSize:.3,color:"white",opacity:.5,children:[p.toFixed(2)," MHz"]})]}),(0,o.jsxs)("div",{className:"absolute bottom-8 left-8 right-8 flex justify-between items-end",children:[(0,o.jsxs)("div",{className:"space-y-2",children:[(0,o.jsx)("div",{className:"text-[10px] text-white/20 uppercase tracking-[0.4em]",children:"Resonance Level"}),(0,o.jsx)("div",{className:"w-48 h-1 bg-white/10 rounded-full overflow-hidden",children:(0,o.jsx)(H.E.div,{initial:{width:0},animate:{width:"".concat(p,"%")},className:"h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"})})]}),p>98&&(0,o.jsx)(H.E.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"text-cyan-400 font-mono text-xs uppercase tracking-widest animate-pulse",children:"GATE UNLOCKED // BISM"}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)("button",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all",onClick:()=>r(new f.Vector3(2*Math.random()-1,2*Math.random(),0)),children:"\uD83D\uDF0D"}),(0,o.jsx)("button",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all",onClick:()=>l(new f.Vector3(2*Math.random()-2,2*Math.random()-2,0)),children:"\uD83D\uDF04"}),(0,o.jsx)("button",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all",onClick:()=>h(new f.Vector3(2*Math.random()+1,2*Math.random()-2,0)),children:"\uD83D\uDF03"})]})]})]})}},6231:function(e,t,n){n.d(t,{i:function(){return r}});let r=parseInt(n(7776).REVISION.replace(/\D+/g,""))}}]);