import { Container, Grid ,Paper} from '@mui/material';
import { grid } from '@mui/system';
import  Map  from './Map'
import PostsList from './PostsList'

function Homenew(){
    return (
        <Container maxWidth="md"  style={{backgroundColor:'grey', height:'100vh'}}>
           <Grid container spacing={0} style={{height:'50%'}}>
                <Grid item xs={6} sm={6} md={6} lg={7} xl={7} style={{height:'100%', backgroundColor: 'blue'}}>
                    <Map />
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={5} xl={5} style={{height:'100%', bgcolor: 'background.paper'}}>
                    <Paper>
                        <PostsList />
                    </Paper>
                </Grid>
           </Grid>
           <Grid container></Grid>
        </Container>
    )
}

export default Homenew;