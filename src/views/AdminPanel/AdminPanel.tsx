import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useAuthStore } from '../../store/useAuthStore'
import MediaAssetRow from './MediaAssetRow'
import type { MediaAssetRecord } from './MediaAssetRow'
import MediaGroupItemRow from './MediaGroupItemRow'
import type { MediaGroupRecord } from './MediaGroupItemRow'
import './AdminPanel.css'

type Tab = 'assets' | 'groups'

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('assets')
  const [assets, setAssets] = useState<MediaAssetRecord[]>([])
  const [groups, setGroups] = useState<MediaGroupRecord[]>([])
  const [loading, setLoading] = useState(true)
  const logout = useAuthStore((s) => s.logout)

  async function loadAll() {
    setLoading(true)
    const [{ data: a }, { data: g }] = await Promise.all([
      supabase.from('t6_sta_maria_media_assets').select('*').order('key'),
      supabase
        .from('t6_sta_maria_media_groups')
        .select('*')
        .order('group_key')
        .order('sort_order'),
    ])
    setAssets(a ?? [])
    setGroups(g ?? [])
    setLoading(false)
  }

  useEffect(() => {
    loadAll()
  }, [])

  const groupsByKey = groups.reduce<Record<string, MediaGroupRecord[]>>((acc, item) => {
    ;(acc[item.group_key] ??= []).push(item)
    return acc
  }, {})

  return (
    <div className="admin-panel">
      <div className="admin-panel__header">
        <h1 className="admin-panel__title">Panel Admin — Media</h1>
        <button className="admin-panel__logout" onClick={() => logout()}>
          Cerrar sesión
        </button>
      </div>

      <div className="admin-panel__tabs">
        <button
          className={`admin-panel__tab ${tab === 'assets' ? 'is-active' : ''}`}
          onClick={() => setTab('assets')}
        >
          Slots únicos
        </button>
        <button
          className={`admin-panel__tab ${tab === 'groups' ? 'is-active' : ''}`}
          onClick={() => setTab('groups')}
        >
          Grupos (galerías/VTI)
        </button>
      </div>

      {loading && <p className="admin-panel__loading">Cargando…</p>}

      {!loading && tab === 'assets' && (
        <div className="admin-panel__list">
          {assets.map((a) => (
            <MediaAssetRow key={a.key} asset={a} onSaved={loadAll} />
          ))}
        </div>
      )}

      {!loading && tab === 'groups' && (
        <div className="admin-panel__list">
          {Object.entries(groupsByKey).map(([groupKey, items]) => (
            <div key={groupKey} className="admin-panel__group">
              <h2 className="admin-panel__group-title">{groupKey}</h2>
              {items.map((item) => (
                <MediaGroupItemRow key={item.id} item={item} onSaved={loadAll} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}