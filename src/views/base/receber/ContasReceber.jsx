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
import { TelaReceber } from '../../forms/receber/Receber'

import axiosInstance from '../../../api/AxiosInstance';
import { getInitialValues, getColumns } from './ColunasReceber';

import CIcon from '@coreui/icons-react'
import { cibAddthis, cilDelete, cilSearch } from '@coreui/icons'
import { TableReceber } from '../tables/TableReceber';

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

export default function ContasAReceber() {
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
          <TelaReceber />
          </Box>
      )}

      <TableReceber/>
    </Box>
  );
}

