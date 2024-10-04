import React from 'react'
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
} from '@coreui/react'

export const TableReceber = () => {
  const items = [
    { id: 1, name: 'John Doe', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', status: 'Inactive', role: 'Member' },
    { id: 3, name: 'Sam Wilson', status: 'Pending', role: 'Staff' },
  ];

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Contas a Receber</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Coluna 0</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Coluna 1</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Coluna 2</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Coluna 3</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {items.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.id}</CTableDataCell>
                    <CTableDataCell>{item.name}</CTableDataCell>
                    <CTableDataCell>{item.status}</CTableDataCell>
                    <CTableDataCell>{item.role}</CTableDataCell>
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
