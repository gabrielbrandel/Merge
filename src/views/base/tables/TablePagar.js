import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormLabel,
  CFormFeedback,
  CFormInput,
  CInputGroup,
} from '@coreui/react'
import axiosInstance from '../../../api/AxiosInstance';
import TextField from '@mui/material/TextField';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';
import AddIcon from '@mui/icons-material/Add';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilTrash, cilPencil } from '@coreui/icons';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const TablePagar = ({ openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('CategoryExpense');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id) => {
    console.log('Edit item with id:', id);
    // Adicione aqui a lógica para editar o item
  };

  const handleDelete = (id) => {
    console.log('Delete item with id:', id);
    // Adicione aqui a lógica para deletar o item
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Contas a Pagar</strong>
          </CCardHeader>

          <CInputGroup className="mb-2">
            <CCol md={8}>
              <CFormLabel htmlFor="validationCustom01" style={{
                marginLeft: '10px',
                marginTop: '10px',
                padding: 0,
                display: 'flex',
              }} >Pesquisar</CFormLabel>
              <CFormInput type="text" id="validationCustom01" defaultValue="" style={{
                height: '36px',
                width: '97%',
                marginLeft: '10px',
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }} />
            </CCol>
            <CCol xs={4}>
              <CButton
                color="terciary"
                type="submit"
                onClick={openModal}
                style={{ marginTop: '40px', marginLeft: '10px', backgroundColor: '#2E8B57', borderColor: '#2E8B57', color: 'white' }}
              >
                <PostAddIcon/>
              </CButton>

            </CCol>
          </CInputGroup>
          
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows.map((row) => (
                  <CTableRow key={row.id}>
                    <CTableDataCell style={{ padding: '1', textAlign: 'left', width: '90px' }}>
                      <CButton style={{ backgroundColor: '#696969', borderColor: '#696969', color: 'white' }} size="sm" onClick={() => handleEdit(row.id)}>
                        <CIcon icon={cilPencil} />
                        </CButton>
                      {' '}
                      <CButton style={{ backgroundColor: '#da5b5a', borderColor: '#da5b5a', color: 'white' }} size="sm" onClick={() => handleDelete(row.id)}>
                        <CIcon icon={cilTrash} />     
                        </CButton>
                    </CTableDataCell>
                    <CTableDataCell>{row.id}</CTableDataCell>
                    <CTableDataCell>{row.name}</CTableDataCell>
                    <CTableDataCell>
                      {row.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

// export default TableReceber
