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
import { TableClientes } from '../tables/TableClientes';
import { TelaClientes } from '../../forms/clientes/TelaClientes'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const ClienteMenu = () => {

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
        <TableClientes openModal={openModal} />
        <CModal visible={modalVisible} onClose={closeModal} size="xl"  >
          <CModalBody>
            <TelaClientes closeModal={closeModal} />
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default ClienteMenu

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
