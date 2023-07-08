// material-ui
import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const SkeletonNftListRow = () => (
  <Card sx={{ m: "16px" }}>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item xs zeroMinWidth>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Skeleton variant="text" />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" height={40} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Skeleton variant="rectangular" height={180} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default SkeletonNftListRow;
