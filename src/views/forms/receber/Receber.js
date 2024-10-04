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

export const TelaReceber = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CInputGroup className="mb-2">

        <CCol md={1}>
          <CButton
            type="button"
            color="secondary"
            variant="ghost"
            id="inputGroupFileAddon03"
            style={{
              height: '36px',
              width: '80px',
              marginTop: '32px',
              marginLeft: '10px',
              marginLeft: '10px',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3d99f5',
            }}
          >
            <CIcon icon={cilSearch} style={{
              height: '30px',
              width: '30px',
              '--ci-primary-color': 'white',
            }} />
          </CButton>
        </CCol>

        <CCol md={10}>
          <CFormLabel htmlFor="validationCustom01">Cliente/Fornecedor</CFormLabel>
          <CFormInput type="text" id="validationCustom01" defaultValue="Mark" required />
          <CFormFeedback valid>Looks good!</CFormFeedback>
        </CCol>

        <CCol md={1}>
          <CButton
            type="button"
            color="secondary"
            variant="ghost"
            id="inputGroupFileAddon03"
            style={{
              height: '36px',
              width: '40px',
              marginTop: '32px',
              marginLeft: '10px',
              marginLeft: '10px',
              padding: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}
          >
            <CIcon icon={cilDelete} style={{
              height: '30px',
              width: '30px',
              '--ci-primary-color': 'white',
            }} />
          </CButton>
        </CCol>

      </CInputGroup>

      <CCol md={1}>
        <CButton
          type="button"
          color="secondary"
          variant="ghost"
          id="inputGroupFileAddon03"
          style={{
            height: '36px',
            width: '80px',
            marginTop: '32px',
            marginLeft: '10px',
            marginLeft: '10px',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#249542',
          }}
        >
          <CIcon icon={cilSearch} size="lg" style={{
            height: '30px',
            width: '30px',
            '--ci-primary-color': 'white',
          }} />
        </CButton>
      </CCol>
      <CCol md={7}>
        <CFormLabel htmlFor="validationCustom01">Forma Pagamento</CFormLabel>
        <CFormSelect id="validationCustom04">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>

      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Número Identificador</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>

      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Número Documento</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>

      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Valor</CFormLabel>
        <NumericFormat
          id="validationCustom05"
          customInput={CFormInput} // Usa o CFormInput para manter o estilo padrão
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          required
        />
        <CFormFeedback invalid>Please provide a valid value.</CFormFeedback>
      </CCol>

      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Parcelas</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>

      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Competência</CFormLabel>
        <CFormInput type="date" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>
      <CCol md={2}>
        <CFormLabel htmlFor="validationCustom05">Emissão</CFormLabel>
        <CFormInput type="date" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>

      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom05">Observação</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
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
        <CButton color="success" type="submit" style={{ marginBottom: '10px' }}>
          Cadastrar
        </CButton>
      </CCol>
      <CCol xs={1} >
        <CButton color="danger" type="reset" style={{ marginBottom: '10px' }}>
          Fechar
        </CButton>
      </CCol>


    </CForm>
  )
}


