import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
// import { formatDate } from '../../utils/FormatData';

export const getColumns = (handleEditClick, handleDeleteClick) => [
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Ações',
    width: 100,
    getActions: ({ id }) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick(id)}
        color="inherit"
      />,
    ],
  },
  { field: 'name', headerName: 'Nome', flex: 1, minwidth: 180 },
  {
    field: 'price', headerName: 'Preço', flex: 1, type: 'number', minWidth: 130, headerAlign: 'left', align: 'left', valueFormatter: (params) => {
      const value = parseFloat(params);

      if (!isNaN(value)) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      }
      return "R$ 0,00";
    },
  },
];

export const getInitialValues = (edit, editRows) => {
  return {
    ...(edit ? { id: editRows?.id || '' } : {}),
    name: editRows?.name || '',
    price: editRows?.price || 0,
  };
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

export const formatDateToInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
