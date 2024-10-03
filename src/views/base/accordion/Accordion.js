import React from 'react'
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
import { DocsExample } from 'src/components'
import ContasAPagar from '../pagar/ContasPagar.jsx'

const Accordion = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Contas a Pagar</strong>
          </CCardHeader>
          <CCardBody>
            {/* <DocsExample href="components/accordion">
            </DocsExample> */}
          </CCardBody>
          <ContasAPagar/>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
