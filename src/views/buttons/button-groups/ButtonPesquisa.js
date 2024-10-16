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
                        maxWidth: '200px',

                    }}
                />
                <CButton
                    color="terciary"
                    type="submit"
                    onClick={openModal}
                    style={{
                        height: '36px',
                        backgroundColor: '#2E8B57',
                        borderColor: '#2E8B57',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '40px',
                    }}
                >
                    <PostAddIcon />
                </CButton>
                <CButton
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
                </CButton>
            </CInputGroup>
        </>
    );
}

export default ButtonPesquisa
