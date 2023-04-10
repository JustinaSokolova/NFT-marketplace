import Skeleton from "@mui/material/Skeleton";
import { Card, CardContent, Grid } from "@mui/material";

const SkeletonCardNft = () => (
  <Card sx={{ width: 200, maxHeight: 300 }}>
    <CardContent>
      <Skeleton
        sx={{ height: 180, marginBottom: 2 }}
        animation="wave"
        variant="rectangular"
      />
      <Skeleton animation="wave" height={20} style={{ marginBottom: 2 }} />
      <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
      <Skeleton
        animation="wave"
        height={10}
        width="60%"
        style={{ marginBottom: 2 }}
      />
    </CardContent>
  </Card>
);

export default SkeletonCardNft;
