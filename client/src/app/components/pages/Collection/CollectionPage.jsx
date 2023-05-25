import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import CollectionItemCard from "./CollectionItemCard";
import PaginationComp from "../../common/PaginationComp";
import SkeletonCollectionPage from "../../ui/skeleton/SkeletonCollectionPage";
import FilterGroup from "./FilterGroup";
import BoxContainer from "../../common/BoxContainer";

const CollectionPage = ({
  collection,
  isLoading,
  onPageChange,
  currentPage,
  count,
  pages,
  pathName,
  filterNames,
  rarityList,
  onFilterChange,
  onHandleClear,
  stateSwitch,
  onMarketStateChange,
  priceOrder,
  onChangePrice,
}) => {
  return (
    <>
      <BoxContainer>
        <Box>
          <Box
            sx={{
              typography: "h5",
              whiteSpace: "pre-wrap",
            }}
          >
            {}
          </Box>
          <Box
            sx={{
              typography: "body1",
            }}
          >
            {}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "42px",
          }}
        >
          <Box>
            <FilterGroup
              filterNames={filterNames}
              rarityList={rarityList}
              onFilterChange={onFilterChange}
              onHandleClear={onHandleClear}
              stateSwitch={stateSwitch}
              onMarketStateChange={onMarketStateChange}
              onChangePrice={onChangePrice}
              priceOrder={priceOrder}
            />
          </Box>
          {count > 0 || !isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "42px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "24px",
                }}
              >
                {collection.map((item) => (
                  <CollectionItemCard key={item.tokenId} item={item} />
                ))}
              </Box>
              <PaginationComp
                itemsCount={count}
                pagesCount={pages}
                currentPage={currentPage}
                pathName={pathName}
                onPageChange={onPageChange}
              />
            </Box>
          ) : (
            <SkeletonCollectionPage />
          )}
        </Box>
      </BoxContainer>
    </>
  );
};

CollectionPage.propTypes = {
  collection: PropTypes.array,
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  count: PropTypes.number,
  pages: PropTypes.number,
  pathName: PropTypes.string,
  filterNames: PropTypes.array,
  rarityList: PropTypes.array,
  onFilterChange: PropTypes.func,
  onHandleClear: PropTypes.func,
  onMarketStateChange: PropTypes.func,
  stateSwitch: PropTypes.object,
  priceOrder: PropTypes.string,
  onChangePrice: PropTypes.func,
};

export default CollectionPage;
