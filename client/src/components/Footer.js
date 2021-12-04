
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function Footer(props) {
  return (
    <div 
      style={{
        marginTop: 16,
        marginBottom: 32,
      }}
    >
      <Typography style={{
        left: 0,
        right: 0,
        bottom: 0
      }} variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/zhuoweiz/PlayPal">
          PlayPal
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
    
  );
}
