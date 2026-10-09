let loadPromise: Promise<void> | null = null

export function loadMaps3dScript(apiKey: string): Promise<void> {
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    // Por si ya existe un script previo (ej. HMR)
    if (document.querySelector('script[data-maps3d-loader]')) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=beta&libraries=maps3d`
    script.async = true
    script.setAttribute('data-maps3d-loader', 'true')
    script.onload = () => resolve()
    script.onerror = reject
    document.head.appendChild(script)
  })

  return loadPromise
}