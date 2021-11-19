
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function Footer(props) {
  return (
    <div>
      <Typography style={{
        marginTop: 40,
        marginBottom: 40
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
