import React from "react";

import CollectionPage from "../components/pages/Collection/CollectionPage";
import shipsService from "../services/ships.service";

const Ships = () => {
  return <CollectionPage collectionService={shipsService} />;
};

export default Ships;
