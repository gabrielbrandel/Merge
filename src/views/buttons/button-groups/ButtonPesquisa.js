import {
    CButton,
    CInputGroup,
} from '@coreui/react'
import SearchIcon from '@mui/icons-material/Search';
import { TelaPesquisa } from '../../forms/pesquisa/TelaPesquisa';

const ButtonPesquisa = ({ openModal }) => {
    return (
        <>
            <CInputGroup className="mb-2">
                <CButton
                    color="primary"
                    variant="outline"
                    size="sm"
                    style={{
                        height: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={openModal}
                >
                    <SearchIcon />
                     SGPS
                </CButton>
            </CInputGroup>
        </>
    );
}



export default ButtonPesquisa
