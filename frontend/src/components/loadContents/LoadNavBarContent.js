import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function LoadNavBarContent() {
    return (
        <Grid container spacing={2} sx={{pt: 2}}>
            <Grid item xs={12}>
                <Skeleton variant="rectangular" width="100%" height={30} />
            </Grid>
        </Grid>
    )
}
