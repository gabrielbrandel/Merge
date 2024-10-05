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


export const TableReceber = ({ openModal }) => {
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Contas a Receber</strong>
          </CCardHeader>

          <CInputGroup className="mb-2">
            <CCol md={12}>
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
              <CButton color="success" type="submit" onClick={openModal} style={{ marginTop: '10px', marginLeft: '10px' }} >
                Adicionar Contas a Receber
              </CButton>
            </CCol>
          </CInputGroup>

          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Preço</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {rows.map((row) => (
                  <CTableRow key={row.id}>
                    <CTableDataCell>{row.id}</CTableDataCell>
                    <CTableDataCell>{row.name}</CTableDataCell>
                    <CTableDataCell>{row.price}</CTableDataCell>
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
