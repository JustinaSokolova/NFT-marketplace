import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getCaptainsLoadingStatus, loadCaptainsList } from "../store/captains";
import { loadIslandsList } from "../store/islands";
import { loadShipsList } from "../store/ships";
import Loader from "../components/ui/Loader";

export const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector(getIsLoggedIn());
  const captainsStatusLoading = useSelector(getCaptainsLoadingStatus());

  useEffect(() => {
    dispatch(loadCaptainsList());
    dispatch(loadIslandsList());
    dispatch(loadShipsList());

    // if (isLoggedIn) {
    //   dispatch(loadUsersList());
    // }
  }, [dispatch]);

  if (captainsStatusLoading) return <Loader />;
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
