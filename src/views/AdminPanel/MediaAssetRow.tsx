import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import './MediaAssetRow.css'

export type MediaAssetRecord = {
  key: string
  storage_path: string | null
  bucket: string
  content_type: string | null
  updated_at: string
}

export default function MediaAssetRow({
  asset,
  onSaved,
}: {
  asset: MediaAssetRecord
  onSaved: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFile(f: File | null) {
    setFile(f)
    setError(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }

  async function handleUpload() {
    if (!file) return
    setSaving(true)
    setError(null)
    try {
      const folder = asset.storage_path?.split('/').slice(0, -1).join('/') || 'misc'
      const newPath = `${folder}/${Date.now()}-${file.name}`

      const { error: upErr } = await supabase.storage
        .from(asset.bucket)
        .upload(newPath, file, { contentType: file.type })
      if (upErr) throw upErr

      const oldPath = asset.storage_path
      const { error: dbErr } = await supabase
        .from('t6_sta_maria_media_assets')
        .update({
          storage_path: newPath,
          content_type: file.type,
          updated_at: new Date().toISOString(),
        })
        .eq('key', asset.key)
      if (dbErr) throw dbErr

      // Limpieza: sin versionado ("último gana"), se borra el archivo reemplazado.
      // Si falla el borrado no se revierte nada — el archivo nuevo ya quedó activo,
      // solo queda un huérfano en Storage a limpiar manualmente después.
      if (oldPath) {
        await supabase.storage.from(asset.bucket).remove([oldPath])
      }

      handleFile(null)
      onSaved()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al subir el archivo')
    } finally {
      setSaving(false)
    }
  }

  const isVideo = (file?.type ?? asset.content_type ?? '').startsWith('video')

  return (
    <div className="media-asset-row">
      <div className="media-asset-row__info">
        <span className="media-asset-row__key">{asset.key}</span>
        <span className="media-asset-row__path">{asset.storage_path ?? '(vacío)'}</span>
      </div>

      <div className="media-asset-row__preview">
        {previewUrl && isVideo && (
          <video src={previewUrl} muted autoPlay loop playsInline />
        )}
        {previewUrl && !isVideo && <img src={previewUrl} alt="preview" />}
      </div>

      <div className="media-asset-row__actions">
        <input
          type="file"
          accept="video/mp4,image/jpeg,image/png,image/webp"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        <button disabled={!file || saving} onClick={handleUpload}>
          {saving ? 'Subiendo…' : 'Reemplazar'}
        </button>
      </div>

      {error && <p className="media-asset-row__error">{error}</p>}
    </div>
  )
}