
const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = String(d.getFullYear());
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
};

export default formatDate;
