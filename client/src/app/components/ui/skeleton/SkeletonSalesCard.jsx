import { Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export const SkeletonSalesCard = () => (
  <Card>
    <CardContent>
      <Grid container direction="column">
        <Grid item>
          <Skeleton variant="rectangular" sx={{ my: 2 }} height={40} />
        </Grid>
        <Grid item>
          <Skeleton variant="rectangular" height={30} />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
