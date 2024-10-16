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

import ButtonTable from '../../buttons/button-groups/ButtonTable'
import ButtonPesquisa from '../../buttons/button-groups/ButtonPesquisa'

export const TableMotoristas = ({ openModal }) => {
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
  };

  const handleDelete = (id) => {
    console.log('Delete item with id:', id);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tabela de Motoristas</strong>
          </CCardHeader>

          <ButtonPesquisa openModal={openModal} />

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
