import { useState, useEffect } from 'react';
import axiosInstance from '../../api/AxiosInstance';

export const useFetchMerges = (rota, startDate, endDate) => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMerges = async () => {
            setLoading(true);
            try {
                let query = rota;
                if (startDate && endDate) {
                    query += `?startDate=${startDate}&endDate=${endDate}`;
                }

                const response = await axiosInstance.get(query);
                setRows(response.data); // Corrigi a atribuição aqui para `response.data`
            } catch (error) {
                console.error('Error fetching merges:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMerges();
    }, [rota, startDate, endDate]); // Dependências adicionadas

    // Retorna como array para poder ser desestruturado na função de chamada
    return [rows, loading, error];
};

export default useFetchMerges;
