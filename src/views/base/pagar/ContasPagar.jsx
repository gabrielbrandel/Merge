import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import { useMediaQuery, useTheme } from '@mui/material';
import { NumericFormat } from 'react-number-format';

import axiosInstance from '../../../api/AxiosInstance';
import { getInitialValues, getColumns } from './ColunasPagar';

import CIcon from '@coreui/icons-react'
import { cibAddthis, cilDelete, cilSearch } from '@coreui/icons'

function EditToolbar({ setSelectedClient, setEdit, setCadastro }) {
  const handleClick = () => {
    setSelectedClient(null);
    setEdit(false);
    setCadastro(true);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Adicionar Despesa
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [editRows, setEditRows] = useState(null);
  const navigate = useNavigate();
  const [selectedClient, setSelectedClient] = useState(null);
  const [edit, setEdit] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

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

  const handleUpdate = async (values) => {
    try {
      if (edit) {
        values.price = formatToDecimal(values.price);
        await axiosInstance.put(`CategoryExpense/${editRows.id}`, values);
        const updatedClients = rows.map(client =>
          client.id === editRows.id ? { ...client, ...values } : client
        );
        setRows(updatedClients);
      } else if (cadastro) {

        console.log('data:', values)

        values.price = formatToDecimal(values.price);
        const response = await axiosInstance.post('CategoryExpense', values);
        setRows([...rows, response.data]);
      }

      setSelectedClient(null);
      setEditRows(null);
      setEdit(false);
      setCadastro(false);
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const handleGetId = async (value) => {
    try {
      if (value) {
        const response = await axiosInstance.get(`CategoryExpense/${value}`);
        setEditRows(response.data);
      }
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  const handleEditClick = (id) => () => {
    navigate(`/edit/${id}`);
    setSelectedClient(id);
    handleGetId(id);
    setEdit(true);
    setCadastro(false);
  };

  const handleDeleteClick = (id) => () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar essa despesas?');

    if (confirmDelete) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`CategoryExpense/${id}`);

      const updatedClients = rows.filter(client => client.id !== id);
      setRows(updatedClients);
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleCancel = () => {
    setSelectedClient(null);
    setEditRows(null);
    setEdit(false);
    setCadastro(false);
  };

  const columns = getColumns(handleEditClick, handleDeleteClick);
  const initialValues = getInitialValues(edit, editRows);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Verifica se name existe
      (row.number && row.number.toString().includes(searchTerm)) ||  // Verifica se number existe
      row.address?.toLowerCase().includes(searchTerm.toLowerCase())  // Verifica se address existe
    );
  });

  const formatToDecimal = (value) => {

    if (typeof value === 'number') {
      return value;
    }

    let formattedValue = value.replace(/[^\d.,]/g, '');
    formattedValue = formattedValue.replace(',', '.');
    formattedValue = formattedValue.replace('R$', '');
    return parseFloat(formattedValue) || 0;
  };

  return (
    <Box
      sx={{
        marginLeft: '5px', marginRight: '5px',
        backgroundColor: theme.palette.background.paper.secondary,
        color: theme.palette.text,
      }}
    >
      {!(cadastro || edit) && (
        <Box sx={{ mb: 2 }}>
          {/* Input de Pesquisa */}
          <TextField
            label="Pesquisar"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              mb: 2,
              marginRight: '2px',
              ml: 0.5,
              mr: 0.5,
              width: 'calc(100% - 10px)',
              // marginLeft: '5px',
              // marginRight: '5px',
              // Customizando a cor do rótulo, borda e texto
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', // Cor da borda
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Cor da borda ao passar o mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Cor da borda quando focado
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white', // Cor do rótulo
              },
              '& .MuiInputBase-input': {
                color: 'white', // Cor do texto digitado
              },
            }}
            InputLabelProps={{
              style: { color: 'white' }, // Cor do rótulo em modo focado
            }}
          />
          <DataGrid
            sx={{
              marginLeft: '5px', marginRight: '5px',
              // backgroundColor: theme.palette.background.paper.secondary,
              color: 'white',
            }}
            rows={filteredRows}
            columns={columns}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setSelectedClient, setEdit, setCadastro },
            }}
          />
        </Box>
      )}

      {(cadastro || edit) && (
        <Box>
          <Paper elevation={3} className="custom-paper" style={{ padding: '14px' }}>
            <Typography variant="h6">{edit ? 'Atualizar Conta à Pagar' : 'Cadastrar Conta à Pagar'}</Typography>
            <Form
              onSubmit={handleUpdate}
              initialValues={initialValues}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                  <Box display="flex" flexDirection="row" gap={2}>
                    <Box flex={0.040} marginTop={'20px'}>
                      <CIcon icon={cilSearch} className="text-info" size="3xl" />
                    </Box>
                    <Box flex={1}>
                      <Field name="fornecedor">
                        {({ input }) => (
                          <TextField
                            label="Nome Fornecedor"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={0.040} marginTop={'20px'}>
                      <CIcon icon={cilDelete} className="text-danger" size="3xl" />
                    </Box>
                  </Box>
                  
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Box flex={0.045} marginTop={'19px'} >
                      <CIcon icon={cibAddthis} className="text-success" size="3xl" />
                    </Box>
                    <Box flex={1}>
                      <Field name="tipo">
                        {({ input }) => (
                          <TextField
                            label="Tipo de Conta"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={0.045} marginTop={'19px'}>
                      <CIcon icon={cibAddthis} className="text-success" size="3xl" />
                    </Box>
                    <Box flex={1}>
                      <Field name="grupo">
                        {({ input }) => (
                          <TextField
                            label="Grupo de Conta"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Box flex={0.045} marginTop={'19px'}>
                      <CIcon icon={cibAddthis} className="text-success" size="3xl" />
                    </Box>
                    <Box flex={1}>
                      <Field name="subgrupo">
                        {({ input }) => (
                          <TextField
                            label="SubGrupo de Conta"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={0.045} marginTop={'19px'}>
                      <CIcon icon={cibAddthis} className="text-success" size="3xl" />
                    </Box>
                    <Box flex={1}>
                      <Field name="conta">
                        {({ input }) => (
                          <TextField
                            label="Conta"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="row" gap={2}>
                    <Box flex={0.03} marginTop={'19px'}>
                      <CIcon icon={cibAddthis} className="text-success" size="3xl" />
                    </Box>
                    <Box flex={1}>
                      <Field name="centrodecusto">
                        {({ input }) => (
                          <TextField
                            label="Centro de Custo"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Box flex={1}>
                      <Field name="numeroidentificador">
                        {({ input }) => (
                          <TextField
                            label="Número Identificador"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field name="numerodocumento">
                        {({ input }) => (
                          <TextField
                            label="Número Documento"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={2} marginTop={-1.9}>
                      <Field name="price">
                        {({ input, meta }) => (
                          <FormControl fullWidth margin="normal">
                            <NumericFormat
                              {...input}
                              customInput={TextField}
                              label="Valor"
                              thousandSeparator=","
                              decimalSeparator="."
                              prefix="R$ "
                              onValueChange={(values) => {
                                input.onChange(values.value);
                              }}
                            />
                            {meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
                          </FormControl>
                        )}
                      </Field>
                    </Box>                    
                    <Box flex={1}>
                      <Field name="parcelas">
                        {({ input }) => (
                          <TextField
                            label="Parcelas"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>

                  <Field name="name">
                    {({ input }) => (
                      <TextField
                        label="Descrição do Documento"
                        {...input}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  </Field>
                  <Field name="codigobarrasdocumento">
                    {({ input }) => (
                      <TextField
                        label="Codigo de barras do documento"
                        {...input}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  </Field>
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Box flex={1}>
                      <Field name="competencia">
                        {({ input }) => (
                          <TextField
                            type="date"
                            label="Competência"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true, 
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field name="dataemissao">
                        {({ input }) => (
                          <TextField
                            type="date"
                            label="Emissão"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true, 
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Box flex={1}>
                      <Field name="datavencimento">
                        {({ input }) => (
                          <TextField
                            type="date"
                            label="Vencimento"
                            {...input}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true, 
                            }}
                          />
                        )}
                      </Field>
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="row" gap={1} justifyContent="flex-end" marginTop={1} >
                    <Box flex={0}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: '100%' }}
                        sx={{
                          mb: 2,
                          width: '100%',
                          backgroundColor: '#006400', 
                          color: '#ffffff', 
                          '&:hover': {
                            backgroundColor: '#006400',
                          },
                        }}                        
                      >
                        {edit ? 'Salvar Alterações' : 'Cadastrar'}
                      </Button>
                    </Box>
                    <Box flex={0}>
                      <Button
                        variant="outlined"
                        color="default"
                        onClick={handleCancel}
                        style={{ width: '100%' }}
                        sx={{
                          mb: 2,
                          width: '100%',
                          backgroundColor: '#8B0000',
                          color: '#ffffff', 
                          '&:hover': {
                            backgroundColor: '#8B0000', 
                          },
                        }}
                      >
                        Fechar
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}

// name: editRows?.name || '',
//   fornecedor: editRows?.name || '',
//     price: editRows?.price || 0,
//       tipo: editRows?.tipo || '',
//         grupo: editRows?.grupo || '',
//           conta: editRows?.conta || '',
//             subgrupo: editRows?.subgrupo || '',
//               centrodecusto: editRows?.centrodecusto || '',
//                 numerodocumento: editRows?.numerodocumento || 0,
//                   numeroidentificador: editRows?.numeroidentificador || 0,
//                     parcelas: editRows?.parcelas || 0,
//                       codigobarrasdocumento: editRows?.codigobarrasdocumento || 0,
//                         competencia: editRows?.competencia || '',
//                           dataemissao: editRows?.dataemissao || '',
//                             datavencimento: editRows?.datavencimento || '',