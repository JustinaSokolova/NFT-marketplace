import React from "react";

import CollectionPage from "../components/pages/Collection/CollectionPage";
import islandsService from "../services/islands.service";

const Islands = () => {
  return <CollectionPage collectionService={islandsService} />;
};

export default Islands;
