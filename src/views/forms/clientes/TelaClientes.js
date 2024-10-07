import React, { useState } from 'react'

import { NumericFormat } from 'react-number-format';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CWidgetStatsC,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilDelete, cilSearch, cilSpeech } from '@coreui/icons'

export const TelaClientes = ({ closeModal }) => {

  const [validated, setValidated] = useState(false)
  const obrigatorio = 'Esse campo é obrigatório.';

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  const handleCancel = () => {
    closeModal();
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Cadastro de Clientes</strong>
          </CCardHeader>

          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom01">Nome</CFormLabel>
                <CFormInput type="text" id="validationCustom01" defaultValue="" required />
              </CCol>

              <CCol md={3}>
                <CFormLabel htmlFor="validationCustom05">CPF/CNPJ</CFormLabel>
                <CFormInput type="text" id="validationCustom05" required />
                <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
              </CCol>

              <CCol md={1}>
                <CFormLabel htmlFor="validationCustom05">Pessoa</CFormLabel>
                <CFormInput type="text" id="validationCustom05" required />
                <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom01">Telefone</CFormLabel>
                <CFormInput type="text" id="validationCustom01" defaultValue="" />
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom01">CEP</CFormLabel>
                <CFormInput type="text" id="validationCustom01" defaultValue="" />
              </CCol>

              {/* <CCol md={12}>
                <CFormLabel className="h5" style={{ fontWeight: 'bold', marginTop: '10px' }}>
                  Endereço
                </CFormLabel>
              </CCol> */}

              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom05">Rua</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={1}>
                <CFormLabel htmlFor="validationCustom05">Número</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={3}>
                <CFormLabel htmlFor="validationCustom05">Bairro</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom05">Cidade</CFormLabel>                
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom05">Complemento</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>
  
              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom05">E-mail</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>
  

              {/* <CCol xs={3} lg={4} xxl={2}>
        <CWidgetStatsC
          color="info"
          icon={<CIcon icon={cilSpeech} height={36} />}
          value="972"
          title="Saldo"
          inverse
          progress={{ value: 75 }}
        />
      </CCol> */}

              {/* lg={4} xxl={2} */}

              {/* <CCol xs={12}> */}

              {/* </CCol> */}

              <CCol xs={1}>
                <CButton color="success" type="submit" style={{ marginBottom: '10px', marginLeft: '10px', backgroundColor: '#2E8B57', borderColor: '#2E8B57', color: 'white' }}>
                  Cadastrar
                </CButton>
              </CCol>
              <CCol xs={1}>
                <CButton color="danger" type="reset" style={{ marginBottom: '10px', marginLeft: '20px', backgroundColor: '#da5b5a', borderColor: '#da5b5a', color: 'white' }} onClick={handleCancel}>
                  Fechar
                </CButton>
              </CCol>


            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );

}


