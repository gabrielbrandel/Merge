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
  useColorModes,
} from '@coreui/react';
import axiosInstance from '../../../api/AxiosInstance';
import ButtonPesquisa from '../../buttons/button-groups/ButtonPesquisa';
import formatDate from '../data/FormatData'
import PostAddIcon from '@mui/icons-material/PostAdd';
import * as XLSX from 'xlsx';
import InputFiltros from '../../buttons/button-groups/InputFiltros';
import Select from 'react-select';
import ButtonToggle from '../../buttons/buttons/ButtonToggle';
import ButtonSelect from '../../buttons/buttons/ButtonSelect';

const today = new Date().toISOString().split('T')[0];
const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

export const TablePesquisa = ({ openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);

  // useState(localStorage.getItem('startDate') || firstDay);

  const [sortedField, setSortedField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setItemsPerPage] = useState(10);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageRangeStart, setPageRangeStart] = useState(1);
  const [toggle, setToggle] = useState('ambas');

  const itemsPerPage = 25;
  const [expandedRow, setExpandedRow] = useState(null);
  const [filters, setFilters] = useState({
    ticket : '',
    categoria : '',
    nomeEmpresa : '',
    descricaoModulo : '',
    tecnico : '',
    status : ''
  });
  const [selectedOptions, setSelectedOptions] = useState({
    selectedOptions1: [],
    selectedOptions2: [],
    filtro1: '',
    filtro2: ''
  });

  // descricaoEquipe : '',

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
      row.ticket?.toString().includes(filters.ticket) &&
      (typeof row.categoria === 'string' ? row.categoria.toLowerCase() : '').includes(filters.categoria) &&
        row.nomeEmpresa.toLowerCase().includes(filters.nomeEmpresa) &&
        row.descricaoModulo.toLowerCase().includes(filters.descricaoModulo) &&
        (typeof row.tecnico === 'string' ? row.tecnico.toLowerCase() : '').includes(filters.tecnico) &&
        (typeof row.status === 'string' ? row.status.toLowerCase() : '').includes(filters.status)
        // row.tecnico.toLowerCase().includes(filters.tecnico)
      // (typeof row.descricaoModulo === 'string' ? row.descricaoModulo.toLowerCase() : '').includes(filters.descricaoModulo) &&
      // (typeof row.status === 'string' ? row.status.toLowerCase() : '').includes(filters.status)
    );
  });
  // (typeof row.descricaoEquipe === 'string' ? row.descricaoEquipe.toLowerCase() : '').includes(filters.descricaoEquipe) &&

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

      localStorage.setItem('rows', JSON.stringify([]));

      const camposNumericos = ["empresa", "codigoCliente", "ticket", "codigoCategoria"];

      let query = 'Consulta/sgps';
      if (startDate && endDate) {
        query += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const selectedOptions1String = selectedOptions.selectedOptions1
        .map(option => {
          const value = selectedOptions.filtro1;
          if (camposNumericos.includes(option.value) && isNaN(value)) {
            alert(`Não é possível realizar a consulta: o valor de '${option.value}' deve ser numérico.`);
            throw new Error("Consulta interrompida devido a valor não numérico.");
          }
          return `&${option.value}=${value}`;
        })
        .join("");

      const selectedOptions2String = selectedOptions.selectedOptions2
        .map(option => {
          const value = selectedOptions.filtro2;
          if (camposNumericos.includes(option.value) && isNaN(value)) {
            alert(`Não é possível realizar a consulta: o valor de '${option.value}' deve ser numérico.`);
            throw new Error("Consulta interrompida devido a valor não numérico.");
          }
          return `&${option.value}=${value}`;
        })
        .join("");

      const resultString = `${selectedOptions1String}${selectedOptions2String}`;

      if (toggle && toggle.trim() !== '') {
        if (toggle === 'Abertas') {
          query += `&statusAberto=1`;
        } else if (toggle === 'Fechadas') {
          query += `&statusFechado=1`;
        }
      }

      query += resultString;
      console.log('result:', query);

      const response = await axiosInstance.get(query);
      const fetchedRows = response.data.data || [];

      localStorage.setItem('rows', JSON.stringify(fetchedRows));
      setRows(response.data.data);

    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    const savedRows = localStorage.getItem('rows');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    }
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
      case 'DUVIDAS':
        return '18px'
      case 'RECLAMACOES':
        return '7px'
      case 'DOCUMENTACAO':
        return '11px'
      case 'SENHA ADMINISTRATIVO':
        return '11px'
      case 'SENHA':
        return '21px'
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

  const { colorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: 'var(--cui-primary)', // Borda com a cor primária
      backgroundColor: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
      '&:hover': { borderColor: 'var(--cui-primary)' },
      boxShadow: `0 0 0 1px var(--cui-primary)`,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--cui-primary)' : colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
      color: state.isFocused ? 'var(--cui-light)' : colorMode === 'dark' ? 'var(--cui-light)' : 'var(--cui-dark)',
      '&:hover': {
        backgroundColor: 'var(--cui-primary)',
        color: 'var(--cui-light)',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--cui-primary)',
      color: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--cui-light)',

    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
      '&:hover': {
        backgroundColor: 'var(--cui-danger)',
        color: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
      },
    }),
  };

  const handleSelectedOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
    console.log('filtros:', newSelectedOptions);
  };

  return (
    <CRow>
      <CCol xs={12} md={12} lg={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Pesquisar Ticket</strong>
          </CCardHeader>

          <ButtonSelect onSelectedOptionsChange={handleSelectedOptionsChange}/>

          <CInputGroup className="mb-3" style={{ marginLeft: '22px' }}>
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

            <CCol md={2} style={{ marginLeft: '5px', width: '80px' }}>
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
            <ButtonToggle setFilter={setToggle} />
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
            <CTable style={{ width: 'auto', tableLayout: 'auto' }}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ width: '110px' }} scope="col" onClick={() => handleSort('ticket')}>
                    O.S {sortedField === 'ticket' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '120px' }} scope="col" onClick={() => handleSort('categoria')}>
                    Categoria {sortedField === 'categoria' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell style={{ maxWidth: '100px' }} scope="col" onClick={() => handleSort('descricaoEquipe')}>
                    Equipe {sortedField === 'descricaoEquipe' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell> */}
                  <CTableHeaderCell style={{ width: '300px' }} scope="col" onClick={() => handleSort('nomeEmpresa')}>
                    Nome Empresa {sortedField === 'nomeEmpresa' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '150px' }} scope="col" onClick={() => handleSort('descricaoModulo')}>
                    Modulo {sortedField === 'descricaoModulo' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '350px' }} scope="col" onClick={() => handleSort('tecnico')}>
                    Técnico {sortedField === 'tecnico' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell style={{ width: '120px' }} scope="col" onClick={() => handleSort('status')}>
                    Status {sortedField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('data')}>
                    Data {sortedField === 'data' && (sortDirection === 'asc' ? '↑' : '↓')}
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
                      onChange={(e) => handleFilterChange('ticket', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('categoria', e.target.value)}
                    />
                  </CTableDataCell>
                  {/* <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('descricaoEquipe', e.target.value)}
                    />
                  </CTableDataCell> */}
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('nomeEmpresa', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('descricaoModulo', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('tecnico', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    />
                  </CTableDataCell>
                  {/* <CTableDataCell>
                    <CFormInput
                      onChange={(e) => handleFilterChange('versao', e.target.value)}
                    />
                  </CTableDataCell> */}
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>


              </CTableHead>
              <CTableBody>
                {currentRows.map((row) => (
                  <React.Fragment key={row.ticket}>
                    <CTableRow key={row.ticket}>
                      <CTableDataCell>{row.ticket}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          textAlign: 'left',
                          verticalAlign: 'middle',
                          width: '170px',
                          height: '40px',
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
                                width: '110px',
                                // width: '170px',
                              }
                              : {}
                          }
                        >
                          {row.categoria}
                        </span>
                      </CTableDataCell>
                      {/* <CTableDataCell>{row.descricaoEquipe}</CTableDataCell> */}
                      <CTableDataCell>{row.nomeEmpresa}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          textAlign: 'left',
                          verticalAlign: 'middle',
                          width: '150px',
                          height: '40px'
                        }}
                      >
                        {row.descricaoModulo}
                      </CTableDataCell>
                      <CTableDataCell  >{row.tecnico}</CTableDataCell>
                      <CTableDataCell>{row.status}</CTableDataCell>
                      <CTableDataCell>{formatDate(row.data)}</CTableDataCell>
                    </CTableRow>
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
