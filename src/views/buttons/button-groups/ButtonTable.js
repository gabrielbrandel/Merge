import { CButton } from '@coreui/react'
import { cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const ButtonTable = ({ row, handleEdit, handleDelete }) => {
  return (
    <>
      <CButton style={{ backgroundColor: '#696969', borderColor: '#696969', color: 'white' }} size="sm" onClick={() => handleEdit(row.id)}>
        <CIcon icon={cilPencil} />
      </CButton>
      {' '}
      <CButton style={{ backgroundColor: '#da5b5a', borderColor: '#da5b5a', color: 'white' }} size="sm" onClick={() => handleDelete(row.id)}>
        <CIcon icon={cilTrash} />
      </CButton>
    </>
  );
}

export default ButtonTable
