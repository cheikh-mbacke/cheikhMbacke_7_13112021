import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function LoadMainContent() {
    return (
        <Grid container spacing={2} sx={{pt: 4}}>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width="100%" height={160} />
                <Skeleton width="100%" />
                <Skeleton width="55%" />
            </Grid>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width="100%"height={160} />
                <Skeleton width="100%" />
                <Skeleton width="55%" />
            </Grid>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width="100%"height={160} />
                <Skeleton width="100%" />
                <Skeleton width="55%" />
            </Grid>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width="100%"height={160} />
                <Skeleton width="100%" />
                <Skeleton width="55%" />
            </Grid>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width="100%"height={160} />
                <Skeleton width="100%" />
                <Skeleton width="55%" />
            </Grid>
            <Grid item xs={4}>
                <Skeleton variant="rectangular" width="100%"height={160} />
                <Skeleton width="100%" />
                <Skeleton width="55%" />
            </Grid>
        </Grid>
    )
}
