const [filters, setFilters] = useState({
    fkIdOrdemServico: '',
    categoria: '',
    descricaoEquipe: '',
    nomeUsuario: '',
    motivo: '',
    status: '',
    versao: '',
    dataHora: ''
});

const handleFilterChange = (column, value) => {
    setFilters({ ...filters, [column]: value });
};

const filteredRows = sortedRows.filter((row) => {
    return (
        row.fkIdOrdemServico?.toString().includes(filters.fkIdOrdemServico) &&
        row.categoria?.toLowerCase().includes(filters.categoria.toLowerCase()) &&
        row.descricaoEquipe?.toLowerCase().includes(filters.descricaoEquipe.toLowerCase()) &&
        row.nomeUsuario?.toLowerCase().includes(filters.nomeUsuario.toLowerCase()) &&
        row.motivo?.toLowerCase().includes(filters.motivo.toLowerCase()) &&
        row.status?.toLowerCase().includes(filters.status.toLowerCase()) &&
        row.versao?.toLowerCase().includes(filters.versao.toLowerCase()) &&
        formatDate(row.dataHora)?.includes(filters.dataHora)
    );
});
