import React from 'react'
import ContasAReceber from './ContasReceber'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'

const ReceberMenu = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Contas a Receber</strong>
          </CCardHeader>
          <CCardBody>
          </CCardBody>
          <ContasAReceber />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ReceberMenu
