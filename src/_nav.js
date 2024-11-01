import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilSearch,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import MergeIcon from '@mui/icons-material/Merge';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Menu',
  },
  {
    component: CNavItem,
    name: 'Merge',
    to: '/base/merge',
    icon: <MergeIcon customClassName="nav-icon" style={{ marginRight:'15px' }} />,
    badge: {
      color: 'danger',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Pesquisar Ticket',
    to: '/base/pesquisa',
    icon: <CIcon icon={cilSearch} customClassName="nav-icon" />,
    badge: {
      color: 'success',
      text: 'NEW',
    },
  },
]

export default _nav
