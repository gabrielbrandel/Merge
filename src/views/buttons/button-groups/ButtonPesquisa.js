import {
    CButton,
    CInputGroup,
    CFormInput,
} from '@coreui/react'
import PostAddIcon from '@mui/icons-material/PostAdd';

const ButtonPesquisa = ({ openModal, value, onChange, exportToExcel }) => {
    return (
        <>
            <CInputGroup className="mb-2">
                <CFormInput
                    type="text"
                    id="validationCustom01"
                    placeholder=" Pesquisar"
                    value={value}
                    onChange={onChange}
                    style={{
                        height: '36px',
                        padding: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '40px',
                        marginLeft: '10px',
                        maxWidth: '350px',

                    }}
                />
                {/* <CButton
                    color="primary"
                    style={{
                        height: '36px',
                        backgroundColor: '#4682B4',
                        borderColor: '#4682B4',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '40px',
                    }}
                    onClick={exportToExcel}
                >
                    Exportar para Excel
                </CButton> */}
            </CInputGroup>
        </>
    );
}

export default ButtonPesquisa
