import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/* =========================================================================
   Hero 3D — construction d'une maison pilotée par le scroll.
   s (0 → 11) : 0 Plan · 1 Implantation · 2 Fondations · 3 Murs · 4 Ossature
   5 Contreventement · 6 Hors d'eau · 7 Brique · 8 Extérieur · 9 Finitions
   10 Bienvenue.  La caméra fait le tour du chantier (0° → 360°) de 2 à 10.
   ========================================================================= */

export const STAGES = 11

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (t) => t * t * (3 - 2 * t)
const range = (s, a, b) => clamp((s - a) / (b - a))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function mulberry32(a) {
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Angle de la caméra autour du chantier (en degrés) pour une valeur de s. */
export const orbitDegrees = (s) => clamp((s - 2) * 45, 0, 360)

export function createHouseScene(canvas, { mobile = false } = {}) {
  const rnd = mulberry32(1947)
  const disposables = []
  const keep = (x) => (disposables.push(x), x)

  /* ---------------- Renderer / scène ---------------- */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  const DPR = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2)
  renderer.setPixelRatio(DPR)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.shadowMap.enabled = !mobile
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.localClippingEnabled = true

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x0e0e0e, 0.1, 0.2)
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1500)

  /* ---------------- Ciel ---------------- */
  const skyU = {
    top: { value: new THREE.Color() },
    horizon: { value: new THREE.Color() },
    bottom: { value: new THREE.Color() },
  }
  const sky = new THREE.Mesh(
    keep(new THREE.SphereGeometry(900, 32, 16)),
    keep(
      new THREE.ShaderMaterial({
        uniforms: skyU,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `uniform vec3 top; uniform vec3 horizon; uniform vec3 bottom; varying vec3 vDir;
          void main(){ float h = vDir.y; vec3 c = h > 0.0 ? mix(horizon, top, pow(clamp(h*1.6,0.0,1.0), 0.7)) : mix(horizon, bottom, clamp(-h*4.0,0.0,1.0));
          gl_FragColor = vec4(c, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          }`,
      }),
    ),
  )
  sky.renderOrder = -1
  scene.add(sky)

  /* ---------------- Lumières ---------------- */
  const hemi = new THREE.HemisphereLight(0xc4d0e8, 0x4a3b2a, 1.3)
  scene.add(hemi)
  const sun = new THREE.DirectionalLight(0xffe2c4, 1.8)
  sun.position.set(34, 30, 42)
  sun.target.position.set(-3, 0, 0)
  sun.castShadow = !mobile
  sun.shadow.mapSize.set(2048, 2048)
  Object.assign(sun.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 140 })
  sun.shadow.bias = -0.0004
  sun.shadow.normalBias = 0.03
  scene.add(sun, sun.target)

  /* ---------------- Textures dessinées ---------------- */
  function canvasTex(w, h, draw, srgb = true) {
    const cv = document.createElement('canvas')
    cv.width = w
    cv.height = h
    draw(cv.getContext('2d'), w, h)
    const t = keep(new THREE.CanvasTexture(cv))
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.anisotropy = 4
    if (srgb) t.colorSpace = THREE.SRGBColorSpace
    return t
  }
  // Les UV des murs et des boîtes sont en mètres : repeat = 1 / taille de la tuile
  const tile = (t, w, h) => (t.repeat.set(1 / w, 1 / h), t)
  const noise = (g, w, h, n, colors, size = [1, 3]) => {
    for (let i = 0; i < n; i++) {
      g.fillStyle = colors[(rnd() * colors.length) | 0]
      const s = size[0] + rnd() * (size[1] - size[0])
      g.fillRect(rnd() * w, rnd() * h, s, s * (0.5 + rnd()))
    }
  }

  const osbTex = tile(
    canvasTex(256, 256, (g, w, h) => {
      g.fillStyle = '#c9a26b'
      g.fillRect(0, 0, w, h)
      for (let i = 0; i < 900; i++) {
        g.save()
        g.translate(rnd() * w, rnd() * h)
        g.rotate(rnd() * Math.PI)
        g.fillStyle = ['#b88d55', '#d8b47c', '#a97f4a', '#e0bf8a', '#9c7444'][(rnd() * 5) | 0]
        g.fillRect(-8, -2, 10 + rnd() * 14, 3 + rnd() * 4)
        g.restore()
      }
      g.strokeStyle = 'rgba(80,55,30,.5)'
      g.lineWidth = 2
      g.strokeRect(0, 0, w, h)
    }),
    1.22,
    1.22,
  )
  const wrapTex = tile(
    canvasTex(512, 256, (g, w, h) => {
      g.fillStyle = '#eef0f2'
      g.fillRect(0, 0, w, h)
      noise(g, w, h, 600, ['rgba(0,0,0,.035)', 'rgba(255,255,255,.5)'], [1, 4])
      g.fillStyle = 'rgba(70,90,120,.55)'
      g.font = 'bold 30px Arial, sans-serif'
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++) g.fillText('HOUSEWRAP', c * 180 + (r % 2) * 90 - 40, 60 + r * 80)
      g.strokeStyle = 'rgba(0,0,0,.12)'
      g.beginPath()
      g.moveTo(0, h - 1)
      g.lineTo(w, h - 1)
      g.stroke()
    }),
    2.6,
    1.3,
  )
  const sidingTex = tile(
    canvasTex(256, 256, (g, w, h) => {
      const n = 8
      const bh = h / n
      for (let i = 0; i < n; i++) {
        const grd = g.createLinearGradient(0, i * bh, 0, (i + 1) * bh)
        grd.addColorStop(0, '#fbfbf9')
        grd.addColorStop(0.85, '#e9e8e4')
        grd.addColorStop(1, '#bdbcb7')
        g.fillStyle = grd
        g.fillRect(0, i * bh, w, bh)
      }
    }),
    2,
    1.44,
  )
  function brick(painted) {
    return canvasTex(256, 192, (g, w, h) => {
      g.fillStyle = painted ? '#d9d6cf' : '#5b4d44'
      g.fillRect(0, 0, w, h)
      const rows = 8
      const bw = w / 4
      const bh = h / rows
      for (let r = 0; r < rows; r++)
        for (let c = -1; c < 5; c++) {
          const x = c * bw + (r % 2) * bw * 0.5
          const v = rnd()
          g.fillStyle = painted
            ? `hsl(40, 12%, ${90 + v * 6}%)`
            : `hsl(${8 + v * 10}, ${45 + v * 15}%, ${30 + v * 14}%)`
          g.fillRect(x + 2, r * bh + 2, bw - 4, bh - 4)
        }
    })
  }
  const brickTex = tile(brick(false), 0.8, 0.6)
  const paintedBrickTex = tile(brick(true), 0.8, 0.6)
  const shingleTex = tile(
    canvasTex(256, 256, (g, w, h) => {
      g.fillStyle = '#2b2d31'
      g.fillRect(0, 0, w, h)
      const rows = 8
      const rh = h / rows
      for (let r = 0; r < rows; r++)
        for (let c = -1; c < 9; c++) {
          const x = c * 32 + (r % 2) * 16
          const v = rnd()
          g.fillStyle = `hsl(220, 5%, ${15 + v * 9}%)`
          g.fillRect(x + 1, r * rh + 1, 30, rh - 3)
        }
      noise(g, w, h, 800, ['rgba(255,255,255,.05)', 'rgba(0,0,0,.25)'], [1, 2])
    }),
    1.1,
    1.1,
  )
  const concreteTex = tile(
    canvasTex(256, 256, (g, w, h) => {
      g.fillStyle = '#a7a39b'
      g.fillRect(0, 0, w, h)
      noise(g, w, h, 2500, ['#9c988f', '#b3afa7', '#8f8b83', '#bab6ae'], [1, 3])
    }),
    2,
    2,
  )
  const dirtTex = tile(
    canvasTex(512, 512, (g, w, h) => {
      g.fillStyle = '#5a4634'
      g.fillRect(0, 0, w, h)
      noise(g, w, h, 5000, ['#4b3a2b', '#6a5440', '#3f3126', '#755e48', '#58483a'], [1, 5])
      g.strokeStyle = 'rgba(30,20,12,.25)'
      g.lineWidth = 9
      for (let i = 0; i < 6; i++) {
        g.beginPath()
        g.moveTo(rnd() * w, 0)
        g.bezierCurveTo(rnd() * w, h * 0.3, rnd() * w, h * 0.7, rnd() * w, h)
        g.stroke()
      }
    }),
    7,
    7,
  )
  const grassTex = tile(
    canvasTex(256, 256, (g, w, h) => {
      g.fillStyle = '#3f6a2c'
      g.fillRect(0, 0, w, h)
      noise(g, w, h, 6000, ['#36602a', '#4a7834', '#2f5524', '#567f3a', '#3b6630'], [1, 3])
    }),
    3,
    3,
  )
  const garageTex = tile(
    canvasTex(64, 256, (g, w, h) => {
      g.fillStyle = '#26282b'
      g.fillRect(0, 0, w, h)
      g.fillStyle = '#1a1b1d'
      for (let i = 1; i < 5; i++) g.fillRect(0, (i * h) / 5 - 2, w, 4)
    }),
    3,
    2.3,
  )

  /* ---------------- Matériaux ---------------- */
  const clipY = () => [new THREE.Plane(new THREE.Vector3(0, -1, 0), -100)]
  const mat = (o) => keep(new THREE.MeshStandardMaterial({ roughness: 0.85, ...o }))
  const M = {
    concrete: mat({ map: concreteTex, color: 0xd6d3cc }),
    deck: mat({ map: osbTex }),
    lumber: mat({ color: 0xffffff, roughness: 0.8 }),
    plate: mat({ color: 0xd8b07a, roughness: 0.8 }),
    youngLeaf: mat({ color: 0x3b5f2a, roughness: 0.95, flatShading: true }),
    osbWall: mat({ map: osbTex, clippingPlanes: clipY() }),
    wrap: mat({ map: wrapTex, roughness: 0.6, clippingPlanes: clipY() }),
    siding: mat({ map: sidingTex, roughness: 0.7, clippingPlanes: clipY() }),
    osbRoof: mat({ map: osbTex, clippingPlanes: clipY() }),
    shingle: mat({ map: shingleTex, roughness: 0.9, clippingPlanes: clipY() }),
    brick: mat({ map: brickTex, roughness: 0.95, clippingPlanes: clipY() }),
    paintedBrick: mat({ map: paintedBrickTex, roughness: 0.9, clippingPlanes: clipY() }),
    frame: mat({ color: 0x15171a, roughness: 0.5, metalness: 0.3, transparent: true, opacity: 0 }),
    glass: mat({ color: 0x1b242c, roughness: 0.08, metalness: 0.6, emissive: 0xffb866, emissiveIntensity: 0, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    glassDim: mat({ color: 0x1b242c, roughness: 0.08, metalness: 0.6, emissive: 0xffb866, emissiveIntensity: 0, transparent: true, opacity: 0, side: THREE.DoubleSide }),
    trim: mat({ color: 0xf6f5f1, roughness: 0.6, transparent: true, opacity: 0 }),
    shutter: mat({ color: 0x17191c, roughness: 0.55, transparent: true, opacity: 0 }),
    door: mat({ color: 0x8e1b1d, roughness: 0.45 }), // rouge du logo
    garage: mat({ map: garageTex, roughness: 0.5 }),
    white: mat({ color: 0xf2f1ed, roughness: 0.6 }),
    stake: mat({ color: 0xc9a46a }),
    ground: mat({ map: dirtTex, roughness: 1 }),
    grass: mat({ map: grassTex, roughness: 1 }),
    paving: mat({ map: concreteTex, color: 0xe0ddd6, roughness: 0.9 }),
    leaf: mat({ color: 0xffffff, roughness: 0.95, flatShading: true }),
    bark: mat({ color: 0x3b2e24 }),
    lamp: mat({ color: 0x222222, emissive: 0xffc27a, emissiveIntensity: 0 }),
  }

  /* ---------------- Outils géométrie ---------------- */
  const m4 = (x, y, z, ry = 0, rx = 0, rz = 0, sx = 1, sy = 1, sz = 1) =>
    new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')),
      new THREE.Vector3(sx, sy, sz),
    )
  // Boîte dont les UV sont en mètres (pour que les textures gardent leur échelle)
  function boxM(w, h, d) {
    const g = new THREE.BoxGeometry(w, h, d)
    const uv = g.attributes.uv
    const n = g.attributes.normal
    for (let i = 0; i < uv.count; i++) {
      const ax = Math.abs(n.getX(i))
      const ay = Math.abs(n.getY(i))
      const [su, sv] = ax > 0.5 ? [d, h] : ay > 0.5 ? [w, d] : [w, h]
      uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv)
    }
    return g
  }
  // Collecteur : fusionne les morceaux par matériau en un seul mesh (peu d'appels de rendu)
  function batch() {
    const parts = {}
    return {
      add(key, geom, matrix) {
        const g = geom.index ? geom.toNonIndexed() : geom
        if (g !== geom) geom.dispose()
        if (matrix) g.applyMatrix4(matrix)
        ;(parts[key] ||= []).push(g)
      },
      mesh(key, material, { shadow = true } = {}) {
        if (!parts[key]) return null
        const g = keep(mergeGeometries(parts[key], false))
        parts[key].forEach((p) => p.dispose())
        const m = new THREE.Mesh(g, material)
        m.castShadow = shadow
        m.receiveShadow = true
        return m
      },
      geoms: (key) => parts[key] || [],
    }
  }

  /* =========================================================================
     LA MAISON — plan
     Corps principal x[-8, 8] z[-4.5, 4.5] (R+1), garage x[-15, -8] z[-3.5, 4.5]
     ========================================================================= */
  const T = 0.25
  const F0 = 0.9 // dessus des fondations (rez-de-chaussée)
  const FH = 2.9
  const F1 = F0 + FH
  const EAVE = F1 + FH // 6.7
  const RIDGE = 10.5
  const G0 = 0.3 // dalle du garage
  const GH = 3.4
  const DY = 7.6 // pied des lucarnes

  const win = (c, w = 1.0, sill = 0.85, ht = 1.55, extra = {}) => ({ c, w, sill, ht, ...extra })
  const door = (c, w = 1.1, ht = 2.25, extra = {}) => ({ c, w, sill: 0, ht, door: true, ...extra })

  // axis 'x' : mur le long de x, à z = fixed · axis 'z' : mur le long de z, à x = fixed
  // out : sens de la façade extérieure (+1 / -1) · rise : pignon triangulaire
  const walls = [
    // --- Rez-de-chaussée
    { lvl: 0, axis: 'x', fixed: 4.5, out: 1, a: -8 - T / 2, b: 8 + T / 2, y0: F0, h: FH,
      ops: [win(-6.2, 1, 0.85, 1.55, { sh: 1 }), win(-4.2, 1, 0.85, 1.55, { sh: 1 }), door(0, 1.15, 2.3, { front: 1 }), win(4.2, 1, 0.85, 1.55, { sh: 1 }), win(6.2, 1, 0.85, 1.55, { sh: 1 })] },
    { lvl: 0, axis: 'x', fixed: -4.5, out: -1, a: -8 - T / 2, b: 8 + T / 2, y0: F0, h: FH,
      ops: [win(-5.6), win(-3.2), door(0.4, 2.4, 2.3, { glass: 1 }), win(3.6), win(6)] },
    { lvl: 0, axis: 'z', fixed: 8, out: 1, a: -4.5 + T / 2, b: 4.5 - T / 2, y0: F0, h: FH, ops: [win(-2.6), win(2.6)] },
    { lvl: 0, axis: 'z', fixed: -8, out: -1, a: -4.5 + T / 2, b: -3.5 - T / 2, y0: F0, h: FH, ops: [] },
    // --- Étage
    { lvl: 1, axis: 'x', fixed: 4.5, out: 1, a: -8 - T / 2, b: -2.5, y0: F1, h: FH, ops: [win(-6.2, 1, 0.8, 1.45, { sh: 1 }), win(-4.2, 1, 0.8, 1.45, { sh: 1 })] },
    { lvl: 1, axis: 'x', fixed: 4.5, out: 1, a: -2.5, b: 2.5, y0: F1, h: FH, rise: 3,
      ops: [win(-0.85, 0.85, 0.8, 1.45, { sh: 1 }), win(0.85, 0.85, 0.8, 1.45, { sh: 1 }), win(0, 0.6, 3.75, 0.7)] },
    { lvl: 1, axis: 'x', fixed: 4.5, out: 1, a: 2.5, b: 8 + T / 2, y0: F1, h: FH, ops: [win(4.2, 1, 0.8, 1.45, { sh: 1 }), win(6.2, 1, 0.8, 1.45, { sh: 1 })] },
    { lvl: 1, axis: 'x', fixed: -4.5, out: -1, a: -8 - T / 2, b: 8 + T / 2, y0: F1, h: FH,
      ops: [win(-5.6, 1, 0.8, 1.45), win(-3.2, 1, 0.8, 1.45), win(0.4, 1, 0.8, 1.45), win(3.6, 1, 0.8, 1.45), win(6, 1, 0.8, 1.45)] },
    { lvl: 1, axis: 'z', fixed: 8, out: 1, a: -4.5 + T / 2, b: 4.5 - T / 2, y0: F1, h: FH, rise: RIDGE - EAVE,
      ops: [win(-2.6, 1, 0.8, 1.45), win(2.6, 1, 0.8, 1.45)] },
    { lvl: 1, axis: 'z', fixed: -8, out: -1, a: -4.5 + T / 2, b: 4.5 - T / 2, y0: F1, h: FH, rise: RIDGE - EAVE,
      ops: [win(-2.2, 1, 0.8, 1.45), win(2.2, 1, 0.8, 1.45), win(0, 0.7, 3.9, 0.8)] },
    // --- Garage
    { lvl: 0, garage: 1, axis: 'x', fixed: 4.5, out: 1, a: -15 - T / 2, b: -8 - T / 2, y0: G0, h: GH, rise: 3,
      ops: [door(-13.3, 2.6, 2.3, { garage: 1 }), door(-9.85, 2.6, 2.3, { garage: 1 }), win(-11.56, 0.7, 4.1, 0.8)] },
    { lvl: 0, garage: 1, axis: 'x', fixed: -3.5, out: -1, a: -15 - T / 2, b: -8 - T / 2, y0: G0, h: GH, rise: 3, ops: [win(-11.56, 1, 1.2, 1.3)] },
    { lvl: 0, garage: 1, axis: 'z', fixed: -15, out: -1, a: -3.5 + T / 2, b: 4.5 - T / 2, y0: G0, h: GH, ops: [win(-1, 1, 1.2, 1.3), win(2, 1, 1.2, 1.3)] },
    // --- Lucarnes (sur le versant avant)
    ...[-5, 5].flatMap((cx) => [
      { lvl: 2, axis: 'x', fixed: 3.3, out: 1, a: cx - 0.95, b: cx + 0.95, y0: DY, h: 1.45, rise: 0.75, ops: [win(cx, 0.8, 0.25, 1.0, { dormer: 1 })] },
      { lvl: 2, axis: 'z', fixed: cx - 0.95 + 0.06, out: -1, a: 0.8, b: 3.3 - 0.06, y0: DY, h: 1.45, ops: [], cheek: 1 },
      { lvl: 2, axis: 'z', fixed: cx + 0.95 - 0.06, out: 1, a: 0.8, b: 3.3 - 0.06, y0: DY, h: 1.45, ops: [], cheek: 1 },
    ]),
  ]
  walls.forEach((w) => w.ops.forEach((o) => ((o.y0 = w.y0 + o.sill), (o.y1 = o.y0 + o.ht))))

  // Position d'un point (u le long du mur, y, décalage vers l'extérieur) → matrice
  const wmat = (w, u, y, off = 0, sx = 1, sy = 1, sz = 1) =>
    w.axis === 'x'
      ? m4(u, y, w.fixed + off * w.out, 0, 0, 0, sx, sy, sz)
      : m4(w.fixed + off * w.out, y, u, Math.PI / 2, 0, 0, sx, sy, sz)

  function wallGeom(w, depth) {
    const L = w.b - w.a
    const s = new THREE.Shape()
    s.moveTo(0, w.y0)
    s.lineTo(L, w.y0)
    s.lineTo(L, w.y0 + w.h)
    if (w.rise) s.lineTo(L / 2, w.y0 + w.h + w.rise)
    s.lineTo(0, w.y0 + w.h)
    s.closePath()
    for (const o of w.ops) {
      const u0 = o.c - o.w / 2 - w.a
      const u1 = o.c + o.w / 2 - w.a
      const p = new THREE.Path()
      p.moveTo(u0, o.y0)
      p.lineTo(u0, o.y1)
      p.lineTo(u1, o.y1)
      p.lineTo(u1, o.y0)
      p.closePath()
      s.holes.push(p)
    }
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false })
    const m =
      w.axis === 'x'
        ? new THREE.Matrix4().makeTranslation(w.a, 0, w.fixed - depth / 2)
        : new THREE.Matrix4().makeTranslation(w.fixed + depth / 2, 0, w.a).multiply(new THREE.Matrix4().makeRotationY(-Math.PI / 2))
    g.applyMatrix4(m)
    return g
  }

  const B = batch()
  const house = new THREE.Group()
  scene.add(house)

  // --- Murs : trois couches (panneaux OSB, pare-pluie, bardage) révélées de bas en haut
  walls.forEach((w) => {
    B.add('osbWall', wallGeom(w, T))
    B.add('wrap', wallGeom(w, T + 0.03))
    B.add('siding', wallGeom(w, T + 0.06))
  })

  // --- Menuiseries
  const glassLit = (i) => (i * 7919) % 10 < 7
  let winIndex = 0
  walls.forEach((w) =>
    w.ops.forEach((o) => {
      const cy = (o.y0 + o.y1) / 2
      const H = o.y1 - o.y0
      const fd = T + 0.02 // épaisseur du cadre
      if (o.garage) {
        B.add('garage', boxM(o.w, H, 0.06), wmat(w, o.c, cy, T / 2 - 0.05))
      } else if (o.door && !o.glass) {
        B.add('door', boxM(o.w, H, 0.08), wmat(w, o.c, cy, 0.02))
        B.add('frame', new THREE.BoxGeometry(0.08, 0.08, 0.12), wmat(w, o.c + o.w * 0.36, cy, T / 2 + 0.04)) // poignée
      } else {
        const key = glassLit(winIndex++) ? 'glass' : 'glassDim'
        B.add(key, new THREE.PlaneGeometry(o.w, H), wmat(w, o.c, cy, 0.0))
        const k = 0.06
        B.add('frame', new THREE.BoxGeometry(o.w, k, fd), wmat(w, o.c, o.y0 + k / 2, 0))
        B.add('frame', new THREE.BoxGeometry(o.w, k, fd), wmat(w, o.c, o.y1 - k / 2, 0))
        B.add('frame', new THREE.BoxGeometry(k, H, fd), wmat(w, o.c - o.w / 2 + k / 2, cy, 0))
        B.add('frame', new THREE.BoxGeometry(k, H, fd), wmat(w, o.c + o.w / 2 - k / 2, cy, 0))
        // petits bois (fenêtres à carreaux)
        const mk = 0.025
        B.add('frame', new THREE.BoxGeometry(o.w, mk, 0.04), wmat(w, o.c, cy, 0.03))
        if (o.w < 1.6) {
          B.add('frame', new THREE.BoxGeometry(mk, H, 0.04), wmat(w, o.c - o.w / 6, cy, 0.03))
          B.add('frame', new THREE.BoxGeometry(mk, H, 0.04), wmat(w, o.c + o.w / 6, cy, 0.03))
        } else B.add('frame', new THREE.BoxGeometry(mk * 2, H, 0.04), wmat(w, o.c, cy, 0.03))
      }
      // chambranles blancs
      {
        const cw = 0.13
        const off = T / 2 + 0.05
        B.add('trim', new THREE.BoxGeometry(o.w + cw * 2, cw * 1.4, 0.05), wmat(w, o.c, o.y1 + cw * 0.7, off))
        if (!o.door) B.add('trim', new THREE.BoxGeometry(o.w + cw * 2.6, cw * 0.8, 0.09), wmat(w, o.c, o.y0 - cw * 0.4, off))
        B.add('trim', new THREE.BoxGeometry(cw, H, 0.05), wmat(w, o.c - o.w / 2 - cw / 2, (o.y0 + o.y1) / 2, off))
        B.add('trim', new THREE.BoxGeometry(cw, H, 0.05), wmat(w, o.c + o.w / 2 + cw / 2, (o.y0 + o.y1) / 2, off))
      }
      // volets noirs
      if (o.sh) {
        const sw = o.w * 0.5
        const off = T / 2 + 0.06
        B.add('shutter', new THREE.BoxGeometry(sw, H, 0.04), wmat(w, o.c - o.w / 2 - 0.13 - sw / 2 - 0.02, cy, off))
        B.add('shutter', new THREE.BoxGeometry(sw, H, 0.04), wmat(w, o.c + o.w / 2 + 0.13 + sw / 2 + 0.02, cy, off))
      }
    }),
  )

  // --- Toitures (2 couches : OSB puis bardeaux)
  const roofs = [
    { axis: 'x', c: 0, ridgeY: RIDGE, half: 4.5, from: -8.5, to: 8.5 }, // corps principal
    { axis: 'z', c: 0, ridgeY: EAVE + 3, half: 2.5, from: 0.6, to: 4.95, only: [1, -1] }, // pignon avant
    { axis: 'z', c: -11.56, ridgeY: G0 + GH + 3, half: 3.44, from: -3.95, to: 4.95 }, // garage
    { axis: 'z', c: -5, ridgeY: DY + 1.45 + 0.75, half: 0.95, from: 0.6, to: 3.55, small: 1 }, // lucarnes
    { axis: 'z', c: 5, ridgeY: DY + 1.45 + 0.75, half: 0.95, from: 0.6, to: 3.55, small: 1 },
  ]
  const roofGeoms = []
  roofs.forEach((r) => {
    const rise = r.ridgeY - (r.small ? DY + 1.45 : r.axis === 'x' ? EAVE : r.c === 0 ? EAVE : G0 + GH)
    const a = Math.atan2(rise, r.half)
    const o = r.small ? 0.2 : 0.45
    const Ls = Math.hypot(r.half, rise) + o
    const len = r.to - r.from
    const mid = (r.from + r.to) / 2
    for (const side of [1, -1]) {
      for (const [key, th, lift] of [['osbRoof', 0.12, 0], ['shingle', 0.06, 0.09]]) {
        const g = boxM(len, th, Ls)
        // repère local : faîtage le long de x, pente vers +z (side=1) ou -z
        const nz = Math.sin(a) * side
        const ny = Math.cos(a)
        const local = m4(
          mid,
          r.ridgeY - (Math.sin(a) * Ls) / 2 + ny * (th / 2 + lift),
          side * (Math.cos(a) * Ls) / 2 + nz * (th / 2 + lift),
          0,
          side * a,
        )
        const place =
          r.axis === 'x'
            ? new THREE.Matrix4().makeTranslation(0, 0, r.c)
            : new THREE.Matrix4().makeTranslation(r.c, 0, 0).multiply(new THREE.Matrix4().makeRotationY(-Math.PI / 2))
        const mm = place.multiply(local)
        if (key === 'shingle') roofGeoms.push(boxM(len, th, Ls).applyMatrix4(mm.clone()))
        B.add(key, g, mm)
      }
    }
  })

  // --- Bandeaux, gouttières, planches d'angle (blancs)
  for (const z of [4.5 + 0.42, -4.5 - 0.42]) {
    B.add('trim', new THREE.BoxGeometry(17, 0.24, 0.05), m4(0, EAVE - 0.4, z))
    B.add('trim', new THREE.BoxGeometry(17, 0.13, 0.14), m4(0, EAVE - 0.3, z + Math.sign(z) * 0.09))
  }
  for (const x of [-15 - 0.5, -7.7]) {
    if (x > -8) continue
    B.add('trim', new THREE.BoxGeometry(0.05, 0.24, 9), m4(x, G0 + GH - 0.4, 0.5))
    B.add('trim', new THREE.BoxGeometry(0.14, 0.13, 9), m4(x - 0.09, G0 + GH - 0.3, 0.5))
  }
  ;[
    [8, 4.5, F0, EAVE], [8, -4.5, F0, EAVE], [-8, 4.5, G0 + GH, EAVE], [-8, -4.5, F0, EAVE],
    [-15, 4.5, G0, G0 + GH], [-15, -3.5, G0, G0 + GH], [-8, -3.5, G0, G0 + GH],
  ].forEach(([x, z, y0, y1]) =>
    B.add('trim', new THREE.BoxGeometry(0.34, y1 - y0, 0.34), m4(x + Math.sign(x + 3) * 0.06, (y0 + y1) / 2, z + Math.sign(z) * 0.06)),
  )

  // --- Porche (colonnes blanches, toit plat)
  B.add('white', boxM(5.4, F0, 2.1), m4(0, F0 / 2, 5.6))
  for (let i = 0; i < 3; i++) B.add('white', boxM(2.6, F0 - (i + 1) * 0.28, 0.4), m4(0, (F0 - (i + 1) * 0.28) / 2, 6.85 + i * 0.4))
  ;[-2.3, -0.85, 0.85, 2.3].forEach((x) =>
    B.add('white', new THREE.CylinderGeometry(0.12, 0.14, 2.75, 14), m4(x, F0 + 1.375, 6.35)),
  )
  B.add('white', boxM(5.8, 0.34, 2.45), m4(0, F0 + 2.92, 5.7))
  const porchRoof = boxM(5.8, 0.06, 2.45)

  // --- Cheminée (brique)
  const chimneyGeom = boxM(1.25, 11.8, 1.5)
  chimneyGeom.translate(8.75, 11.8 / 2, 0)

  // --- Soubassement en brique peinte
  const skirt = []
  skirt.push(boxM(16.5, F0, 0.12).translate(0, F0 / 2, 4.5 + T / 2 + 0.07))
  skirt.push(boxM(0.12, F0, 9.3).translate(8 + T / 2 + 0.07, F0 / 2, 0))
  skirt.push(boxM(16.5, F0, 0.12).translate(0, F0 / 2, -4.5 - T / 2 - 0.07))

  // --- Assemblage des meshes de la maison
  const mk = (key, material, opt) => {
    const m = B.mesh(key, material, opt)
    if (m) house.add(m)
    return m
  }
  const wireSource = [
    ...B.geoms('siding').map((g) => g.clone()),
    ...roofGeoms,
    chimneyGeom.clone(),
    ...B.geoms('white').map((g) => g.clone()),
    ...B.geoms('frame').map((g) => g.clone()),
  ]
  const meshes = {
    osbWall: mk('osbWall', M.osbWall),
    wrap: mk('wrap', M.wrap),
    siding: mk('siding', M.siding),
    osbRoof: mk('osbRoof', M.osbRoof),
    shingle: mk('shingle', M.shingle),
    frame: mk('frame', M.frame),
    glass: mk('glass', M.glass, { shadow: false }),
    glassDim: mk('glassDim', M.glassDim, { shadow: false }),
    trim: mk('trim', M.trim),
    shutter: mk('shutter', M.shutter),
    door: mk('door', M.door),
    garage: mk('garage', M.garage),
    porch: mk('white', M.white),
  }
  const porchTop = new THREE.Mesh(keep(porchRoof), M.shingle)
  porchTop.position.set(0, F0 + 3.12, 5.7)
  house.add(porchTop)
  const chimney = new THREE.Mesh(keep(chimneyGeom), M.brick)
  chimney.castShadow = chimney.receiveShadow = true
  house.add(chimney)
  const skirtMesh = new THREE.Mesh(keep(mergeGeometries(skirt.map((g) => g.toNonIndexed()))), M.paintedBrick)
  skirtMesh.castShadow = skirtMesh.receiveShadow = true
  house.add(skirtMesh)

  /* ---------------- Fondations ---------------- */
  const FB = batch()
  const fd = 0.3
  const fBot = -0.4
  const fH = F0 - fBot
  FB.add('c', boxM(16 + fd, fH, fd), m4(0, fH / 2, 4.5))
  FB.add('c', boxM(16 + fd, fH, fd), m4(0, fH / 2, -4.5))
  FB.add('c', boxM(fd, fH, 9), m4(8, fH / 2, 0))
  FB.add('c', boxM(fd, fH, 9), m4(-8, fH / 2, 0))
  FB.add('c', boxM(7.2, G0 - fBot, 8.2), m4(-11.5, (G0 - fBot) / 2, 0.5))
  ;[-2.3, -0.85, 0.85, 2.3].forEach((x) => FB.add('c', boxM(0.45, fH, 0.45), m4(x, fH / 2, 6.35)))
  const foundation = FB.mesh('c', M.concrete)
  foundation.position.y = fBot
  scene.add(foundation)

  /* ---------------- Ossature bois (montants, lisses, fermes) ---------------- */
  const lumberColor = new THREE.Color()
  function framing(levelWalls) {
    const studs = []
    const PB = batch()
    levelWalls.forEach((w) => {
      const L = w.b - w.a
      const sh = w.h - 0.09
      const inOpen = (u) => w.ops.some((o) => u > o.c - o.w / 2 - 0.06 && u < o.c + o.w / 2 + 0.06)
      for (let u = w.a + 0.05; u <= w.b - 0.04; u += 0.41) if (!inOpen(u)) studs.push({ w, u, y: w.y0 + 0.045, h: sh })
      w.ops.forEach((o) => {
        ;[o.c - o.w / 2 - 0.03, o.c + o.w / 2 + 0.03].forEach((u) => studs.push({ w, u, y: w.y0 + 0.045, h: sh }))
        if (o.y1 < w.y0 + w.h - 0.2) {
          PB.add('p', new THREE.BoxGeometry(o.w + 0.12, 0.24, 0.14), wmat(w, o.c, o.y1 + 0.12, 0))
          // petits montants au-dessus de l'ouverture
          for (let u = o.c - o.w / 2 + 0.2; u < o.c + o.w / 2; u += 0.41)
            studs.push({ w, u, y: o.y1 + 0.24, h: w.y0 + w.h - 0.045 - o.y1 - 0.24 })
        }
        if (!o.door && o.y0 > w.y0 + 0.2) {
          PB.add('p', new THREE.BoxGeometry(o.w + 0.06, 0.045, 0.14), wmat(w, o.c, o.y0 - 0.02, 0))
          for (let u = o.c - o.w / 2 + 0.2; u < o.c + o.w / 2; u += 0.41)
            studs.push({ w, u, y: w.y0 + 0.045, h: o.y0 - 0.045 - w.y0 - 0.045 })
        }
      })
      PB.add('p', new THREE.BoxGeometry(L, 0.045, 0.14), wmat(w, (w.a + w.b) / 2, w.y0 + 0.022, 0))
      PB.add('p', new THREE.BoxGeometry(L, 0.09, 0.14), wmat(w, (w.a + w.b) / 2, w.y0 + w.h - 0.045, 0))
    })
    studs.sort((p, q) => (p.w.axis === 'x' ? p.u : p.u * 0.5 + 20) - (q.w.axis === 'x' ? q.u : q.u * 0.5 + 20))
    const g = keep(new THREE.BoxGeometry(0.045, 1, 0.14).translate(0, 0.5, 0))
    const inst = new THREE.InstancedMesh(g, M.lumber, studs.length)
    inst.castShadow = inst.receiveShadow = true
    studs.forEach((st, i) => inst.setColorAt(i, lumberColor.setHSL(0.09, 0.45, 0.62 + rnd() * 0.1)))
    const plates = PB.mesh('p', M.plate)
    house.add(inst, plates)
    const dummy = new THREE.Matrix4()
    return {
      update(t) {
        const n = studs.length
        studs.forEach((st, i) => {
          const k = easeOut(clamp(t * (n / 14 + 1) - (i / n) * (n / 14)))
          dummy.copy(wmat(st.w, st.u, st.y, 0, 1, Math.max(0.001, st.h * k), 1))
          inst.setMatrixAt(i, dummy)
        })
        inst.instanceMatrix.needsUpdate = true
        inst.visible = t > 0
        plates.visible = t > 0.02
      },
    }
  }
  const frame0 = framing(walls.filter((w) => w.lvl === 0 && !w.garage))
  const frameG = framing(walls.filter((w) => w.garage))
  const frame1 = framing(walls.filter((w) => w.lvl === 1))

  // Planchers
  const deck0 = new THREE.Mesh(keep(boxM(16, 0.08, 9)), M.deck)
  deck0.position.set(0, F0 + 0.04, 0)
  const deck1 = new THREE.Mesh(keep(boxM(16.2, 0.12, 9.2)), M.deck)
  deck1.position.set(0, F1 - 0.06, 0)
  ;[deck0, deck1].forEach((d) => ((d.castShadow = d.receiveShadow = true), house.add(d)))

  // Fermes de toit
  function trussGeom(S, R) {
    const parts = []
    const t = 0.045
    const d = 0.14
    parts.push(new THREE.BoxGeometry(S, d, t).translate(0, d / 2, 0))
    const half = S / 2
    const Lt = Math.hypot(half, R)
    const a = Math.atan2(R, half)
    for (const sd of [1, -1]) {
      parts.push(new THREE.BoxGeometry(Lt, d, t).applyMatrix4(m4((sd * half) / 2, R / 2, 0, 0, 0, -sd * a)))
      const wl = Math.hypot(half / 2, R / 2)
      parts.push(new THREE.BoxGeometry(wl, d * 0.7, t).applyMatrix4(m4((sd * half) / 4, R / 4, 0, 0, 0, sd * Math.atan2(R / 2, half / 2))))
    }
    parts.push(new THREE.BoxGeometry(d * 0.7, R, t).translate(0, R / 2, 0))
    return keep(mergeGeometries(parts.map((p) => p.toNonIndexed())))
  }
  const trusses = []
  function addTrusses(geom, list) {
    const inst = new THREE.InstancedMesh(geom, M.lumber, list.length)
    inst.castShadow = true
    list.forEach((_, i) => inst.setColorAt(i, lumberColor.setHSL(0.09, 0.45, 0.6 + rnd() * 0.1)))
    house.add(inst)
    trusses.push({ inst, list })
  }
  {
    const main = []
    for (let x = -7.95; x <= 7.96; x += 0.61) main.push({ x, y: EAVE - 0.1, z: 0, ry: Math.PI / 2 })
    addTrusses(trussGeom(9.0, RIDGE - EAVE - 0.18), main)
    const gar = []
    for (let z = -3.4; z <= 4.45; z += 0.61) gar.push({ x: -11.56, y: G0 + GH - 0.1, z, ry: 0 })
    addTrusses(trussGeom(6.88, 2.82), gar)
    const cross = []
    for (let z = 4.45; z >= 1.2; z -= 0.61) cross.push({ x: 0, y: EAVE - 0.1, z, ry: 0 })
    addTrusses(trussGeom(5.0, 2.82), cross)
  }
  const tm = new THREE.Matrix4()
  function updateTrusses(t) {
    const total = trusses.reduce((n, g) => n + g.list.length, 0)
    let idx = 0
    trusses.forEach(({ inst, list }) => {
      list.forEach((p, i) => {
        const k = easeOut(clamp(t * 1.6 - (idx++ / total) * 0.6) * 1)
        tm.copy(m4(p.x, p.y + (1 - k) * 4, p.z, p.ry, 0, 0, 1, Math.max(0.001, k), 1))
        inst.setMatrixAt(i, tm)
      })
      inst.instanceMatrix.needsUpdate = true
      inst.visible = t > 0
    })
  }

  /* ---------------- Plan (lignes du blueprint) ---------------- */
  function sortedEdges(geoms, threshold = 25) {
    const segs = []
    geoms.forEach((g) => {
      const e = new THREE.EdgesGeometry(g, threshold)
      const p = e.attributes.position.array
      for (let i = 0; i < p.length; i += 6) segs.push(p.slice(i, i + 6))
      e.dispose()
      g.dispose()
    })
    // le dessin se trace de bas en haut, de gauche à droite
    segs.sort((a, b) => a[1] + a[4] + (a[0] + a[3]) * 0.02 - (b[1] + b[4] + (b[0] + b[3]) * 0.02))
    const arr = new Float32Array(segs.length * 6)
    segs.forEach((s, i) => arr.set(s, i * 6))
    const g = keep(new THREE.BufferGeometry())
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }
  const lineMat = (color, opacity = 1) =>
    keep(new THREE.LineBasicMaterial({ color, transparent: true, opacity, fog: false, toneMapped: false, depthWrite: false }))
  const holoGeom = sortedEdges(wireSource)
  const holoMat = lineMat(0xeaf4ff)
  const holo = new THREE.LineSegments(holoGeom, holoMat)
  holo.renderOrder = 2
  scene.add(holo)

  // Plan au sol : emprise, cloisons, cotes
  const P = []
  const seg = (x1, z1, x2, z2) => P.push(x1, 0.04, z1, x2, 0.04, z2)
  const rect = (x1, z1, x2, z2) => (seg(x1, z1, x2, z1), seg(x2, z1, x2, z2), seg(x2, z2, x1, z2), seg(x1, z2, x1, z1))
  rect(-8, -4.5, 8, 4.5)
  rect(-15, -3.5, -8, 4.5)
  rect(-2.7, 4.5, 2.7, 6.65)
  rect(8, -0.75, 9.4, 0.75)
  seg(-2.5, -4.5, -2.5, 4.5)
  seg(2.5, -4.5, 2.5, 1)
  seg(2.5, 1, 8, 1)
  seg(-8, 0, -2.5, 0)
  seg(-2.5, -1.5, 2.5, -1.5)
  // cotes
  seg(-15, 9, 8, 9)
  ;[-15, -8, -2.5, 2.5, 8].forEach((x) => seg(x, 8.6, x, 9.4))
  seg(12, -4.5, 12, 4.5)
  ;[-4.5, 0, 4.5].forEach((z) => seg(11.6, z, 12.4, z))
  // axes
  seg(-19, 0, 14, 0)
  seg(-3.5, -9, -3.5, 12)
  const planGeom = keep(new THREE.BufferGeometry())
  planGeom.setAttribute('position', new THREE.Float32BufferAttribute(P, 3))
  const planMat = lineMat(0xffffff)
  const plan = new THREE.LineSegments(planGeom, planMat)
  scene.add(plan)

  const grid = new THREE.GridHelper(160, 160, 0xffffff, 0xffffff)
  grid.material.dispose()
  grid.material = lineMat(0xffffff, 0.12)
  keep(grid.geometry)
  grid.position.y = 0.01
  scene.add(grid)

  // Piquets et cordeaux d'implantation
  const stakes = new THREE.Group()
  scene.add(stakes)
  {
    const SB = batch()
    const pts = [[-16.2, -4.7], [-8, -5.7], [9.2, -5.7], [9.2, 5.7], [-8, 5.7], [-16.2, 5.7]]
    pts.forEach(([x, z]) => {
      SB.add('s', new THREE.BoxGeometry(0.08, 0.8, 0.08), m4(x, 0.4, z))
      SB.add('s', new THREE.BoxGeometry(0.08, 0.8, 0.08), m4(x + Math.sign(x + 3) * 1.1, 0.4, z))
      SB.add('s', new THREE.BoxGeometry(1.2, 0.12, 0.03), m4(x + Math.sign(x + 3) * 0.55, 0.7, z))
    })
    stakes.add(SB.mesh('s', M.stake))
    const S = []
    const y = 0.72
    for (let i = 0; i < pts.length; i++) {
      const [x1, z1] = pts[i]
      const [x2, z2] = pts[(i + 1) % pts.length]
      S.push(x1, y, z1, x2, y, z2)
    }
    const sg = keep(new THREE.BufferGeometry())
    sg.setAttribute('position', new THREE.Float32BufferAttribute(S, 3))
    stakes.add(new THREE.LineSegments(sg, keep(new THREE.LineBasicMaterial({ color: 0xff7a1a }))))
  }

  /* ---------------- Terrain, pelouse, allée ---------------- */
  const groundGeom = keep(new THREE.PlaneGeometry(900, 900))
  groundGeom.attributes.uv.array.forEach((_, i, a) => (a[i] *= 900))
  const ground = new THREE.Mesh(groundGeom, M.ground)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const lawnGeom = keep(new THREE.CircleGeometry(48, 72))
  lawnGeom.attributes.uv.array.forEach((_, i, a) => (a[i] *= 96))
  const lawn = new THREE.Mesh(lawnGeom, M.grass)
  lawn.rotation.x = -Math.PI / 2
  lawn.position.set(-3, 0.02, 2)
  lawn.receiveShadow = true
  scene.add(lawn)

  const drive = new THREE.Group()
  scene.add(drive)
  {
    const dg = keep(boxM(6.6, 0.06, 38).translate(0, 0, 19))
    const d = new THREE.Mesh(dg, M.paving)
    d.position.set(-11.56, 0.04, 4.6)
    d.receiveShadow = true
    drive.add(d)
    const w1 = new THREE.Mesh(keep(boxM(1.6, 0.06, 4.6).translate(0, 0, 2.3)), M.paving)
    w1.position.set(0, 0.045, 7.4)
    const w2 = new THREE.Mesh(keep(boxM(9.6, 0.06, 1.6).translate(-4.8, 0, 0)), M.paving)
    w2.position.set(0.8, 0.045, 12.0)
    ;[w1, w2].forEach((m) => ((m.receiveShadow = true), drive.add(m)))
  }

  /* ---------------- Végétation ---------------- */
  const leafG = keep(new THREE.IcosahedronGeometry(1, 2))
  const tmpC = new THREE.Color()
  function forest(list) {
    const inst = new THREE.InstancedMesh(leafG, M.leaf, list.length)
    inst.castShadow = !mobile
    list.forEach((t, i) => {
      inst.setMatrixAt(i, m4(t.x, t.y, t.z, t.r, 0, 0, t.s, t.s * t.v, t.s))
      inst.setColorAt(i, tmpC.setHSL(0.24 + rnd() * 0.08, 0.3 + rnd() * 0.2, 0.12 + rnd() * 0.08))
    })
    scene.add(inst)
    return inst
  }
  // Rideau d'arbres autour du terrain
  const treeline = []
  const nTrees = mobile ? 170 : 300
  for (let i = 0; i < nTrees; i++) {
    const a = rnd() * Math.PI * 2
    const r = 42 + rnd() * 40
    const x = -3 + Math.cos(a) * r
    const z = Math.sin(a) * r
    if (z > 20 && Math.abs(x + 11.5) < 9) continue // dégagement de l'allée
    const h = 7 + rnd() * 9
    const s = 3 + rnd() * 3.5
    treeline.push({ x, y: h - s * 0.6, z, s, v: 1.1 + rnd() * 0.5, r: rnd() * 6 })
    if (rnd() < 0.6) treeline.push({ x: x + (rnd() - 0.5) * 4, y: h * 0.7, z: z + (rnd() - 0.5) * 4, s: s * 0.8, v: 1.2, r: rnd() * 6 })
  }
  // Grands arbres proches de la maison
  ;[[-34, -26], [22, -30], [36, 12], [-40, 16], [-6, -40]].forEach(([x, z]) => {
    for (let k = 0; k < 6; k++)
      treeline.push({ x: x + (rnd() - 0.5) * 5, y: 7 + rnd() * 5, z: z + (rnd() - 0.5) * 5, s: 2.6 + rnd() * 1.6, v: 1.1, r: rnd() * 6 })
  })
  const trees = forest(treeline)
  const trunkG = keep(new THREE.CylinderGeometry(0.25, 0.4, 1, 6).translate(0, 0.5, 0))
  const trunks = new THREE.Group()
  scene.add(trunks)
  ;[[-34, -26], [22, -30], [36, 12], [-40, 16], [-6, -40]].forEach(([x, z]) => {
    const t = new THREE.Mesh(trunkG, M.bark)
    t.position.set(x, 0, z)
    t.scale.set(1, 8, 1)
    trunks.add(t)
  })

  // Massifs devant la maison + jeunes arbres (étape 9)
  const shrubs = []
  for (let x = -7.4; x <= 7.5; x += 1.05) if (Math.abs(x) > 3) shrubs.push({ x, z: 5.25 })
  for (let x = -14.6; x <= -8.6; x += 1.1) if (x < -14 || x > -9) shrubs.push({ x, z: 5.2 })
  for (let z = -3.8; z <= 3.8; z += 1.05) shrubs.push({ x: 8.95 + (Math.abs(z) < 1 ? 0.9 : 0), z })
  const shrubInst = new THREE.InstancedMesh(leafG, M.leaf, shrubs.length)
  shrubInst.castShadow = !mobile
  shrubs.forEach((s, i) => {
    s.s = 0.42 + rnd() * 0.18
    shrubInst.setColorAt(i, tmpC.setHSL(0.27 + rnd() * 0.05, 0.4, 0.16 + rnd() * 0.06))
  })
  scene.add(shrubInst)
  const young = [[15, 7], [-21, 11], [-1, 18]].map(([x, z]) => {
    const g = new THREE.Group()
    const tr = new THREE.Mesh(trunkG, M.bark)
    tr.scale.set(0.35, 3, 0.35)
    g.add(tr)
    for (let k = 0; k < 3; k++) {
      const c = new THREE.Mesh(leafG, M.leaf)
      c.position.set((rnd() - 0.5) * 0.8, 3.2 + k * 0.5, (rnd() - 0.5) * 0.8)
      c.scale.setScalar(1.1 - k * 0.2)
      c.castShadow = !mobile
      g.add(c)
    }
    g.position.set(x, 0, z)
    scene.add(g)
    return g
  })
  young.forEach((g) => g.children.forEach((c, k) => k && (c.material = M.youngLeaf)))

  // Lumières d'accueil (étape 10)
  const porchLight = new THREE.PointLight(0xffc27a, 0, 14, 2)
  porchLight.position.set(0, F0 + 2.6, 5.8)
  const garLight = new THREE.PointLight(0xffc27a, 0, 10, 2)
  garLight.position.set(-11.56, G0 + 2.8, 5.2)
  scene.add(porchLight, garLight)
  const lamps = []
  ;[[-0.85, 4.7], [0.85, 4.7], [-14.8, 4.7], [-8.4, 4.7]].forEach(([x, z]) => {
    const l = new THREE.Mesh(keep(new THREE.BoxGeometry(0.18, 0.32, 0.14)), M.lamp)
    l.position.set(x, x < -5 ? G0 + 2.7 : F0 + 2.0, z + T / 2 + 0.1)
    house.add(l)
    lamps.push(l)
  })

  /* =========================================================================
     ÉTAT DE LA SCÈNE EN FONCTION DE s
     ========================================================================= */
  const C = (h) => new THREE.Color(h)
  const LOOK = {
    plan: { top: C(0x0e0e0e), horizon: C(0x0e0e0e), bottom: C(0x0e0e0e), fog: C(0x0e0e0e) }, // fond noir du plan
    day: { top: C(0x41557f), horizon: C(0xaab5c8), bottom: C(0x6d6a63), fog: C(0x8d97a8) },
    dusk: { top: C(0x141c36), horizon: C(0xcf8e6c), bottom: C(0x2a2522), fog: C(0x4f4a55) },
  }
  const cA = new THREE.Color()
  const cB = new THREE.Color()
  const mix3 = (key, d1, d2, out) => out.copy(LOOK.plan[key]).lerp(LOOK.day[key], d1).lerp(LOOK.dusk[key], d2)
  const groundTint = new THREE.Color()

  function applyState(s) {
    // ---- 0 Plan → 1 Implantation : le bleu du blueprint se dissipe et révèle le terrain
    const d1 = smooth(range(s, 0.8, 1.45))
    const d2 = smooth(range(s, 9.7, 10.7)) * 0.85
    mix3('top', d1, d2, skyU.top.value)
    mix3('horizon', d1, d2, skyU.horizon.value)
    mix3('bottom', d1, d2, skyU.bottom.value)
    mix3('fog', d1, d2, scene.fog.color)
    scene.fog.near = lerp(0.1, 70, Math.pow(d1, 2))
    // pendant le plan, seul le dessin existe : terrain et arbres apparaissent avec le brouillard
    trees.visible = trunks.visible = ground.visible = d1 > 0.002
    scene.fog.far = lerp(0.2, 280, Math.pow(d1, 1.5))

    const draw = range(s, 0.02, 0.75)
    holoGeom.setDrawRange(0, Math.floor((holoGeom.attributes.position.count / 2) * draw) * 2)
    planGeom.setDrawRange(0, Math.floor((planGeom.attributes.position.count / 2) * range(s, 0, 0.5)) * 2)
    holoMat.opacity = 1 - smooth(range(s, 2.15, 3.1))
    holoMat.color.setRGB(0.92, 0.96, 1).multiplyScalar(lerp(1, 1.6, d1))
    holo.visible = holoMat.opacity > 0.01
    planMat.opacity = lerp(1, 0.75, d1) * (1 - smooth(range(s, 2.0, 2.6)))
    plan.visible = planMat.opacity > 0.01
    grid.material.opacity = 0.12 * (1 - d1)
    grid.visible = d1 < 0.99

    const tStake = easeOut(range(s, 1.25, 1.65)) * (1 - range(s, 2.4, 2.7))
    stakes.visible = tStake > 0.01
    stakes.scale.set(1, Math.max(0.001, tStake), 1)

    // ---- 2 Fondations
    const tF = easeInOut(range(s, 2.1, 2.7))
    foundation.visible = tF > 0
    foundation.scale.y = Math.max(0.001, tF)

    // ---- 3 Murs du rez-de-chaussée · 4 Étage + fermes
    const tD0 = easeOut(range(s, 3.0, 3.25))
    deck0.visible = tD0 > 0
    deck0.scale.set(tD0 || 0.001, 1, 1)
    frame0.update(range(s, 3.2, 3.8))
    frameG.update(range(s, 3.45, 3.9))
    const tD1 = easeOut(range(s, 4.0, 4.2))
    deck1.visible = tD1 > 0
    deck1.position.y = F1 - 0.06 + (1 - tD1) * 2
    frame1.update(range(s, 4.15, 4.55))
    updateTrusses(range(s, 4.5, 4.95))

    // ---- 5 Panneaux OSB · 6 Pare-pluie + bardeaux + fenêtres
    M.osbWall.clippingPlanes[0].constant = lerp(-0.1, 11, easeInOut(range(s, 5.05, 5.55)))
    M.osbRoof.clippingPlanes[0].constant = lerp(3.5, 11, easeInOut(range(s, 5.35, 5.85)))
    M.wrap.clippingPlanes[0].constant = lerp(-0.1, 11, easeInOut(range(s, 6.05, 6.45)))
    M.shingle.clippingPlanes[0].constant = lerp(3.5, 11, easeInOut(range(s, 6.2, 6.65)))
    const tWin = range(s, 6.4, 6.85)
    M.frame.opacity = tWin
    M.glass.opacity = M.glassDim.opacity = 0.9 * tWin
    M.frame.transparent = tWin < 1
    ;[meshes.frame, meshes.glass, meshes.glassDim].forEach((m) => m && (m.visible = tWin > 0))
    meshes.door.visible = meshes.garage.visible = range(s, 6.6, 6.9) > 0

    // ---- 7 Brique (soubassement peint, cheminée)
    M.paintedBrick.clippingPlanes[0].constant = lerp(-0.1, F0 + 0.05, range(s, 7.05, 7.35))
    M.brick.clippingPlanes[0].constant = lerp(-0.1, 11.9, easeInOut(range(s, 7.2, 7.85)))

    // ---- 8 Extérieur : bardage, moulures, porche, volets en dernier
    M.siding.clippingPlanes[0].constant = lerp(-0.1, 11, easeInOut(range(s, 8.02, 8.45)))
    const tTrim = range(s, 8.3, 8.6)
    M.trim.opacity = tTrim
    M.trim.transparent = tTrim < 1
    meshes.trim.visible = tTrim > 0
    const tPorch = easeOut(range(s, 8.35, 8.65))
    meshes.porch.visible = porchTop.visible = tPorch > 0
    meshes.porch.scale.set(1, Math.max(0.001, tPorch), 1)
    porchTop.position.y = (F0 + 3.12) * tPorch
    const tSh = range(s, 8.7, 8.95)
    M.shutter.opacity = tSh
    M.shutter.transparent = tSh < 1
    meshes.shutter.visible = tSh > 0

    // ---- 9 Finitions : gazon, allée, plantations
    const tLawn = easeInOut(range(s, 9.02, 9.5))
    lawn.visible = tLawn > 0
    lawn.scale.setScalar(Math.max(0.001, tLawn))
    groundTint.set(0xffffff).lerp(C(0x7d9a5a), smooth(range(s, 9.1, 9.6)))
    M.ground.color.copy(groundTint)
    const tDrive = easeOut(range(s, 9.25, 9.65))
    drive.visible = tDrive > 0
    drive.children.forEach((c) => (c.scale.z = Math.max(0.001, tDrive)))
    const tShrub = range(s, 9.45, 9.9)
    shrubs.forEach((p, i) => {
      const k = easeOut(clamp(tShrub * 3 - (i / shrubs.length) * 2))
      shrubInst.setMatrixAt(i, m4(p.x, p.s * 0.7 * k, p.z, i, 0, 0, p.s * k + 0.0001, p.s * 0.8 * k + 0.0001, p.s * k + 0.0001))
    })
    shrubInst.instanceMatrix.needsUpdate = true
    shrubInst.visible = tShrub > 0
    young.forEach((g, i) => {
      const k = easeOut(range(s, 9.5 + i * 0.08, 9.85 + i * 0.08))
      g.visible = k > 0
      g.scale.setScalar(Math.max(0.001, k))
    })

    // ---- 10 Bienvenue : lumière du soir, fenêtres allumées
    const tLight = smooth(range(s, 10.05, 10.6))
    M.glass.emissiveIntensity = 1.5 * tLight
    M.glassDim.emissiveIntensity = 0.25 * tLight
    M.lamp.emissiveIntensity = 3 * tLight
    porchLight.intensity = 22 * tLight
    garLight.intensity = 14 * tLight

    // Lumière générale
    const dl = lerp(1, 0.5, d2)
    sun.intensity = lerp(0.6, 1.9, d1) * dl
    sun.color.set(0xffe2c4).lerp(C(0xffb08a), d2)
    hemi.intensity = lerp(0.8, 1.35, d1) * lerp(1, 0.55, d2)
    renderer.toneMappingExposure = lerp(1, 1.1, d2)
  }

  /* ---------------- Trajectoire caméra ---------------- */
  const V = (x, y, z) => new THREE.Vector3(x, y, z)
  const CX = -3
  const PHI0 = (32 * Math.PI) / 180
  // Rayon, hauteur et visée par étape (index 2 → 10)
  const ORB = [
    { R: 0, h: 0, ty: 0 },
    { R: 0, h: 0, ty: 0 },
    { R: 25, h: 6, ty: 1.5 },
    { R: 22, h: 4.5, ty: 2.6 },
    { R: 24, h: 7.5, ty: 4.5 },
    { R: 25, h: 8.5, ty: 5 },
    { R: 24, h: 7, ty: 5 },
    { R: 22, h: 6, ty: 5.2 },
    { R: 25, h: 5, ty: 4.5 },
    { R: 29, h: 4.5, ty: 3.8 },
    { R: 30, h: 3.4, ty: 4.2 },
    { R: 28, h: 3.2, ty: 4.4 },
  ]
  const K0 = { p: V(CX, 7, 46), t: V(CX, 4.6, 0) }
  const K1 = { p: V(16, 12, 36), t: V(CX, 2.5, 0) }
  const camP = new THREE.Vector3()
  const camT = new THREE.Vector3()
  const oP = new THREE.Vector3()
  const oT = new THREE.Vector3()
  let distK = 1
  function orbitAt(s, outP, outT) {
    const sc = clamp(s, 2, STAGES - 1)
    const i = Math.min(Math.floor(sc), STAGES - 2)
    const f = smooth(sc - i)
    const a = ORB[i]
    const b = ORB[i + 1]
    const R = lerp(a.R, b.R, f) * distK
    const h = lerp(a.h, b.h, f)
    const ty = lerp(a.ty, b.ty, f)
    const phi = PHI0 - (orbitDegrees(s) * Math.PI) / 180
    outP.set(CX + Math.sin(phi) * R, h, Math.cos(phi) * R)
    outT.set(CX, ty, 0)
  }
  function cameraAt(s) {
    if (s >= 2) return orbitAt(s, camP, camT)
    const kp = easeInOut(range(s, 0.65, 1.4))
    camP.lerpVectors(K0.p, K1.p, kp)
    camT.lerpVectors(K0.t, K1.t, kp)
    // léger travelling avant pendant le dessin du plan
    camP.z -= (1 - kp) * 4 * range(s, 0, 0.65)
    if (distK !== 1) camP.sub(camT).multiplyScalar(distK).add(camT)
    const k2 = easeInOut(range(s, 1.45, 2))
    if (k2 > 0) {
      orbitAt(2, oP, oT)
      camP.lerp(oP, k2)
      camT.lerp(oT, k2)
    }
  }

  /* ---------------- Rendu ---------------- */
  function resize() {
    const W = canvas.clientWidth
    const H = canvas.clientHeight
    if (!W || !H) return
    renderer.setSize(W, H, false)
    camera.aspect = W / H
    const portrait = W / H < 1
    camera.fov = portrait ? 52 : 35
    // sur grand écran, la maison est décalée vers la droite pour laisser la place aux textes
    if (portrait) camera.clearViewOffset()
    else camera.setViewOffset(W, H, -W * 0.13, 0, W, H)
    distK = portrait ? 1.4 : 1
    camera.updateProjectionMatrix()
  }

  let lastS = -1
  function render(s) {
    if (Math.abs(s - lastS) > 1e-5) {
      applyState(s)
      lastS = s
    }
    cameraAt(s)
    camera.position.copy(camP)
    camera.lookAt(camT)
    sky.position.copy(camera.position)
    renderer.render(scene, camera)
  }

  function dispose() {
    disposables.forEach((d) => d.dispose && d.dispose())
    scene.traverse((o) => {
      if (o.isInstancedMesh) o.dispose()
    })
    renderer.dispose()
    renderer.forceContextLoss()
  }

  resize()
  return { render, resize, dispose }
}
