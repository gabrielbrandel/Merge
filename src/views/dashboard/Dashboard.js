import React, { useState, useEffect } from 'react';
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import useFetchMerges from './GetApi.js'
import formatDate from '../base/data/FormatData.jsx';

const today = new Date().toISOString().split('T')[0];
const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

const Dashboard = () => {
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate') || firstDay);
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate') || today);

  const [mergePorEquipe] = useFetchMerges('Merges/por-equipe', startDate, endDate);
  const [mergePorUsuario] = useFetchMerges('Merges/por-usuario', startDate, endDate);
  const [mergePorCategoria] = useFetchMerges('Merges/por-categoria', startDate, endDate);
  const [mergePorMes, loading] = useFetchMerges('Merges/por-trafego-mes', startDate, endDate);
  const [mergePorTipo] = useFetchMerges('Merges/por-tipo', startDate, endDate);
  const [mergeTrafegoPorVersao] = useFetchMerges('Merges/por-trafego-versao', startDate, endDate);

  const progressMergePorEquipe = mergePorEquipe
  const progressMergePorCategoria = mergePorCategoria
  const progressMergePorUsuario = mergePorUsuario
  const progressMergePorMes = mergePorMes
  const progressMergePorTipo = mergePorTipo
  const progressMergeTrafegoVersao = mergeTrafegoPorVersao.map((item) => ({
    ...item,
    mes: formatDate(item.mes),
  }));

  const naoprevisto = progressMergePorTipo.find(item => item.type === 'N.P.');
  const tarefa = progressMergePorTipo.find(item => item.type === 'Tarefa');
  const erro = progressMergePorTipo.filter(item =>
    ['Erro (parada)', 'Erro'].includes(item.type)
  );
  const outros = progressMergePorTipo.filter(item =>
    !['N.P.', 'Tarefa', 'Erro (parada)', 'Erro'].includes(item.type)
  );

  const totalErros = erro.reduce((total, item) => total + item.merges, 0);
  const totalOutros = outros.reduce((total, item) => total + item.merges, 0);

  const jsonErros = [
    { type: 'Erro', merges: totalErros },
  ];

  const jsonOutros = [
    { type: 'Erro', merges: totalOutros},
  ]

  console.log( 'teste:', jsonErros );
  console.log('teste:', naoprevisto );

  const bugDeImpacto = progressMergePorCategoria.find(item => item.descricao === 'BUG DE IMPACTO');
  const bugSemImpacto = progressMergePorCategoria.find(item => item.descricao === 'BUG SEM IMPACTO');
  const bugErrosInterno = progressMergePorCategoria.find(item => item.descricao === 'ERRO INTERNO');
  const Alteracao = progressMergePorCategoria.find(item => item.descricao === 'ALTERACAO DO SISTEMA');
  const bugsOutros = progressMergePorCategoria.filter(item =>
    !['BUG DE IMPACTO', 'BUG SEM IMPACTO', 'ERRO INTERNO', 'ALTERACAO DO SISTEMA'].includes(item.descricao)
  );

  const totalMergesBugDeImpacto = bugDeImpacto ? bugDeImpacto.merges : 0;
  const totalMergesBugSemImpacto = bugSemImpacto ? bugSemImpacto.merges : 0;
  const totalMergesBugErroInterno = bugErrosInterno ? bugErrosInterno.merges : 0;
  const totalMergesAlteracoes = Alteracao ? Alteracao.merges : 0;
  const totalMergesBugOutros = bugsOutros.reduce((total, item) => total + item.merges, 0);
  const total = totalMergesBugDeImpacto + totalMergesBugSemImpacto + totalMergesBugErroInterno + totalMergesAlteracoes + totalMergesBugOutros;
  const [activeButton, setActiveButton] = useState('Por Data');

  const obterPercentual = (valor) => {
    let percentual = (valor / total) * 100

    return percentual.toFixed(2);
  };

  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  const progressExample = [
    { title: 'Bug de Impacto', value: `${totalMergesBugDeImpacto?.toString()}`, percent: obterPercentual(totalMergesBugDeImpacto), color: 'danger' },
    { title: 'Bug Sem Impacto', value: `${totalMergesBugSemImpacto?.toString()}`, percent: obterPercentual(totalMergesBugSemImpacto), color: 'warning' },
    { title: 'Erro Interno', value: `${totalMergesBugErroInterno?.toString()}`, percent: obterPercentual(totalMergesBugErroInterno), color: 'warning' },
    { title: 'Alteração do Sistema', value: `${totalMergesAlteracoes?.toString()}`, percent: obterPercentual(totalMergesAlteracoes), color: 'success' },
    { title: 'Outros', value: `${totalMergesBugOutros?.toString()}`, percent: obterPercentual(totalMergesBugOutros), color: 'info' },
  ]

  return (
    <>
      <WidgetsDropdown naoprevisto={naoprevisto} tarefa={tarefa} erro={jsonErros[0]} outros={jsonOutros[0]} className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Tráfego de Merges
              </h4>
            </CCol>
          </CRow>
          <CCol sm={12} className="d-none d-md-block">
            <CButtonGroup className="float-end me-3">
              {['Por Versão', 'Por Data'].map((value) => (
                <CButton
                  color="outline-secondary"
                  key={value}
                  className="mx-0"
                  active={value === activeButton}
                  onClick={() => handleButtonClick(value)}
                >
                  {value}
                </CButton>
              ))}
            </CButtonGroup>
          </CCol>
          {!loading && (
            activeButton === 'Por Data'
              ? <MainChart data={progressMergePorMes} />
              : <MainChart data={progressMergeTrafegoVersao} />
          )}

        </CCardBody>

        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      {/* <WidgetsBrand className="mb-4" withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Merges por Equipe {' & '} Categoria</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Bugs de Impacto</div>
                        <div className="fs-5 fw-semibold">{totalMergesBugDeImpacto}</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Bugs Sem Impacto
                        </div>
                        <div className="fs-5 fw-semibold">{totalMergesBugSemImpacto}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressMergePorCategoria.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <span>{item.descricao}</span>
                        <span className="ms-auto fw-semibold">
                          <span className="text-body-secondary small">({item.merges})</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="danger" value={item.merges} />
                      </div>
                    </div>
                  ))}
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={4}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Erros Internos</div>
                        <div className="fs-5 fw-semibold">{totalMergesBugErroInterno}</div>
                      </div>
                    </CCol>
                    <CCol xs={4}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Alterações</div>
                        <div className="fs-5 fw-semibold">{totalMergesAlteracoes}</div>
                      </div>
                    </CCol>
                    <CCol xs={4}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Outros</div>
                        <div className="fs-5 fw-semibold">{totalMergesBugOutros}</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {/* {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))} */}

                  {/* <div className="mb-5"></div> */}

                  {progressMergePorEquipe.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        {/* <CIcon className="me-2" icon={item.icon} size="lg" /> */}
                        <span>{item.descricao}</span>
                        <span className="ms-auto fw-semibold">
                          {/* {item.value}{' '} */}
                          <span className="text-body-secondary small">({item.merges})</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.merges} />
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Usuários</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Merges Solicitados</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {progressMergePorUsuario.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{item.nome}</CTableDataCell>
                      <CTableDataCell>{item.merges}</CTableDataCell>
                      {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                      {/* <CTableDataCell>
                        <div>{item.name}</div>
                        <div className="small text-body-secondary text-nowrap">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{item.usage.value}%</div>
                          <div className="ms-3">
                            <small className="text-body-secondary">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.payment.icon} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-body-secondary text-nowrap">Last login</div>
                        <div className="fw-semibold text-nowrap">{item.activity}</div>
                      </CTableDataCell> */}
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
