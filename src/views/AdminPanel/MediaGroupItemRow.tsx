import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import './MediaGroupItemRow.css'

export type MediaGroupRecord = {
  id: string
  group_key: string
  sort_order: number
  storage_path: string
  label: string | null
  bucket: string
  content_type: string | null
  updated_at: string
}

export default function MediaGroupItemRow({
  item,
  onSaved,
}: {
  item: MediaGroupRecord
  onSaved: () => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [label, setLabel] = useState(item.label ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleFile(f: File | null) {
    setFile(f)
    setError(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      let storage_path = item.storage_path
      let content_type = item.content_type
      const oldPath = item.storage_path

      if (file) {
        const folder = item.storage_path.split('/').slice(0, -1).join('/') || 'misc'
        storage_path = `${folder}/${Date.now()}-${file.name}`
        content_type = file.type
        const { error: upErr } = await supabase.storage
          .from(item.bucket)
          .upload(storage_path, file, { contentType: file.type })
        if (upErr) throw upErr
      }

      const { error: dbErr } = await supabase
        .from('t6_sta_maria_media_groups')
        .update({
          storage_path,
          content_type,
          label: label.trim() === '' ? null : label,
          updated_at: new Date().toISOString(),
        })
        .eq('id', item.id)
      if (dbErr) throw dbErr

      // Limpieza: sin versionado ("último gana"), se borra el archivo reemplazado.
      if (file && oldPath && oldPath !== storage_path) {
        await supabase.storage.from(item.bucket).remove([oldPath])
      }

      handleFile(null)
      onSaved()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const isVideo = (file?.type ?? item.content_type ?? '').startsWith('video')

  return (
    <div className="media-group-item-row">
      <div className="media-group-item-row__info">
        <span className="media-group-item-row__order">#{item.sort_order}</span>
        <span className="media-group-item-row__path">{item.storage_path}</span>
      </div>

      <input
        className="media-group-item-row__label"
        type="text"
        placeholder="Label (opcional)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <div className="media-group-item-row__preview">
        {previewUrl && isVideo && (
          <video src={previewUrl} muted autoPlay loop playsInline />
        )}
        {previewUrl && !isVideo && <img src={previewUrl} alt="preview" />}
      </div>

      <input
        type="file"
        accept="video/mp4,image/jpeg,image/png,image/webp"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      <button disabled={saving} onClick={handleSave}>
        {saving ? 'Guardando…' : 'Guardar'}
      </button>

      {error && <p className="media-group-item-row__error">{error}</p>}
    </div>
  )
}