import React, { useState } from 'react'
import './MenuLateral.css'

export interface MenuLateralItem {
  id:      string
  label:   string
  trackId: string
  icon?:   React.ReactNode
}

interface MenuLateralProps {
  items:    MenuLateralItem[]
  activeId: string
  onChange: (id: string) => void
  align?:   'center' | 'left'
}

export const MenuLateral: React.FC<MenuLateralProps> = ({
  items,
  activeId,
  onChange,
  align = 'center',
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={[
        'menu-lateral',
        align === 'left' ? 'menu-lateral--left' : '',
        collapsed ? 'is-collapsed' : '',
      ].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        className="menu-lateral__arrow"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        aria-expanded={!collapsed}
      >
        {collapsed ? '▸' : '▾'}
      </button>

      {!collapsed && (
        <div className="menu-lateral__list" role="tablist" aria-label="Vistas">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                className={[
                  'menu-lateral__item',
                  isActive ? 'menu-lateral__item--active' : '',
                ].filter(Boolean).join(' ')}
                data-track-id={item.trackId}
                onClick={() => onChange(item.id)}
              >
                {item.icon && <span className="menu-lateral__icon">{item.icon}</span>}
                <span className="menu-lateral__label">{item.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MenuLateral