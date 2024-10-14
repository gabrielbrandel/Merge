import {
    CButton,
    CInputGroup,
    CFormInput,
} from '@coreui/react'
import PostAddIcon from '@mui/icons-material/PostAdd';

const ButtonPesquisa = ({ openModal, value, onChange }) => {
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
            </CInputGroup>
        </>
    );
}

export default ButtonPesquisa
