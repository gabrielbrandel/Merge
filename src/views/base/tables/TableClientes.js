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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ButtonTable from '../../../views/buttons/button-groups/ButtonTable'

export const TableClientes = ({ openModal }) => {
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
            <strong>Cadastro de Clientes</strong>
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
                <PersonAddIcon/>
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
                      <ButtonTable row={row} handleEdit={handleEdit} handleDelete={handleDelete} />
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
