import React, { useState, useEffect } from 'react';
// import ContasAReceber from './ContasReceber'
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
import { TableReceber } from '../tables/TableReceber';
import { TelaReceber } from '../../forms/receber/TelaReceber'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const ReceberMenu = () => {

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
        <TableReceber openModal={openModal} />
        <CModal visible={modalVisible} onClose={closeModal} size="xl"  >
          <CModalBody>
            <TelaReceber closeModal={closeModal} />
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default ReceberMenu

//   < Box >
//   <TableReceber />
// { console.log('modal:', modalVisible, closeModal) }
// {
//   (cadastro || edit) && (
//     <CModal visible={modalVisible} onClose={closeModal}>
//       <CModalHeader>Editar Despesa</CModalHeader>
// <CModalBody>
//   <TelaReceber edit={edit} cadastro={cadastro} closeModal={closeModal} />
// </CModalBody>
//       <CModalFooter>
//         <CButton color="secondary" onClick={closeModal}>
//           Fechar
//         </CButton>
//       </CModalFooter>
//     </CModal>
//   )
// }
//     </Box >
