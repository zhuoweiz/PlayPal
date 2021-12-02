
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function Footer(props) {
  return (
    <div sx={{ mt: 8, mb: 4 }}>
      <Typography style={{
        // marginTop: 40,
        // marginBottom: 40
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }} variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          PlayPal
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
    
  );
}
