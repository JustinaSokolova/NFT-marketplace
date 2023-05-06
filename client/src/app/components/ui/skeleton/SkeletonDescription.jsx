import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SkeletonDescription = () => (
  <Card>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" height={20} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={150} />
        </Grid>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" height={20} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={50} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={40} />
        </Grid>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" height={20} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={20} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default SkeletonDescription;
