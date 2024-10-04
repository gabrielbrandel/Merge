import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { cibBlackberry } from '@coreui/icons';
// import { formatDate } from '../../utils/FormatData';
// const theme = useTheme();
import './index.scss'

export const getColumns = (handleEditClick, handleDeleteClick) => [
  {
    color: '#000000',
    backgroundColor: '#000000',
    field: 'actions',
    type: 'actions',
    headerName: 'Ações',
    width: 100,
    headerClassName: 'custom-header', 
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
  { field: 'name', headerName: 'Nome', flex: 1, minwidth: 180, headerClassName: 'custom-header', },
  {
    field: 'price', headerName: 'Preço', flex: 1, type: 'number', minWidth: 130, headerAlign: 'left', align: 'left', headerClassName: 'custom-header',valueFormatter: (params) => {
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
    fornecedor: editRows?.name || '',
    price: editRows?.price || 0,
    tipo: editRows?.tipo || '',
    grupo: editRows?.grupo || '',
    conta: editRows?.conta || '',
    subgrupo: editRows?.subgrupo || '',
    centrodecusto: editRows?.centrodecusto || '',
    numerodocumento: editRows?.numerodocumento || 0,
    numeroidentificador: editRows?.numeroidentificador || 0,
    parcelas: editRows?.parcelas || 1,
    codigobarrasdocumento: editRows?.codigobarrasdocumento || 0,
    competencia: editRows?.competencia || '',
    dataemissao: editRows?.dataemissao || '',
    datavencimento: editRows?.datavencimento || '',
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
