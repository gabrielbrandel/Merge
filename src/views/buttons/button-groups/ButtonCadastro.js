import {
  CButton,
  CCol,
} from '@coreui/react'

const ButtonCadastro = ({ handleCancel } ) => {
  return (
    <>
      <CCol xs={12} sm={6} md={4} lg={2} className="mb-3">
        <CButton color="success" type="submit" style={{ width: '100%', backgroundColor: '#2E8B57', borderColor: '#2E8B57', color: 'white' }}>
          Cadastrar
        </CButton>
      </CCol>
      <CCol xs={12} sm={6} md={4} lg={2} className="mb-3">
        <CButton color="danger" type="reset" style={{ width: '100%', backgroundColor: '#da5b5a', borderColor: '#da5b5a', color: 'white' }} onClick={handleCancel}>
          Fechar
        </CButton>
      </CCol>
    </>
  );
}

export default ButtonCadastro
