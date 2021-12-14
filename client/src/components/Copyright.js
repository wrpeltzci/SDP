import { Typography, Link } from '@mui/material';

export const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://clinicalsquared.com/">
                PDFBuilder
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};