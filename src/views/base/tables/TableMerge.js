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
  CFormSelect,
} from '@coreui/react';
import axiosInstance from '../../../api/AxiosInstance';
import ButtonPesquisa from '../../../views/buttons/button-groups/ButtonPesquisa';
import formatDate from '../data/FormatData'
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as XLSX from 'xlsx';
import InputFiltros from '../../buttons/button-groups/InputFiltros';

const today = new Date().toISOString().split('T')[0];
const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

export const TableMerge = ({ openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setItemsPerPage] = useState(10);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageRangeStart, setPageRangeStart] = useState(1);

  const itemsPerPage = 25;
  const [expandedRow, setExpandedRow] = useState(null);
  const [filters, setFilters] = useState({
    fkIdOrdemServico: '',
    categoria: '',
    descricaoEquipe: '',
    nomeUsuario: '',
    motivo: '',
    status: '',
    versao: '',
    dataHora: ''
  });

  const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value.toLowerCase() });
  };

  const toggleExpand = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
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

  const filteredRows = sortedRows.filter((row) => {
    return (
      row.fkIdOrdemServico?.toString().includes(filters.fkIdOrdemServico) &&
      (typeof row.categoria === 'string' ? row.categoria.toLowerCase() : '').includes(filters.categoria) &&
      (typeof row.descricaoEquipe === 'string' ? row.descricaoEquipe.toLowerCase() : '').includes(filters.descricaoEquipe) &&
      (row.nomeUsuario && Array.isArray(row.nomeUsuario)
        ? row.nomeUsuario.some(nome => nome.toLowerCase().includes(filters.nomeUsuario.toLowerCase()))
        : ''
      ) &&
      (row.motivo && Array.isArray(row.motivo)
        ? row.motivo.some(nome => nome.toLowerCase().includes(filters.motivo.toLowerCase()))
        : ''
      ) &&
      (row.status && Array.isArray(row.status)
        ? row.status.some(nome => nome.toLowerCase().includes(filters.status.toLowerCase()))
        : ''
      ) &&
      (row.versao && Array.isArray(row.versao)
        ? row.versao.some(nome => {
          const isDate = !isNaN(Date.parse(nome));
          if (isDate) {
            const formattedDate = new Date(nome).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            });
            const formattedFilter = new Date(filters.versao).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit'
            });
            return formattedDate === formattedFilter;
          }
          return nome.toLowerCase().includes(filters.versao.toLowerCase());
        })
        : ''
      )


    );
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate') || firstDay);
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate') || today);

  const handleNextRange = () => {
    if (pageRangeStart + itemsPerPage <= totalPages) {
      setPageRangeStart(pageRangeStart + itemsPerPage);
      setCurrentPage(pageRangeStart + itemsPerPage);
    }
  };

  const handlePreviousRange = () => {
    if (pageRangeStart - itemsPerPage > 0) {
      setPageRangeStart(pageRangeStart - itemsPerPage);
      setCurrentPage(pageRangeStart - itemsPerPage);
    } else {
      setPageRangeStart(1);
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    localStorage.setItem('startDate', startDate);
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem('endDate', endDate);
  }, [endDate]);

  const handleItemsPerPage = (value) => {
    setItemsPerPage(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const fetchMerges = async () => {
    try {
      setIsLoading(true);
      let query = 'Merges';
      if (startDate && endDate) {
        query += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await axiosInstance.get(query);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMerges();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    const direction = sortedField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortedField(field);
    setSortDirection(direction);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pagesToShow = [...Array(itemsPerPage)].map((_, idx) => {

    const pageNumber = pageRangeStart + idx;
    return pageNumber <= totalPages ? pageNumber : null;
  }).filter(page => page !== null);

  const getCategoria = (status) => {
    switch (status) {
      case 'BUG DE IMPACTO':
        return '#8B0000'
      case 'BUG SEM IMPACTO':
        return '#DAA520'
      case 'ERRO INTERNO':
        return '#DAA520'
      case 'ALTERACAO DO SISTEMA':
        return '#228B22'
      default:
        return '#483D8B'
    }
  }

  const setFonteCategoria = (status) => {
    switch (status) {
      case 'IMPLEMENTACAO':
        return '11px'
      default:
        return '13px'
    }
  }

  const setDisplayButton = (campo) => {
    if (campo === undefined) {
      return 'none';
    } else {
      return ''
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

    XLSX.writeFile(workbook, 'merges_filtrados.xlsx');
  };

  return (
    <CRow>
      <CCol xs={12} md={12} lg={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Controle de Merges</strong>
          </CCardHeader>

          {/* <ButtonPesquisa value={searchTerm} onChange={handleSearchChange} exportToExcel={exportToExcel} /> */}

          <CInputGroup className="mb-3" style={{ marginLeft: '20px', marginTop: '20px' }}>
            <CCol md={2}>
              <CFormLabel htmlFor="validationCustom05" style={{ marginLeft: '10px' }}>
                Início
              </CFormLabel>
              <CFormInput type="date" id="validationCustom05" value={startDate} onChange={(e) => handleStartDateChange(e.target.value)} />
            </CCol>

            <CCol md={2} style={{ marginLeft: '5px' }}>
              <CFormLabel htmlFor="validationCustom05">
                Final
              </CFormLabel>
              <CFormInput type="date" id="validationCustom05" value={endDate} onChange={(e) => handleEndDateChange(e.target.value)} />
            </CCol>

            <CCol md={2} style={{ marginLeft: '5px', width:'80px' }}>
              <CFormLabel htmlFor="validationCustom05" style={{ marginLeft: '10px' }}>
                Linhas
              </CFormLabel>
              <CFormSelect onChange={(e) => handleItemsPerPage(Number(e.target.value))}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </CFormSelect>
            </CCol>
            <CButton
              color="terciary"
              type="submit"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={() => {
                fetchMerges();
              }}
              disabled={isLoading}
              style={{
                height: '36px',
                backgroundColor: '#2E8B57',
                borderColor: '#2E8B57',
                color: 'white',
                borderRadius: '8px',
                marginLeft: '20px',
                marginTop: '32px',
                padding: '0 12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'transform 0.2s ease',
                transform: isPressed ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status" style={{ marginLeft: '8px' }}>Carregando...</span>
                </>
              ) : (
                'Filtrar'
              )}
            </CButton>
          </CInputGroup>

          <CCardBody>
            <CTable style={{ width: '100%', tableLayout: 'fixed' }}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ width: '110px' }} scope="col" onClick={() => handleSort('fkIdOrdemServico')}>
                    O.S {sortedField === 'fkIdOrdemServico' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('categoria')}>
                    Categoria {sortedField === 'categoria' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('descricaoEquipe')}>
                    Equipe {sortedField === 'descricaoEquipe' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('nomeUsuario')}>
                    Usuário {sortedField === 'nomeUsuario' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '300px' }} scope="col" onClick={() => handleSort('motivo')}>
                    Motivo {sortedField === 'motivo' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('status')}>
                    Status {sortedField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('versao')}>
                    Data Versão {sortedField === 'versao' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('dataHora')}>
                    Data {sortedField === 'dataHora' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" onClick={() => handleSort('ticketMilestone')}>
                    Milestone {sortedField === 'ticketMilestone' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell> */}
                  {/* <CTableHeaderCell scope="col" onClick={() => handleSort('autorizado')}>
                    Autorizado {sortedField === 'autorizado' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell> */}
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('fkIdOrdemServico', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('categoria', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('descricaoEquipe', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('nomeUsuario', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('motivo', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('versao', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>


              </CTableHead>
              <CTableBody>
                {currentRows.map((row) => (
                  <React.Fragment key={row.fkIdOrdemServico}>
                    <CTableRow key={row.fkIdOrdemServico}>
                      <CTableDataCell>{row.fkIdOrdemServico}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          textAlign: 'left',
                          verticalAlign: 'middle',
                          width: '170px',
                        }}
                      >
                        <span
                          style={
                            getCategoria(row.categoria) !== 'primary'
                              ? {
                                backgroundColor: getCategoria(row.categoria),
                                color: 'white',
                                padding: '2px 5px',
                                borderRadius: '3px',
                                fontWeight: 'bold',
                                fontSize: setFonteCategoria(row.categoria),
                                display: 'inline-block',
                                lineHeight: 'normal',
                                textAlign: 'center',
                                paddingTop: '6px',
                                height: '40px',
                                // width: '170px',
                              }
                              : {}
                          }
                        >
                          {row.categoria}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>{row.descricaoEquipe}</CTableDataCell>
                      <CTableDataCell>{row.nomeUsuario[0]}</CTableDataCell>
                      <CTableDataCell  >{row.motivo[0]}</CTableDataCell>
                      <CTableDataCell>{row.status[0]}</CTableDataCell>
                      <CTableDataCell>{row.versao[0]}</CTableDataCell>
                      <CTableDataCell>{formatDate(row.dataHora[0])}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          style={{ display: setDisplayButton(row.nomeUsuario[1])}}
                          color="primary"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleExpand(row.fkIdOrdemServico)}
                        >
                          {expandedRow === row.fkIdOrdemServico ? 'Recolher' : 'Expandir'}
                        </CButton>
                      </CTableDataCell>
                      {/* <CTableDataCell>{row.ticketMilestone}</CTableDataCell> */}
                      {/* <CTableDataCell>{row.autorizado}</CTableDataCell> */}
                    </CTableRow>
                    {expandedRow === row.fkIdOrdemServico && (
                      <>

                        {/* <CTableRow>
                          <CTableHeaderCell colSpan="3" scope="col" >
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Usuário
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Motivo
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Status
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Data Versão
                          </CTableHeaderCell>
                          <CTableHeaderCell scope="col">
                            Data
                          </CTableHeaderCell>
                        </CTableRow> */}

                        {row.nomeUsuario?.slice(1).map((_, index) => (
                          <CTableRow key={index + 1}> {/* Use index + 1 para garantir que a key corresponda ao índice correto */}
                            <CTableDataCell>{''}</CTableDataCell>
                            <CTableDataCell>{''}</CTableDataCell>
                            <CTableDataCell>{''}</CTableDataCell>
                            <CTableDataCell>{row.nomeUsuario?.[index + 1] || ''}</CTableDataCell> {/* Usar index + 1 para acessar a posição correta */}
                            <CTableDataCell>{row.motivo?.[index + 1] || ''}</CTableDataCell>
                            <CTableDataCell>{row.status?.[index + 1] || ''}</CTableDataCell>
                            <CTableDataCell>{row.versao?.[index + 1] || ''}</CTableDataCell>
                            <CTableDataCell>{row.dataHora?.[index + 1] ? formatDate(row.dataHora[index + 1]) : ''}</CTableDataCell>
                          </CTableRow>
                        ))}

                      </>
                    )}

                  </React.Fragment>
                ))}
              </CTableBody>
            </CTable>


            <CCol md={12}>
              <CPagination align="center" aria-label="Page navigation example">
                <CPaginationItem
                  disabled={pageRangeStart === 1}
                  onClick={handlePreviousRange}
                >
                  Anterior
                </CPaginationItem>

                {pagesToShow.map((page) => (
                  <CPaginationItem
                    key={page}
                    active={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </CPaginationItem>
                ))}

                <CPaginationItem
                  disabled={pageRangeStart + itemsPerPage > totalPages}
                  onClick={handleNextRange}
                >
                  Próximo
                </CPaginationItem>
              </CPagination>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
