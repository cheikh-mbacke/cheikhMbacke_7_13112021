import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

export default function Loader() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Skeleton variant="rectangular" width="100%" height={30} />
            </Grid>
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
