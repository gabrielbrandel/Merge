import React, { useState, useEffect } from 'react';
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
import { TelaPagar } from '../../../../src/views/forms/pagar/TelaPagar.js'
import { TablePagar } from '../../../../src/views/base/tables/TablePagar.js'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const Accordion = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCardBody>
        </CCardBody>
        <TablePagar openModal={openModal} />
        <CModal visible={modalVisible} onClose={closeModal} size="xl"  >
          <CModalBody>
            <TelaPagar closeModal={closeModal} />
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default Accordion
