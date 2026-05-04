"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[457],{2404:function(e,t,n){let i,r;n.d(t,{x:function(){return O}});var o=n(2988),a=n(2265),s=n(7776),l=n(705);let d=new s.Box3,c=new s.Vector3;class u extends s.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new s.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new s.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new s.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new s.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new s.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new s.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new s.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new s.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new s.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new s.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),d.setFromBufferAttribute(t),this.boundingBox.union(d))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new s.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)c.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(c)),c.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=n(6231);class p extends s.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:s.UniformsUtils.clone(s.UniformsUtils.merge([s.UniformsLib.common,s.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new s.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${f.i>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let h=f.i>=125?"uv1":"uv2",m=new s.Vector4,v=new s.Vector3,g=new s.Vector3,y=new s.Vector4,x=new s.Vector4,b=new s.Vector4,S=new s.Vector3,w=new s.Matrix4,_=new s.Line3,E=new s.Vector3,A=new s.Box3,M=new s.Sphere,C=new s.Vector4;function L(e,t,n){return C.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),C.multiplyScalar(1/C.w),C.x=r/n.width,C.y=r/n.height,C.applyMatrix4(e.projectionMatrixInverse),C.multiplyScalar(1/C.w),Math.abs(Math.max(C.x,C.y))}class P extends s.Mesh{constructor(e=new u,t=new p({color:16777215*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,o=t.count;e<o;e++,r+=2)v.fromBufferAttribute(t,e),g.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+v.distanceTo(g);let r=new s.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new s.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new s.InterleavedBufferAttribute(r,1,1)),this}raycast(e,t){let n,o;let a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let d=void 0!==e.params.Line2&&e.params.Line2.threshold||0;i=e.ray;let c=this.matrixWorld,u=this.geometry,f=this.material;if(r=f.linewidth+d,null===u.boundingSphere&&u.computeBoundingSphere(),M.copy(u.boundingSphere).applyMatrix4(c),a)n=.5*r;else{let e=Math.max(l.near,M.distanceToPoint(i.origin));n=L(l,e,f.resolution)}if(M.radius+=n,!1!==i.intersectsSphere(M)){if(null===u.boundingBox&&u.computeBoundingBox(),A.copy(u.boundingBox).applyMatrix4(c),a)o=.5*r;else{let e=Math.max(l.near,A.distanceToPoint(i.origin));o=L(l,e,f.resolution)}A.expandByScalar(o),!1!==i.intersectsBox(A)&&(a?function(e,t){let n=e.matrixWorld,o=e.geometry,a=o.attributes.instanceStart,l=o.attributes.instanceEnd,d=Math.min(o.instanceCount,a.count);for(let o=0;o<d;o++){_.start.fromBufferAttribute(a,o),_.end.fromBufferAttribute(l,o),_.applyMatrix4(n);let d=new s.Vector3,c=new s.Vector3;i.distanceSqToSegment(_.start,_.end,c,d),c.distanceTo(d)<.5*r&&t.push({point:c,pointOnLine:d,distance:i.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[h]:null})}}(this,t):function(e,t,n){let o=t.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,d=e.geometry,c=d.attributes.instanceStart,u=d.attributes.instanceEnd,f=Math.min(d.instanceCount,c.count),p=-t.near;i.at(1,b),b.w=1,b.applyMatrix4(t.matrixWorldInverse),b.applyMatrix4(o),b.multiplyScalar(1/b.w),b.x*=a.x/2,b.y*=a.y/2,b.z=0,S.copy(b),w.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<f;t++){if(y.fromBufferAttribute(c,t),x.fromBufferAttribute(u,t),y.w=1,x.w=1,y.applyMatrix4(w),x.applyMatrix4(w),y.z>p&&x.z>p)continue;if(y.z>p){let e=y.z-x.z,t=(y.z-p)/e;y.lerp(x,t)}else if(x.z>p){let e=x.z-y.z,t=(x.z-p)/e;x.lerp(y,t)}y.applyMatrix4(o),x.applyMatrix4(o),y.multiplyScalar(1/y.w),x.multiplyScalar(1/x.w),y.x*=a.x/2,y.y*=a.y/2,x.x*=a.x/2,x.y*=a.y/2,_.start.copy(y),_.start.z=0,_.end.copy(x),_.end.z=0;let d=_.closestPointToPointParameter(S,!0);_.at(d,E);let f=s.MathUtils.lerp(y.z,x.z,d),m=f>=-1&&f<=1,v=S.distanceTo(E)<.5*r;if(m&&v){_.start.fromBufferAttribute(c,t),_.end.fromBufferAttribute(u,t),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let r=new s.Vector3,o=new s.Vector3;i.distanceSqToSegment(_.start,_.end,o,r),n.push({point:o,pointOnLine:r,distance:i.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[h]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(m),this.material.uniforms.resolution.value.set(m.z,m.w))}}class z extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class U extends P{constructor(e=new z,t=new p({color:16777215*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let O=a.forwardRef(function(e,t){var n,i;let{points:r,color:d=16777215,vertexColors:c,linewidth:f,lineWidth:h,segments:m,dashed:v,...g}=e,y=(0,l.D)(e=>e.size),x=a.useMemo(()=>m?new P:new U,[m]),[b]=a.useState(()=>new p),S=(null==c||null==(n=c[0])?void 0:n.length)===4?4:3,w=a.useMemo(()=>{let e=m?new u:new z,t=r.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(e.setPositions(t.flat()),c){d=16777215;let t=c.map(e=>e instanceof s.Color?e.toArray():e);e.setColors(t.flat(),S)}return e},[r,m,c,S]);return a.useLayoutEffect(()=>{x.computeLineDistances()},[r,x]),a.useLayoutEffect(()=>{v?b.defines.USE_DASH="":delete b.defines.USE_DASH,b.needsUpdate=!0},[v,b]),a.useEffect(()=>()=>{w.dispose(),b.dispose()},[w]),a.createElement("primitive",(0,o.Z)({object:x,ref:t},g),a.createElement("primitive",{object:w,attach:"geometry"}),a.createElement("primitive",(0,o.Z)({object:b,attach:"material",color:d,vertexColors:!!c,resolution:[y.width,y.height],linewidth:null!==(i=null!=f?f:h)&&void 0!==i?i:1,dashed:v,transparent:4===S},g)))})},5471:function(e,t,n){n.d(t,{P:function(){return h}});var i=n(2988),r=n(2265),o=n(7776),a=n(705),s=n(9449);class l extends o.ShaderMaterial{get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:"\n        uniform float pixelRatio;\n        uniform float time;\n        attribute float size;  \n        attribute float speed;  \n        attribute float opacity;\n        attribute vec3 noise;\n        attribute vec3 color;\n        varying vec3 vColor;\n        varying float vOpacity;\n\n        void main() {\n          vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;\n          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;\n          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;\n          vec4 viewPosition = viewMatrix * modelPosition;\n          vec4 projectionPostion = projectionMatrix * viewPosition;\n          gl_Position = projectionPostion;\n          gl_PointSize = size * 25. * pixelRatio;\n          gl_PointSize *= (1.0 / - viewPosition.z);\n          vColor = color;\n          vOpacity = opacity;\n        }\n      ",fragmentShader:"\n        varying vec3 vColor;\n        varying float vOpacity;\n        void main() {\n          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n          float strength = 0.05 / distanceToCenter - 0.1;\n          gl_FragColor = vec4(vColor, strength * vOpacity);\n          #include <tonemapping_fragment>\n          #include <".concat(s.i>=154?"colorspace_fragment":"encodings_fragment",">\n        }\n      ")})}}let d=e=>e&&e.constructor===Float32Array,c=e=>[e.r,e.g,e.b],u=e=>e instanceof o.Vector2||e instanceof o.Vector3||e instanceof o.Vector4,f=e=>Array.isArray(e)?e:u(e)?e.toArray():[e,e,e];function p(e,t,n){return r.useMemo(()=>{if(void 0!==t){if(d(t))return t;if(t instanceof o.Color){let n=Array.from({length:3*e},()=>c(t)).flat();return Float32Array.from(n)}if(u(t)||Array.isArray(t)){let n=Array.from({length:3*e},()=>f(t)).flat();return Float32Array.from(n)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},n)},[t])}let h=r.forwardRef((e,t)=>{let{noise:n=1,count:s=100,speed:c=1,opacity:u=1,scale:h=1,size:m,color:v,children:g,...y}=e;r.useMemo(()=>(0,a.e)({SparklesImplMaterial:l}),[]);let x=r.useRef(null),b=(0,a.D)(e=>e.viewport.dpr),S=f(h),w=r.useMemo(()=>Float32Array.from(Array.from({length:s},()=>S.map(o.MathUtils.randFloatSpread)).flat()),[s,...S]),_=p(s,m,Math.random),E=p(s,u),A=p(s,c),M=p(3*s,n),C=p(void 0===v?3*s:s,d(v)?v:new o.Color(v),()=>1);return(0,a.F)(e=>{x.current&&x.current.material&&(x.current.material.time=e.clock.elapsedTime)}),r.useImperativeHandle(t,()=>x.current,[]),r.createElement("points",(0,i.Z)({key:"particle-".concat(s,"-").concat(JSON.stringify(h))},y,{ref:x}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[w,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[_,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[E,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[A,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[C,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[M,3]})),g||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:b,depthWrite:!1}))})},5733:function(e,t,n){n.d(t,{Z:function(){return i}});let i=(0,n(8030).Z)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},4341:function(e,t,n){n.d(t,{Z:function(){return i}});let i=(0,n(8030).Z)("shield-alert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]])},7818:function(e,t,n){n.d(t,{default:function(){return r.a}});var i=n(551),r=n.n(i)},551:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let i=n(9920);n(7437),n(2265);let r=i._(n(148));function o(e,t){var n;let i={loading:e=>{let{error:t,isLoading:n,pastDelay:i}=e;return null}};"function"==typeof e&&(i.loader=e);let o={...i,...t};return(0,r.default)({...o,modules:null==(n=o.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},148:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let i=n(7437),r=n(2265),o=n(912),a=n(1481);function s(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(s(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},n=(0,r.lazy)(()=>t.loader().then(s)),d=t.loading;function c(e){let s=d?(0,i.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=t.ssr?(0,i.jsxs)(i.Fragment,{children:["undefined"==typeof window?(0,i.jsx)(a.PreloadCss,{moduleIds:t.modules}):null,(0,i.jsx)(n,{...e})]}):(0,i.jsx)(o.BailoutToCSR,{reason:"next/dynamic",children:(0,i.jsx)(n,{...e})});return(0,i.jsx)(r.Suspense,{fallback:s,children:l})}return c.displayName="LoadableComponent",c}},5110:function(e,t,n){n.d(t,{D:function(){return u}});var i=n(2265),r=n(705),o=n(7776),a=n(6773);class s{updateMesh(){let e=this.controller.joints,t=!0;for(let n=0;n<this.bones.length;n++){let i=this.bones[n];if(i){let n=e[i.jointName];if(n.visible){let e=n.position;i.position.copy(e),i.quaternion.copy(n.quaternion),t=!1}}}t&&this.scene?this.scene.visible=!1:this.scene&&(this.scene.visible=!0)}dispose(){this.scene&&this.handModel.remove(this.scene)}constructor(e,t,n="https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles/generic-hand/",i,r){this.controller=t,this.handModel=e,this.bones=[];let o=new a.E;r||o.setPath(n),o.load(null!=r?r:"".concat(i,".glb"),e=>{let t=e.scene.children[0];this.handModel.add(t),this.scene=t;let n=t.getObjectByProperty("type","SkinnedMesh");n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,["wrist","thumb-metacarpal","thumb-phalanx-proximal","thumb-phalanx-distal","thumb-tip","index-finger-metacarpal","index-finger-phalanx-proximal","index-finger-phalanx-intermediate","index-finger-phalanx-distal","index-finger-tip","middle-finger-metacarpal","middle-finger-phalanx-proximal","middle-finger-phalanx-intermediate","middle-finger-phalanx-distal","middle-finger-tip","ring-finger-metacarpal","ring-finger-phalanx-proximal","ring-finger-phalanx-intermediate","ring-finger-phalanx-distal","ring-finger-tip","pinky-finger-metacarpal","pinky-finger-phalanx-proximal","pinky-finger-phalanx-intermediate","pinky-finger-phalanx-distal","pinky-finger-tip"].forEach(e=>{let n=t.getObjectByName(e);void 0!==n?n.jointName=e:console.warn("Couldn't find ".concat(e," in ").concat(i," hand mesh")),this.bones.push(n)})})}}class l extends o.Object3D{motionControllerCleanup(){var e;this.clear(),null==(e=this.motionController)||e.dispose(),this.motionController=null}updateMatrixWorld(e){super.updateMatrixWorld(e),this.motionController&&this.motionController.updateMesh()}getPointerPosition(){let e=this.controller.joints["index-finger-tip"];return e?e.position:null}intersectBoxObject(e){let t=this.getPointerPosition();if(!t)return!1;{let n=new o.Sphere(t,.01),i=new o.Box3().setFromObject(e);return n.intersectsBox(i)}}checkButton(e){this.intersectBoxObject(e)?e.onPress():e.onClear(),e.isPressed()&&e.whilePressed()}dispose(){this.motionControllerCleanup(),this.controller.removeEventListener("connected",this._onConnected),this.controller.removeEventListener("disconnected",this._onDisconnected)}constructor(e,t,n){super(),this._onConnected=e=>{let t=e.data;t.hand&&!this.motionController&&(this.xrInputSource=t,this.motionController=new s(this,this.controller,void 0,t.handedness,"left"===t.handedness?this.leftModelPath:this.rightModelPath))},this._onDisconnected=()=>{var e;(null==(e=this.xrInputSource)?void 0:e.hand)&&this.motionControllerCleanup()},this.controller=e,this.motionController=null,this.envMap=null,this.leftModelPath=t,this.rightModelPath=n,this.mesh=null,this.xrInputSource=null,e.addEventListener("connected",this._onConnected),e.addEventListener("disconnected",this._onDisconnected)}}var d=n(8959),c=n(839);function u(e){let{modelLeft:t,modelRight:n}=e,o=(0,d.nH)(e=>e.controllers);return i.useMemo(()=>(0,r.e)({OculusHandModel:l}),[]),(0,c.LI)(()=>{for(let e of o)e.hand.dispatchEvent({type:"connected",data:e.inputSource,fake:!0})},[o,t,n]),i.createElement(i.Fragment,null,o.map(e=>{let{hand:o}=e;return(0,r.h)(i.createElement("oculusHandModel",{args:[o,t,n]}),o)}))}},9291:function(e,t,n){n.d(t,{tJ:function(){return r}});let i=e=>t=>{try{let n=e(t);if(n instanceof Promise)return n;return{then:e=>i(e)(n),catch(e){return this}}}catch(e){return{then(e){return this},catch:t=>i(t)(e)}}},r=(e,t)=>(n,r,o)=>{let a,s={storage:function(e,t){let n;try{n=e()}catch(e){return}return{getItem:e=>{var t;let i=e=>null===e?null:JSON.parse(e,void 0),r=null!=(t=n.getItem(e))?t:null;return r instanceof Promise?r.then(i):i(r)},setItem:(e,t)=>n.setItem(e,JSON.stringify(t,void 0)),removeItem:e=>n.removeItem(e)}}(()=>window.localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},l=!1,d=0,c=new Set,u=new Set,f=s.storage;if(!f)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`),n(...e)},r,o);let p=()=>{let e=s.partialize({...r()});return f.setItem(s.name,{state:e,version:s.version})},h=o.setState;o.setState=(e,t)=>(h(e,t),p());let m=e((...e)=>(n(...e),p()),r,o);o.getInitialState=()=>m;let v=()=>{var e,t;if(!f)return;let o=++d;l=!1,c.forEach(e=>{var t;return e(null!=(t=r())?t:m)});let h=(null==(t=s.onRehydrateStorage)?void 0:t.call(s,null!=(e=r())?e:m))||void 0;return i(f.getItem.bind(f))(s.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===s.version)return[!1,e.state];if(s.migrate){let t=s.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(e=>{var t;if(o!==d)return;let[i,l]=e;if(n(a=s.merge(l,null!=(t=r())?t:m),!0),i)return p()}).then(()=>{o===d&&(null==h||h(r(),void 0),a=r(),l=!0,u.forEach(e=>e(a)))}).catch(e=>{o===d&&(null==h||h(void 0,e))})};return o.persist={setOptions:e=>{s={...s,...e},e.storage&&(f=e.storage)},clearStorage:()=>{null==f||f.removeItem(s.name)},getOptions:()=>s,rehydrate:()=>v(),hasHydrated:()=>l,onHydrate:e=>(c.add(e),()=>{c.delete(e)}),onFinishHydration:e=>(u.add(e),()=>{u.delete(e)})},s.skipHydration||v(),a||m}}}]);