import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a target="_blank" rel="noopener noreferrer">
          Gabriel Brandel
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
