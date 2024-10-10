import React, { useState } from 'react'
import InputMask from 'react-input-mask';

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
import ButtonCadastro from '../../buttons/button-groups/ButtonCadastro';
import { useGesture } from '@use-gesture/react';

// npm install @use-gesture / react

export const TelaClientes = ({ closeModal }) => {

  const [validated, setValidated] = useState(false)
  const obrigatorio = 'Esse campo é obrigatório.';
  const [isCNPJ, setIsCNPJ] = useState(false);
  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  const bind = useGesture({
    onPointerDown: (state) => {
      setIsPressed(true);
      const newTimer = setTimeout(() => {
        console.log('Pressionado por 3000ms!');
        setIsPressed(false);
        setTimer(null);
      }, 3000);
      setTimer(newTimer);
    },
    onPointerUp: () => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      setIsPressed(false);
    }
  });

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

  const handleMaskChange = (e) => {
    const valueWithoutMask = e.target.value.replace(/\D/g, '');
    setValue(valueWithoutMask);

    if (valueWithoutMask.length > 11) {
      setIsCNPJ(true);
    } else {
      setIsCNPJ(false);
    }
  };

  const handleValidateClick = () => {
    const formattedValue = isCNPJ
      ? value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
      : value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    setValue(formattedValue);
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
              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom01">Nome</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="validationCustom01"
                    defaultValue=""
                    required
                  />
                  <CButton
                    {...bind()}
                    type="button"
                    color="secondary"
                    variant="ghost"
                    id="inputGroupFileAddon03"
                    size="sm"
                    onContextMenu={(e) => e.preventDefault()} // Previne o menu de contexto
                    style={{
                      height: '40px',
                      width: '40px',
                      backgroundColor: isPressed ? 'darkred' : 'red',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      transform: isPressed ? 'scale(0.95)' : 'scale(1)',
                      transition: 'transform 0.1s ease',
                    }}
                  >
                    <CIcon
                      icon={cilDelete}
                      style={{
                        height: '20px',
                        width: '20px',
                        '--ci-primary-color': 'white',
                      }}
                    />
                  </CButton>

                  <CFormFeedback valid></CFormFeedback>
                </CInputGroup>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom05">CPF/CNPJ</CFormLabel>
                <CInputGroup>
                  <CFormInput
                    type="text"
                    id="validationCustom05"
                    value={value}
                    onChange={handleMaskChange}
                    required
                  />
                  <CButton
                    color="primary"
                    size="sm"
                    onClick={handleValidateClick}
                  >
                    Formatar
                  </CButton>
                </CInputGroup>
                <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom05">E-mail</CFormLabel>
                <CFormInput
                  type="email"
                  id="validationCustom05"
                  placeholder="exemplo@dominio.com"
                  required
                />
                <CFormFeedback invalid>Por favor, insira um e-mail válido.</CFormFeedback>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom05">Rua</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom05">Número</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationCustom05"
                />
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="validationCustom05">Bairro</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom05">Pessoa</CFormLabel>
                <CFormInput type="text" id="validationCustom05" required />
                <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom05">Telefone</CFormLabel>
                <CFormInput
                  type="text"
                  id="validationCustom05"
                  placeholder="(44) 9 9999-9999"
                />
              </CCol>


              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom05">CEP</CFormLabel>
                <CInputGroup>
                  <CButton
                    type="button"
                    color="secondary"
                    variant="ghost"
                    id="inputGroupFileAddon03"
                    size="sm"
                    style={{
                      height: '40px',
                      width: '40px',
                      backgroundColor: '#3d99f5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CIcon
                      icon={cilSearch}
                      style={{
                        height: '20px',
                        width: '20px',
                        backgroundColor: '#3d99f5',
                        '--ci-primary-color': 'white',
                      }}
                    />
                  </CButton>
                  <CFormInput
                    type="text"
                    id="validationCustom05"
                    required
                  />
                </CInputGroup>
                <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
              </CCol>

              <CCol md={2}>
                <CFormLabel htmlFor="validationCustom05">Cidade</CFormLabel>
                <CInputGroup>
                  <CButton
                    type="button"
                    color="secondary"
                    variant="ghost"
                    id="inputGroupFileAddon03"
                    size="sm"
                    style={{
                      height: '40px',
                      width: '40px',
                      backgroundColor: '#3d99f5',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CIcon
                      icon={cilSearch}
                      style={{
                        height: '20px',
                        width: '20px',
                        backgroundColor: '#3d99f5',
                        '--ci-primary-color': 'white',
                      }}
                    />
                  </CButton>
                  <CFormInput
                    type="text"
                    id="validationCustom05"
                    required
                  />
                </CInputGroup>
                <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
              </CCol>

              <CCol md={8}>
                <CFormLabel htmlFor="validationCustom05">Complemento</CFormLabel>
                <CFormInput type="text" id="validationCustom05" />
              </CCol>

              <CCol md={4}>
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

              <ButtonCadastro handleCancel={handleCancel} />

            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );

}


