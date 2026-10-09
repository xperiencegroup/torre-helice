import { useState } from 'react'
import './MenuInferior.css'

export interface MenuInferiorItem {
  id:    string
  label: string
  icon:  string
}

interface Props {
  items:    MenuInferiorItem[]
  onSelect: (id: string) => void
}

const MenuInferior: React.FC<Props> = ({ items, onSelect }) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav className={`menu-inferior ${collapsed ? 'is-collapsed' : ''}`}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="menu-inferior__item"
          onClick={() => onSelect(item.id)}
        >
          <img src={item.icon} alt="" className="menu-inferior__icon" />
          {!collapsed && <span className="menu-inferior__label">{item.label}</span>}
        </button>
      ))}

        <button
          type="button"
          className="menu-inferior__arrow"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? '▸' : '▾'}
        </button>
    </nav>
  )
}

export default MenuInferior
