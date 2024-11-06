import React, { useState } from 'react';

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CInputGroup,
} from '@coreui/react';

import ButtonCadastro from '../../buttons/button-groups/ButtonCadastro';

export const TelaPesquisa = ({ closeModal, row }) => {

  const [validated, setValidated] = useState(false);
  const [activeKey, setActiveKey] = useState(1); // Estado para controlar as abas
  const obrigatorio = 'Esse campo é obrigatório.';

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleCancel = () => {
    closeModal();
  };

  console.log('row:', row);

  const formatHtmlToText = (html) => {
    if (!html) return '';

    return html
      .replace(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2})/g, '<strong>$1<strong>')
      .replace(/<p[^>]*>/g, '')
      .replace(/<\/p>/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/#!html/g, '')
      .replace(/{{{/g, '')
      .replace(/}}}/g, '');
  };

 const formattedText = formatHtmlToText(row?.detalhesAtendimento);
 const formattedRequisito = formatHtmlToText(row?.requisito);


  return (
    <CRow>
      <CCol xs={12}>
        <CForm
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Cliente:</CFormLabel>
            <CFormInput value={row?.nomeEmpresa} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">CNPJ:</CFormLabel>
            <CFormInput value={row?.cgc}  type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={2}>
            <CFormLabel htmlFor="validationCustom05">Municipio:</CFormLabel>
            <CFormInput type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={2}>
            <CFormLabel htmlFor="validationCustom05">Responsável:</CFormLabel>
            <CFormInput type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={2}>
            <CFormLabel htmlFor="validationCustom05">Contato:</CFormLabel>
            <CFormInput value={row?.contato} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>

          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Produto:</CFormLabel>
            <CFormInput value={row?.produto} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Módulos:</CFormLabel>
            <CFormInput value={row?.descricaoModulo} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Categoria:</CFormLabel>
            <CFormInput value={row?.categoria} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Técnico:</CFormLabel>
            <CFormInput value={row?.tecnico} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>

          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Situação:</CFormLabel>
            <CFormInput value={row?.status} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Atendimento:</CFormLabel>
            <CFormInput type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>
          <CCol md={3}>
            <CFormLabel htmlFor="validationCustom05">Data:</CFormLabel>
            <CFormInput value={row?.data} type="text" id="validationCustom05" required disabled />
            <CFormFeedback invalid>{obrigatorio}</CFormFeedback>
          </CCol>

          <CCol xs={12}>
            <CCard>
              <CCardHeader>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 1}
                      onClick={() => setActiveKey(1)}
                    >
                      Descrição
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 2}
                      onClick={() => setActiveKey(2)}
                    >
                      Commit
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink
                      active={activeKey === 3}
                      onClick={() => setActiveKey(3)}
                    >
                      Requisitos
                    </CNavLink>
                  </CNavItem>
                </CNav>
              </CCardHeader>
              <CCardBody>
                <CTabContent>
                  <CTabPane role="tabpanel" visible={activeKey === 1}>

                    <CInputGroup className="mb-3">
                      <CCol md={6} className="me-3">
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Descrição dos Serviços:</CFormLabel>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="7" value={row?.descricaoServicos}></textarea>
                      </CCol>
                      <CCol md={5} style={{width:'520px'}}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Detalhes do Atendimento</CFormLabel>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="7" value={formattedText}></textarea>
                      </CCol>
                      <CCol md={6}>
                        <CFormLabel htmlFor="validationCustom05">Observação:</CFormLabel>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="1" value={row?.observacao}></textarea>
                      </CCol>
                      <CCol md={6} className="me-3">
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Solução:</CFormLabel>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={row?.solucao}></textarea>
                      </CCol>
                      <CCol md={5} style={{ width: '520px' }}>
                        <CFormLabel htmlFor="exampleFormControlTextarea1">Detalhes do Cliente:</CFormLabel>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={row?.detalheCliente}></textarea>
                      </CCol>
                    </CInputGroup>


                  </CTabPane>
                  <CTabPane role="tabpanel" visible={activeKey === 2}>
                    <CCol md={12}>
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Trac: {row?.owner}</CFormLabel>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" value={row?.commit}></textarea>
                    </CCol>
                  </CTabPane>
                  <CTabPane role="tabpanel" visible={activeKey === 3}>
                    <CCol md={12}>
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Requisitos:</CFormLabel>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="15" value={formattedRequisito}></textarea>
                    </CCol>
                  </CTabPane>
                </CTabContent>
              </CCardBody>
            </CCard>
          </CCol>

        </CForm>
      </CCol>
    </CRow>
  );
};
