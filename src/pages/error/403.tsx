import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import History from '@mui/icons-material/History';
import { Icon } from '@mui/material';
import FenceIcon from '@mui/icons-material/Fence';
const Error403= () =>{
    return (<Root>
            <div className={ForbiddenClasses.message}>
                <FenceIcon className={ForbiddenClasses.icon} />
                {/* <Icon className={ForbiddenClasses.icon}>fence</Icon> */}
                <h1>Forbidden</h1>
                <div>Do not have authority, Please change your account</div>
            </div>
            <div className={ForbiddenClasses.toolbar}>

                <Button
                    variant="contained"
                    startIcon={<History />}
                    onClick={goBack}
                >
                    GO BACK
                </Button>
            </div>
    </Root>)
}
export default Error403
const PREFIX = 'Error403';

export const ForbiddenClasses = {
    icon: `${PREFIX}-icon`,
    message: `${PREFIX}-message`,
    toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        height: '100%',
    },
    [theme.breakpoints.down('md')]: {
        height: '100vh',
        marginTop: '-3em',
    },

    [`& .${ForbiddenClasses.icon}`]: {
        width: '9em',
        height: '9em',
    },

    [`& .${ForbiddenClasses.message}`]: {
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
        opacity: 0.5,
        margin: '0 1em',
    },

    [`& .${ForbiddenClasses.toolbar}`]: {
        textAlign: 'center',
        marginTop: '2em',
    },
}));

function goBack() {
    window.history.go(-1);
}