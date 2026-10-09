import { useEffect, useRef } from 'react'
import './Viewer360.css'

interface Props {
  src: string                 // imagen equirectangular 2:1
  initialYaw?: number         // radianes
}

const FOV_MIN = (30 * Math.PI) / 180
const FOV_MAX = (95 * Math.PI) / 180
const FOV_INIT = (75 * Math.PI) / 180
const PITCH_MAX = (85 * Math.PI) / 180

const VERT = `
attribute vec2 aPos;
varying vec2 vNdc;
void main() {
  vNdc = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

// Proyecta cada pixel de pantalla a una dirección 3D y la convierte a coordenadas equirectangulares
const FRAG = `
precision highp float;
varying vec2 vNdc;
uniform sampler2D uTex;
uniform float uYaw;
uniform float uPitch;
uniform float uFov;
uniform float uAspect;
const float PI = 3.14159265359;

void main() {
  float t = tan(uFov * 0.5);
  vec3 d = normalize(vec3(vNdc.x * t * uAspect, vNdc.y * t, -1.0));

  float cp = cos(uPitch), sp = sin(uPitch);
  d = vec3(d.x, d.y * cp - d.z * sp, d.y * sp + d.z * cp);

  float cy = cos(uYaw), sy = sin(uYaw);
  d = vec3(d.x * cy + d.z * sy, d.y, -d.x * sy + d.z * cy);

  float u = atan(d.x, -d.z) / (2.0 * PI) + 0.5;
  float v = asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5;
  gl_FragColor = texture2D(uTex, vec2(u, 1.0 - v));
}`

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(`[Viewer360] ${gl.getShaderInfoLog(s) || 'error de compilación'}`)
  }
  return s
}

// Algunos GPUs móviles solo aceptan texturas de 4096 px: se reduce si hace falta
const fitToMaxTexture = (img: HTMLImageElement, max: number): TexImageSource => {
  if (img.width <= max && img.height <= max) return img
  const scale = max / Math.max(img.width, img.height)
  const c = document.createElement('canvas')
  c.width = Math.floor(img.width * scale)
  c.height = Math.floor(img.height * scale)
  c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
  return c
}

export const Viewer360: React.FC<Props> = ({ src, initialYaw = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false })
    if (!gl || gl.isContextLost()) {
      console.warn('[Viewer360] WebGL no disponible')
      return
    }

    // ── Programa ──
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    // Triángulo que cubre toda la pantalla
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uYaw = gl.getUniformLocation(prog, 'uYaw')
    const uPitch = gl.getUniformLocation(prog, 'uPitch')
    const uFov = gl.getUniformLocation(prog, 'uFov')
    const uAspect = gl.getUniformLocation(prog, 'uAspect')

    // ── Estado de cámara ──
    let yaw = initialYaw
    let pitch = 0
    let fov = FOV_INIT
    let ready = false
    let dirty = true
    let raf = 0

    const clampView = () => {
      pitch = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, pitch))
      fov = Math.max(FOV_MIN, Math.min(FOV_MAX, fov))
    }

    // ── Textura ──
    const tex = gl.createTexture()
    const img = new Image()
    img.onload = () => {
      const max = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, fitToMaxTexture(img, max))
      // Compatible con texturas no potencia de 2 en WebGL1
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      ready = true
      dirty = true
    }
    img.src = src

    // ── Tamaño ──
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(canvas.clientWidth * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      dirty = true
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ── Render solo cuando algo cambia ──
    const loop = () => {
      if (dirty && ready) {
        gl.uniform1f(uYaw, yaw)
        gl.uniform1f(uPitch, pitch)
        gl.uniform1f(uFov, fov)
        gl.uniform1f(uAspect, canvas.width / canvas.height)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        dirty = false
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // ── Interacción: arrastre + pinch ──
    const pointers = new Map<number, { x: number; y: number }>()
    let pinchDist = 0

    const distance = () => {
      const [a, b] = [...pointers.values()]
      return Math.hypot(a.x - b.x, a.y - b.y)
    }

    const onDown = (e: PointerEvent) => {
      canvas.setPointerCapture(e.pointerId)
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
      if (pointers.size === 2) pinchDist = distance()
    }

    const onMove = (e: PointerEvent) => {
      const prev = pointers.get(e.pointerId)
      if (!prev) return
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

      if (pointers.size === 2) {
        const d = distance()
        if (pinchDist > 0) fov *= pinchDist / d
        pinchDist = d
      } else if (pointers.size === 1) {
        // Sensibilidad proporcional al FOV: con zoom se mueve más fino
        const radPerPx = fov / canvas.clientHeight
        yaw += (e.clientX - prev.x) * radPerPx
        pitch += (e.clientY - prev.y) * radPerPx
      }
      clampView()
      dirty = true
    }

    const onUp = (e: PointerEvent) => {
      pointers.delete(e.pointerId)
      if (pointers.size < 2) pinchDist = 0
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      fov *= Math.exp(e.deltaY * 0.001)
      clampView()
      dirty = true
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerup', onUp)
    canvas.addEventListener('pointercancel', onUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      img.onload = null
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerup', onUp)
      canvas.removeEventListener('pointercancel', onUp)
      canvas.removeEventListener('wheel', onWheel)
      gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)      
    }
  }, [src, initialYaw])

  return <canvas ref={canvasRef} className="viewer-360" />
}