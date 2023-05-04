import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const CollectionItemPage = () => {
  const [collectionItem, setCollectionItem] = useState();
  const [isLoading, setIsLoading] = useState();
  // const param = useParams();  ?? или локайшин  вытащить колеекцию
  // useEffect(() => {
  //запрос в редакс в коллекцию по айди нфт
  //   setCollectionItem(ответ)
  // });

  return <div>CollectionItemPage</div>;
};

export default CollectionItemPage;
