import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
    CCol,
    CRow,
    CFormInput,
    CInputGroup,
    CButton,
    CFormLabel,
    useColorModes,
} from '@coreui/react';

const ButtonSelect = ({onSelectedOptionsChange}) => {

    const [selectedOptions1, setSelectedOptions1] = useState(() => {
        const storedValue = localStorage.getItem('selectedOptions1');
        return storedValue ? JSON.parse(storedValue) : [];
    });

    const [selectedOptions2, setSelectedOptions2] = useState(() => {
        const storedValue = localStorage.getItem('selectedOptions2');
        return storedValue ? JSON.parse(storedValue) : [];
    });

    const [filtro1, setFiltro1] = useState(() => {
        const storedValue = localStorage.getItem('filtro1');
        return storedValue ? JSON.parse(storedValue) : [];
    });

    const [filtro2, setFiltro2] = useState(() => {
        const storedValue = localStorage.getItem('filtro2');
        return storedValue ? JSON.parse(storedValue) : [];
    });

    const { colorMode } = useColorModes('coreui-free-react-admin-template-theme');

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: 'var(--cui-primary)', // Borda com a cor primária
            backgroundColor: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
            '&:hover': { borderColor: 'var(--cui-primary)' },
            boxShadow: `0 0 0 1px var(--cui-primary)`,
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isDisabled
                ? colorMode === 'dark' ? '#333' : '#f5f5f5' // Cor do background desabilitado
                : state.isFocused
                    ? 'var(--cui-primary)'
                    : colorMode === 'dark'
                        ? 'var(--cui-dark)'
                        : 'var(--cui-light)',
            color: state.isDisabled
                ? colorMode === 'dark' ? '#888' : '#aaa' // Cor do texto desabilitado
                : state.isFocused
                    ? 'var(--cui-light)'
                    : colorMode === 'dark'
                        ? 'var(--cui-light)'
                        : 'var(--cui-dark)',
            cursor: state.isDisabled ? 'not-allowed' : 'default', // Cursor de itens desabilitados
            '&:hover': {
                backgroundColor: state.isDisabled
                    ? colorMode === 'dark' ? '#333' : '#f5f5f5' // Sem alteração ao passar o mouse no item desabilitado
                    : 'var(--cui-primary)',
                color: state.isDisabled
                    ? colorMode === 'dark' ? '#888' : '#aaa' // Cor ao passar o mouse sobre itens desabilitados
                    : 'var(--cui-light)',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'var(--cui-primary)',
            color: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'var(--cui-light)',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
            '&:hover': {
                backgroundColor: 'var(--cui-danger)',
                color: colorMode === 'dark' ? 'var(--cui-dark)' : 'var(--cui-light)',
            },
        }),
    };

    const filtroOpcoes = [
        { value: 'descricaoServicos', label: 'Descrição dos Serviços', color: '#00B8D9', isFixed: false },
        { value: 'detalhesAtendimento', label: 'Detalhes do Atendimento', color: '#0052CC', isDisabled: false },
        { value: 'solucao', label: 'Solução', color: '#5243AA' },
        { value: 'detalheCliente', label: 'Detalhes do Cliente', color: '#FF5630', isFixed: false },
        { value: 'observacao', label: 'Observação', color: '#FF8B00' },
        { value: 'contato', label: 'Contato', color: '#FFC400' },
        { value: 'commit', label: 'Commit', color: '#36B37E' },
        { value: 'ticket', label: 'Ticket', color: '#36B37E' },
        { value: 'empresa', label: 'Codigo SGSCli', color: '#36B37E' },
        { value: 'codigoCliente', label: 'Codigo Cadcli', color: '#36B37E' },
        { value: 'cgc', label: 'CNPJ', color: '#36B37E' },
        { value: 'tecnico', label: 'Técnico', color: '#36B37E' },
        { value: 'tecnico', label: 'Técnico Responsável', color: '#36B37E' },
    ];

    const filtroOpcoes2 = [
        { value: 'descricaoServicos', label: 'Descrição dos Serviços', color: '#00B8D9', isFixed: false },
        { value: 'detalhesAtendimento', label: 'Detalhes do Atendimento', color: '#0052CC', isDisabled: false },
        { value: 'solucao', label: 'Solução', color: '#5243AA' },
        { value: 'detalheCliente', label: 'Detalhes do Cliente', color: '#FF5630', isFixed: false },
        { value: 'observacao', label: 'Observação', color: '#FF8B00' },
        { value: 'contato', label: 'Contato', color: '#FFC400' },
        { value: 'commit', label: 'Commit', color: '#36B37E' },
        { value: 'ticket', label: 'Ticket', color: '#36B37E' },
        { value: 'empresa', label: 'Codigo SGSCli', color: '#36B37E' },
        { value: 'codigoCliente', label: 'Codigo Cadcli', color: '#36B37E' },
        { value: 'cgc', label: 'CNPJ', color: '#36B37E' },
        { value: 'tecnico', label: 'Técnico', color: '#36B37E' },
        { value: 'tecnico', label: 'Técnico Responsável', color: '#36B37E' },
    ];

    const disableSelectedOptions = (options, selected) => {
        return options.map(option => ({
            ...option,
            isDisabled: selected.some(selectedOption => selectedOption.value === option.value)
        }));
    };

    useEffect(() => {
        localStorage.setItem('selectedOptions1', JSON.stringify(selectedOptions1));
        onSelectedOptionsChange({ selectedOptions1, selectedOptions2, filtro1, filtro2 });
    }, [selectedOptions1]);

    useEffect(() => {
        localStorage.setItem('selectedOptions2', JSON.stringify(selectedOptions2));
        onSelectedOptionsChange({ selectedOptions1, selectedOptions2, filtro1, filtro2 });
    }, [selectedOptions2]);

    useEffect(() => {
        localStorage.setItem('filtro1', JSON.stringify(filtro1));
        onSelectedOptionsChange({ selectedOptions1, selectedOptions2, filtro1, filtro2 });
    }, [filtro1]);

    useEffect(() => {
        localStorage.setItem('filtro2', JSON.stringify(filtro2));
        onSelectedOptionsChange({ selectedOptions1, selectedOptions2, filtro1, filtro2 });
    }, [filtro2]);

    const handleChangeFiltro1 = (value) => {
        setFiltro1(value);
    }

    const handleChangeFiltro2 = (value) => {
        setFiltro2(value);
    }

    return (
        <div>
            <CInputGroup className="mb-3" style={{  marginTop: '20px' ,marginLeft: '20px' }} >
                <CRow className="g-3" style={{ width: '100%' }}>
                    <CCol xs={6} md={6} lg={6} style={{ marginLeft: '5px' }}>
                        <CFormLabel htmlFor="validationCustom05">
                            Filtros 1
                        </CFormLabel>
                        <Select
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            name="filtroOpcoes"
                            options={disableSelectedOptions(filtroOpcoes, selectedOptions2)}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={customStyles}
                            onChange={setSelectedOptions1}
                            value={selectedOptions1}
                        />
                    </CCol>
                    <CCol xs={5} md={5} lg={5} >
                        <CInputGroup className="mb-2">
                            <CFormInput
                                type="text"
                                id="validationCustom01"
                                placeholder=" Pesquisar"
                                style={{
                                    height: '40px',
                                    padding: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '31px',
                                    marginLeft: '12px',
                                    maxWidth: '615px',

                                }}
                                onChange={(e) => handleChangeFiltro1(e.target.value)}
                                value={filtro1}
                            />
                            <CButton
                                color="primary"
                                style={{
                                    height: '40px',
                                    backgroundColor: '#4682B4',
                                    borderColor: '#4682B4',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '30px',
                                }}
                            // onClick={exportToExcel}
                            >
                                Cliente
                            </CButton>
                        </CInputGroup>
                    </CCol>
                </CRow>
                <CRow className="g-3" style={{ width: '100%' }}>
                    <CCol xs={6} md={6} lg={6}>
                        <CFormLabel htmlFor="validationCustom05">
                            Filtros 2
                        </CFormLabel>

                        <Select
                            closeMenuOnSelect={false}
                            defaultValue={[]}
                            isMulti
                            name="filtroOpcoes"
                            options={disableSelectedOptions(filtroOpcoes2, selectedOptions1)}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            styles={customStyles}
                            onChange={setSelectedOptions2}
                            value={selectedOptions2}
                        />
                    </CCol>
                    <CCol xs={5} md={5} lg={5} >
                        <CInputGroup className="mb-2">
                            <CFormInput
                                type="text"
                                id="validationCustom01"
                                placeholder=" Pesquisar"
                                style={{
                                    height: '40px',
                                    padding: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '31px',
                                    marginLeft: '12px',
                                    maxWidth: '615px',
                                }}
                                onChange={(e) => handleChangeFiltro2(e.target.value)}
                                value={filtro2}
                            />
                            <CButton
                                color="primary"
                                style={{
                                    height: '40px',
                                    backgroundColor: '#4682B4',
                                    borderColor: '#4682B4',
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '30px',
                                }}
                            // onClick={exportToExcel}
                            >
                                Cliente
                            </CButton>
                        </CInputGroup>
                    </CCol>
                </CRow>
            </CInputGroup>
        </div>
    );
};

export default ButtonSelect;
