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
  CPaginationItem
} from '@coreui/react';
import axiosInstance from '../../../api/AxiosInstance';
import ButtonTable from '../../../views/buttons/button-groups/ButtonTable';
import ButtonPesquisa from '../../../views/buttons/button-groups/ButtonPesquisa';

export const TableClientes = ({ openModal }) => {
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Clientes</strong>
          </CCardHeader>

          <ButtonPesquisa openModal={openModal} value={searchTerm} onChange={handleSearchChange} />

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
                        textAlign: 'left', // Centraliza o conteúdo da célula
                        verticalAlign: 'middle', // Garante o alinhamento vertical da célula
                      }}
                    >
                      <span
                        style={
                          row.name === 'Aline Avelar'
                            ? {
                              backgroundColor: getCategoria(row.name),
                              color: 'white',
                              padding: '2px 5px', // Espaçamento interno para o estilo de botão
                              borderRadius: '3px', // Arredondamento dos cantos
                              fontWeight: 'bold',
                              fontSize: '16px', // Tamanho da fonte
                              display: 'inline-block', // Ajusta ao tamanho do conteúdo
                              lineHeight: 'normal',
                              textAlign: 'center', // Centraliza o texto dentro do "botão"
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
