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
import { TablePesquisa } from '../tables/TablePesquisa';
import { TelaPesquisa } from '../../forms/pesquisa/TelaPesquisa'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const PesquisaMenu = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {na
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
        <TablePesquisa openModal={openModal} />
        <CModal visible={modalVisible} onClose={closeModal} size="xl"  >
          <CModalBody>
            <TelaPesquisa closeModal={closeModal} />
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default PesquisaMenu

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
