"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[221],{4823:function(e,t,i){i.d(t,{KC:function(){return s},aL:function(){return a},fg:function(){return l}});var n=i(2988),r=i(2265);function o(e,t){let i=e+"Geometry";return r.forwardRef((e,o)=>{let{args:a,children:s,...l}=e,d=r.useRef(null);return r.useImperativeHandle(o,()=>d.current),r.useLayoutEffect(()=>void(null==t||t(d.current))),r.createElement("mesh",(0,n.Z)({ref:d},l),r.createElement(i,{attach:"geometry",args:a}),s)})}let a=o("sphere"),s=o("torus"),l=o("torusKnot")},8221:function(e,t,i){let n,r;i.r(t),i.d(t,{default:function(){return R}});var o=i(7437),a=i(2265),s=i(6777),l=i(4823),d=i(4379),c=i(789),f=i(2988),u=i(7776),h=i(705);let p=new u.Box3,m=new u.Vector3;class v extends u.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new u.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new u.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new u.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new u.InterleavedBufferAttribute(i,3,0)),this.setAttribute("instanceEnd",new u.InterleavedBufferAttribute(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let i;e instanceof Float32Array?i=e:Array.isArray(e)&&(i=new Float32Array(e));let n=new u.InstancedInterleavedBuffer(i,2*t,1);return this.setAttribute("instanceColorStart",new u.InterleavedBufferAttribute(n,t,0)),this.setAttribute("instanceColorEnd",new u.InterleavedBufferAttribute(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new u.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new u.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),p.setFromBufferAttribute(t),this.boundingBox.union(p))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new u.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,o=e.count;r<o;r++)m.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(m)),m.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(m));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var y=i(6231);class x extends u.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:u.UniformsUtils.clone(u.UniformsUtils.merge([u.UniformsLib.common,u.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new u.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let g=y.i>=125?"uv1":"uv2",w=new u.Vector4,b=new u.Vector3,S=new u.Vector3,E=new u.Vector4,_=new u.Vector4,A=new u.Vector4,L=new u.Vector3,U=new u.Matrix4,z=new u.Line3,M=new u.Vector3,B=new u.Box3,D=new u.Sphere,j=new u.Vector4;function C(e,t,i){return j.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),j.multiplyScalar(1/j.w),j.x=r/i.width,j.y=r/i.height,j.applyMatrix4(e.projectionMatrixInverse),j.multiplyScalar(1/j.w),Math.abs(Math.max(j.x,j.y))}class O extends u.Mesh{constructor(e=new v,t=new x({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,o=t.count;e<o;e++,r+=2)b.fromBufferAttribute(t,e),S.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+b.distanceTo(S);let r=new u.InstancedInterleavedBuffer(n,2,1);return e.setAttribute("instanceDistanceStart",new u.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new u.InterleavedBufferAttribute(r,1,1)),this}raycast(e,t){let i,o;let a=this.material.worldUnits,s=e.camera;null!==s||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let d=this.matrixWorld,c=this.geometry,f=this.material;if(r=f.linewidth+l,null===c.boundingSphere&&c.computeBoundingSphere(),D.copy(c.boundingSphere).applyMatrix4(d),a)i=.5*r;else{let e=Math.max(s.near,D.distanceToPoint(n.origin));i=C(s,e,f.resolution)}if(D.radius+=i,!1!==n.intersectsSphere(D)){if(null===c.boundingBox&&c.computeBoundingBox(),B.copy(c.boundingBox).applyMatrix4(d),a)o=.5*r;else{let e=Math.max(s.near,B.distanceToPoint(n.origin));o=C(s,e,f.resolution)}B.expandByScalar(o),!1!==n.intersectsBox(B)&&(a?function(e,t){let i=e.matrixWorld,o=e.geometry,a=o.attributes.instanceStart,s=o.attributes.instanceEnd,l=Math.min(o.instanceCount,a.count);for(let o=0;o<l;o++){z.start.fromBufferAttribute(a,o),z.end.fromBufferAttribute(s,o),z.applyMatrix4(i);let l=new u.Vector3,d=new u.Vector3;n.distanceSqToSegment(z.start,z.end,d,l),d.distanceTo(l)<.5*r&&t.push({point:d,pointOnLine:l,distance:n.origin.distanceTo(d),object:e,face:null,faceIndex:o,uv:null,[g]:null})}}(this,t):function(e,t,i){let o=t.projectionMatrix,a=e.material.resolution,s=e.matrixWorld,l=e.geometry,d=l.attributes.instanceStart,c=l.attributes.instanceEnd,f=Math.min(l.instanceCount,d.count),h=-t.near;n.at(1,A),A.w=1,A.applyMatrix4(t.matrixWorldInverse),A.applyMatrix4(o),A.multiplyScalar(1/A.w),A.x*=a.x/2,A.y*=a.y/2,A.z=0,L.copy(A),U.multiplyMatrices(t.matrixWorldInverse,s);for(let t=0;t<f;t++){if(E.fromBufferAttribute(d,t),_.fromBufferAttribute(c,t),E.w=1,_.w=1,E.applyMatrix4(U),_.applyMatrix4(U),E.z>h&&_.z>h)continue;if(E.z>h){let e=E.z-_.z,t=(E.z-h)/e;E.lerp(_,t)}else if(_.z>h){let e=_.z-E.z,t=(_.z-h)/e;_.lerp(E,t)}E.applyMatrix4(o),_.applyMatrix4(o),E.multiplyScalar(1/E.w),_.multiplyScalar(1/_.w),E.x*=a.x/2,E.y*=a.y/2,_.x*=a.x/2,_.y*=a.y/2,z.start.copy(E),z.start.z=0,z.end.copy(_),z.end.z=0;let l=z.closestPointToPointParameter(L,!0);z.at(l,M);let f=u.MathUtils.lerp(E.z,_.z,l),p=f>=-1&&f<=1,m=L.distanceTo(M)<.5*r;if(p&&m){z.start.fromBufferAttribute(d,t),z.end.fromBufferAttribute(c,t),z.start.applyMatrix4(s),z.end.applyMatrix4(s);let r=new u.Vector3,o=new u.Vector3;n.distanceSqToSegment(z.start,z.end,o,r),i.push({point:o,pointOnLine:r,distance:n.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[g]:null})}}}(this,s,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(w),this.material.uniforms.resolution.value.set(w.z,w.w))}}class I extends v{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,i=new Float32Array(2*t);for(let n=0;n<t;n+=3)i[2*n]=e[n],i[2*n+1]=e[n+1],i[2*n+2]=e[n+2],i[2*n+3]=e[n+3],i[2*n+4]=e[n+4],i[2*n+5]=e[n+5];return super.setPositions(i),this}setColors(e,t=3){let i=e.length-t,n=new Float32Array(2*i);if(3===t)for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];else for(let r=0;r<i;r+=t)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5],n[2*r+6]=e[r+6],n[2*r+7]=e[r+7];return super.setColors(n,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class N extends O{constructor(e=new I,t=new x({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let P=a.forwardRef(function(e,t){var i,n;let{points:r,color:o=16777215,vertexColors:s,linewidth:l,lineWidth:d,segments:c,dashed:p,...m}=e,y=(0,h.D)(e=>e.size),g=a.useMemo(()=>c?new O:new N,[c]),[w]=a.useState(()=>new x),b=(null==s||null==(i=s[0])?void 0:i.length)===4?4:3,S=a.useMemo(()=>{let e=c?new v:new I,t=r.map(e=>{let t=Array.isArray(e);return e instanceof u.Vector3||e instanceof u.Vector4?[e.x,e.y,e.z]:e instanceof u.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(e.setPositions(t.flat()),s){o=16777215;let t=s.map(e=>e instanceof u.Color?e.toArray():e);e.setColors(t.flat(),b)}return e},[r,c,s,b]);return a.useLayoutEffect(()=>{g.computeLineDistances()},[r,g]),a.useLayoutEffect(()=>{p?w.defines.USE_DASH="":delete w.defines.USE_DASH,w.needsUpdate=!0},[p,w]),a.useEffect(()=>()=>{S.dispose(),w.dispose()},[S]),a.createElement("primitive",(0,f.Z)({object:g,ref:t},m),a.createElement("primitive",{object:S,attach:"geometry"}),a.createElement("primitive",(0,f.Z)({object:w,attach:"material",color:o,vertexColors:!!s,resolution:[y.width,y.height],linewidth:null!==(n=null!=l?l:d)&&void 0!==n?n:1,dashed:p,transparent:4===b},m)))});var T=i(906);function V(e){let{position:t,color:i,onDrag:n,label:r}=e;(0,a.useRef)(null);let[s,c]=(0,a.useState)(!1);return(0,o.jsxs)("group",{position:t,children:[(0,o.jsx)(l.aL,{args:[.2,32,32],onPointerOver:()=>c(!0),onPointerOut:()=>c(!1),children:(0,o.jsx)("meshStandardMaterial",{color:i,emissive:i,emissiveIntensity:s?2:.5})}),(0,o.jsx)(d.x,{position:[0,.5,0],fontSize:.2,color:"white",font:"/fonts/Inter-Bold.ttf",children:r})]})}function R(e){let{onUnlock:t}=e,[i,n]=(0,a.useState)(new u.Vector3(0,2,0)),[r,l]=(0,a.useState)(new u.Vector3(-2,-1,0)),[f,h]=(0,a.useState)(new u.Vector3(2,-1,0)),[p,m]=(0,a.useState)(0),[v,y]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=Math.max(0,100-20*Math.abs(.5*Math.abs(i.x*(r.y-f.y)+r.x*(f.y-i.y)+f.x*(i.y-r.y))-5.2));m(e),e>98&&!v&&(y(!0),setTimeout(t,2e3))},[i,r,f,t,v]),(0,o.jsxs)("div",{className:"w-full h-full bg-black/40 backdrop-blur-3xl rounded-[3rem] border border-white/10 relative overflow-hidden flex flex-col",children:[(0,o.jsxs)("div",{className:"absolute top-8 left-8 z-10 font-mono",children:[(0,o.jsx)("h3",{className:"text-cyan-400 text-xs tracking-widest uppercase mb-1",children:"Gate 0: Triangle Cipher"}),(0,o.jsx)("h2",{className:"text-2xl text-white font-light tracking-tighter",children:"Align the Alchemical Vertices"})]}),(0,o.jsxs)(s.Xz,{camera:{position:[0,0,5]},children:[(0,o.jsx)("ambientLight",{intensity:.5}),(0,o.jsx)("pointLight",{position:[10,10,10]}),(0,o.jsx)(c.b,{speed:2,rotationIntensity:.5,floatIntensity:.5,children:(0,o.jsxs)("group",{children:[(0,o.jsx)(P,{points:[i,r,f,i],color:p>90?"#00f2ff":"#ff00cc",lineWidth:2}),(0,o.jsx)(V,{position:[i.x,i.y,i.z],color:"#ff00cc",label:"ALIF",onDrag:e=>n(e)}),(0,o.jsx)(V,{position:[r.x,r.y,r.z],color:"#00f2ff",label:"LAM",onDrag:e=>l(e)}),(0,o.jsx)(V,{position:[f.x,f.y,f.z],color:"#f59e0b",label:"MEEM",onDrag:e=>h(e)})]})}),(0,o.jsxs)(d.x,{position:[0,-2.5,0],fontSize:.3,color:"white",fillOpacity:.5,children:[p.toFixed(2)," MHz"]})]}),(0,o.jsxs)("div",{className:"absolute bottom-8 left-8 right-8 flex justify-between items-end",children:[(0,o.jsxs)("div",{className:"space-y-2",children:[(0,o.jsx)("div",{className:"text-[10px] text-white/20 uppercase tracking-[0.4em]",children:"Resonance Level"}),(0,o.jsx)("div",{className:"w-48 h-1 bg-white/10 rounded-full overflow-hidden",children:(0,o.jsx)(T.E.div,{initial:{width:0},animate:{width:"".concat(p,"%")},className:"h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]"})})]}),p>98&&(0,o.jsx)(T.E.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},className:"text-cyan-400 font-mono text-xs uppercase tracking-widest animate-pulse",children:"GATE UNLOCKED // BISM"}),(0,o.jsxs)("div",{className:"flex gap-2",children:[(0,o.jsx)("button",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all",onClick:()=>n(new u.Vector3(2*Math.random()-1,2*Math.random(),0)),children:"\uD83D\uDF0D"}),(0,o.jsx)("button",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all",onClick:()=>l(new u.Vector3(2*Math.random()-2,2*Math.random()-2,0)),children:"\uD83D\uDF04"}),(0,o.jsx)("button",{className:"w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all",onClick:()=>h(new u.Vector3(2*Math.random()+1,2*Math.random()-2,0)),children:"\uD83D\uDF03"})]})]})]})}}}]);