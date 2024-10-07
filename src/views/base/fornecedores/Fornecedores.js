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
import { TableFornecedores } from '../tables/TableFornecedores';
import { TelaFornecedores } from '../../forms/fornecedores/TelaFornecedores'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';

const FornecedorMenu = () => {

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
        <TableFornecedores openModal={openModal} />
        <CModal visible={modalVisible} onClose={closeModal} size="xl"  >
          <CModalBody>
            <TelaFornecedores closeModal={closeModal} />
          </CModalBody>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default FornecedorMenu

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
