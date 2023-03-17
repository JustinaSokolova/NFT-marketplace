import React from "react";
import CollectionPage from "../components/pages/Home/Collection/CollectionPage";
import captainsService from "../services/captains.service";

const Captains = () => {
  return <CollectionPage collectionService={captainsService} />;
};

export default Captains;
