import React, { useState } from 'react'
import Box from '@mui/material/Box';
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
} from '@coreui/react'
import { DocsExample } from 'src/components'

import CIcon from '@coreui/icons-react'
import { cibAddthis, cilDelete, cilSearch } from '@coreui/icons'
import ButtonCadastro from '../../buttons/button-groups/ButtonCadastro';

export const TelaPagar = ({ closeModal }) => {
    const [validated, setValidated] = useState(false)
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
                        <strong>Contas a Pagar</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CForm
                            className="row g-3 needs-validation"
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                                <CCol md={12}>
                                    <CFormLabel htmlFor="validationCustom01">Fornecedor</CFormLabel>
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
                                            id="validationCustom01"
                                            defaultValue="Mark"                                            
                                            required
                                        />
                                        <CButton
                                            type="button"
                                            color="secondary"
                                            variant="ghost"
                                            id="inputGroupFileAddon03"
                                            size="sm"
                                            style={{
                                                height: '40px',
                                                width: '40px',
                                                backgroundColor: 'red',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
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


                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom01">Tipo de Conta</CFormLabel>
                                <CInputGroup>
                                    <CButton
                                        type="button"
                                        color="secondary"
                                        variant="ghost"
                                        id="inputGroupFileAddon03"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#249542',
                                        }}
                                    >
                                        <CIcon
                                            icon={cilSearch}
                                            size="lg"
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                '--ci-primary-color': 'white',
                                            }}
                                        />
                                    </CButton>
                                    <CFormSelect id="validationCustom04">
                                        <option disabled>Choose...</option>
                                        <option>...</option>
                                    </CFormSelect>
                                </CInputGroup>
                                <CFormFeedback invalid>Please provide a valid option.</CFormFeedback>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustom02">Grupo de Conta</CFormLabel>
                                <CInputGroup>
                                    <CButton
                                        type="button"
                                        color="secondary"
                                        variant="ghost"
                                        id="inputGroupFileAddon03"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#249542',
                                        }}
                                    >
                                        <CIcon
                                            icon={cilSearch}
                                            size="lg"
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                '--ci-primary-color': 'white',
                                            }}
                                        />
                                    </CButton>
                                    <CFormSelect id="validationCustom04">
                                        <option disabled>Choose...</option>
                                        <option>...</option>
                                    </CFormSelect>
                                </CInputGroup>
                                <CFormFeedback invalid>Please provide a valid option.</CFormFeedback>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustomUsername">SubGrupo de Conta</CFormLabel>
                                <CInputGroup>
                                    <CButton
                                        type="button"
                                        color="secondary"
                                        variant="ghost"
                                        id="inputGroupFileAddon03"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#249542',
                                        }}
                                    >
                                        <CIcon
                                            icon={cilSearch}
                                            size="lg"
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                '--ci-primary-color': 'white',
                                            }}
                                        />
                                    </CButton>
                                    <CFormSelect id="validationCustom04">
                                        <option disabled>Choose...</option>
                                        <option>...</option>
                                    </CFormSelect>
                                </CInputGroup>
                                <CFormFeedback invalid>Please provide a valid option.</CFormFeedback>
                            </CCol>

                            <CCol md={6}>
                                <CFormLabel htmlFor="validationCustomUsername">Centro de Custo</CFormLabel>
                                <CInputGroup>
                                    <CButton
                                        type="button"
                                        color="secondary"
                                        variant="ghost"
                                        id="inputGroupFileAddon03"
                                        style={{
                                            height: '40px',
                                            width: '40px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#249542',
                                        }}
                                    >
                                        <CIcon
                                            icon={cilSearch}
                                            size="lg"
                                            style={{
                                                height: '20px',
                                                width: '20px',
                                                '--ci-primary-color': 'white',
                                            }}
                                        />
                                    </CButton>
                                    <CFormSelect id="validationCustom04">
                                        <option disabled>Choose...</option>
                                        <option>...</option>
                                    </CFormSelect>
                                </CInputGroup>
                                <CFormFeedback invalid>Please provide a valid option.</CFormFeedback>
                            </CCol>

                            <CCol md={3}>
                                <CFormLabel htmlFor="validationCustom05">Número Identificador</CFormLabel>
                                <CFormInput type="text" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel htmlFor="validationCustom05">Número Documento</CFormLabel>
                                <CFormInput type="text" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>


                            <CCol md={3}>
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

                            <CCol md={3}>
                                <CFormLabel htmlFor="validationCustom05">Parcelas</CFormLabel>
                                <CFormInput type="text" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>

                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom05">Descrição do Documento</CFormLabel>
                                <CFormInput type="text" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>

                            <CCol md={12}>
                                <CFormLabel htmlFor="validationCustom05">Codigo de Barras do Documento</CFormLabel>
                                <CFormInput type="text" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>

                            <CCol md={4}>
                                <CFormLabel htmlFor="validationCustom05">Competência</CFormLabel>
                                <CFormInput type="date" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="validationCustom05">Emissão</CFormLabel>
                                <CFormInput type="date" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel htmlFor="validationCustom05">Vencimento</CFormLabel>
                                <CFormInput type="date" id="validationCustom05" required />
                                <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                            </CCol>

                            <ButtonCadastro handleCancel={handleCancel} />

                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
