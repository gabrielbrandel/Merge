import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';

const ButtonToggle = ({ setFilter }) => {
    const [status, setStatus] = useState(() => {
        const storedStatus = localStorage.getItem('status') || 'Ambas';
        return storedStatus;
    });

    useEffect(() => {
        if (status) {
            localStorage.setItem('status', status);
        }
        if (setFilter) {
            setFilter(status);
        }
    }, [status, setFilter]);

    const toggleButton = () => {
        let nextStatus;

        if (status === 'Abertas') {
            nextStatus = 'Fechadas';
        } else if (status === 'Fechadas') {
            nextStatus = 'Ambas';
        } else {
            nextStatus = 'Abertas';
        }

        setStatus(nextStatus);

        if (setFilter) {
            setFilter(nextStatus);
        }
    };

    const getButtonText = () => {
        if (status === 'Abertas') {
            return 'Abertas';
        } else if (status === 'Fechadas') {
            return 'Fechadas';
        } else {
            return 'Ambas';
        }
    };

    const getButtonColor = () => {
        if (status === 'Abertas') {
            return '#2E8B57';
        } else if (status === 'Fechadas') {
            return '#8B0000';
        } else {
            return '#4682B4';
        }
    };

    return (
        <div>
            <CButton
                style={{
                    color: 'white',
                    backgroundColor: getButtonColor(),
                    height: '36px',
                    borderRadius: '8px',
                    marginLeft: '20px',
                    marginTop: '32px',
                    padding: '0 12px',
                }}
                onClick={toggleButton}
            >
                {getButtonText()}
            </CButton>
        </div>
    );
};

export default ButtonToggle;
