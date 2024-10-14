import React, { useState, useEffect } from 'react';
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
  CPagination,
  CPaginationItem,
  CButton,
} from '@coreui/react';
import axiosInstance from '../../../api/AxiosInstance';
import ButtonTable from '../../../views/buttons/button-groups/ButtonTable';
import ButtonPesquisa from '../../../views/buttons/button-groups/ButtonPesquisa';
import * as XLSX from 'xlsx';

export const TableMerge= ({ openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('Customers');
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

  const handleSort = (field) => {
    const direction = sortedField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedField(field);
    setSortDirection(direction);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (a[sortedField] < b[sortedField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortedField] > b[sortedField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredRows = sortedRows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const getCategoria = (status) => {
    switch (status) {
      case 'Aline Avelar':
        return '#8B0000'
      case 'Inactive':
        return 'secondary'
      case 'Pending':
        return 'warning'
      case 'Banned':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const exportToExcel = () => {
    // Cria uma nova planilha com os dados filtrados
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    // Cria e baixa o arquivo Excel
    XLSX.writeFile(workbook, 'clientes_filtrados.xlsx');
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Clientes</strong>
          </CCardHeader>

          <ButtonPesquisa openModal={openModal} value={searchTerm} onChange={handleSearchChange} exportToExcel={exportToExcel} />

          <CCardBody>
            {/* <CInputGroup className="mb-3">
              <CFormInput
                placeholder="Buscar..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </CInputGroup> */}

            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Ações</CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('id')}>
                    Id {sortedField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('name')}>
                    Nome {sortedField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('number')}>
                    Número {sortedField === 'number' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('address')}>
                    Endereço {sortedField === 'address' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('observation')}>
                    Observação {sortedField === 'observation' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('issueDate')}>
                    Data Cadastro {sortedField === 'issueDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentRows.map((row) => (
                  <CTableRow key={row.id}>
                    <CTableDataCell style={{ padding: '1', textAlign: 'left', width: '90px' }}>
                      <ButtonTable row={row} />
                      {/* handleDelete={handleDelete} */}
                      {/* handleEdit={handleEdit} */}
                    </CTableDataCell>
                    <CTableDataCell>{row.id}</CTableDataCell>
                    <CTableDataCell
                      style={{
                        textAlign: 'left',
                        verticalAlign: 'middle',
                      }}
                    >
                      <span
                        style={
                          row.name === 'Aline Avelar'
                            ? {
                              backgroundColor: getCategoria(row.name),
                              color: 'white',
                              padding: '2px 5px',
                              borderRadius: '3px',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              display: 'inline-block',
                              lineHeight: 'normal',
                              textAlign: 'center',
                            }
                            : {}
                        }
                      >
                        {row.name}
                      </span>
                    </CTableDataCell>
                    <CTableDataCell>{row.number}</CTableDataCell>
                    <CTableDataCell>{row.address}</CTableDataCell>
                    <CTableDataCell>{row.observation}</CTableDataCell>
                    <CTableDataCell>{row.issueDate}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* Paginação */}
            <CPagination className="mt-4">
              {[...Array(totalPages)].map((_, idx) => (
                <CPaginationItem
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </CPaginationItem>
              ))}
            </CPagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
