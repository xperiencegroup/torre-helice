import { supabase } from '../lib/supabaseClient'

const BUCKET_DEFAULT = 'torre_helice_media'

export interface MediaGroupItem {
  url:   string
  label: string | null
}

type AssetsMap = Record<string, string>
type GroupsMap = Record<string, MediaGroupItem[]>

interface AssetRow {
  key:          string
  storage_path: string | null
  bucket:       string | null
  updated_at:   string | null
}

interface GroupRow {
  group_key:    string
  sort_order:   number
  storage_path: string
  label:        string | null
  bucket:       string | null
  updated_at:   string | null
}

const buildPublicUrl = (
  bucket: string | null,
  storagePath: string | null,
  updatedAt: string | null
): string => {
  if (!storagePath) return ''
  const { data } = supabase.storage.from(bucket || BUCKET_DEFAULT).getPublicUrl(storagePath)
  const base = data?.publicUrl
  if (!base) return ''
  const v = updatedAt ? new Date(updatedAt).getTime() : Date.now()
  return `${base}?v=${v}`
}

export const fetchMediaAssets = async (): Promise<AssetsMap> => {
  const { data, error } = await supabase
    .from('torre_helice_media_assets')
    .select('key, storage_path, bucket, updated_at')

  if (error) {
    console.error('[mediaResolver] Error cargando media_assets:', error)
    return {}
  }

  const map: AssetsMap = {}
  ;(data as AssetRow[] | null)?.forEach((row) => {
    map[row.key] = buildPublicUrl(row.bucket, row.storage_path, row.updated_at)
  })
  return map
}

export const fetchMediaGroups = async (): Promise<GroupsMap> => {
  const { data, error } = await supabase
    .from('torre_helice_media_groups')
    .select('group_key, sort_order, storage_path, label, bucket, updated_at')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[mediaResolver] Error cargando media_groups:', error)
    return {}
  }

  const map: GroupsMap = {}
  ;(data as GroupRow[] | null)?.forEach((row) => {
    if (!map[row.group_key]) map[row.group_key] = []
    map[row.group_key].push({
      url:   buildPublicUrl(row.bucket, row.storage_path, row.updated_at),
      label: row.label,
    })
  })
  return map
}

export const fetchAllMedia = async (): Promise<{ assets: AssetsMap; groups: GroupsMap }> => {
  const [assets, groups] = await Promise.all([fetchMediaAssets(), fetchMediaGroups()])
  return { assets, groups }
}