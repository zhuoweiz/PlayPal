
import { Typography, Button, Stack, Paper, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({

  title: {
    marginBottom: theme.spacing(1),
  },
  buttonStack: {
    marginBottom: theme.spacing(2),
  },
  notificationStack: {
    marginBottom: theme.spacing(2),
  },
  paper: {
  },
}));

function NotificationBox(props) {
  const {title, content, ...otherProps} = props;

  return (
    <Paper variant="outlined">
      <Box sx={{p: 2}}>
        <Typography>{title}</Typography>
        <p>{content}</p>
      </Box>
    </Paper>
  )
}

export default function NotificationComponent() {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Notification Center
      </Typography>

      <Stack className={classes.buttonStack} direction={'row'} spacing={1}>
        <Button variant="contained" style={{boxShadow: "none"}}>Read All</Button>
        <Button variant="outlined" color="warning">Delete All</Button>
      </Stack>

      <Stack className={classes.notificationStack} spacing={1}>
        <NotificationBox
          title="Acitivity Confirmation"
          content="You are now confimed to join the event this Saturday afternoon."
        />
      </Stack>
    </div>
  )
}