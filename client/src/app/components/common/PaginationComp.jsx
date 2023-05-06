import React from "react";
import { Link as NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import { Pagination, PaginationItem } from "@mui/material";
import config from "../../config.json";

const PaginationComp = (props) => {
  const { itemsCount, pagesCount, onPageChange, currentPage, pathName } = props;
  const pageCount = Math.ceil(itemsCount / config.pageSize);
  // const path = pathName.slice(1);

  if (pageCount === 1) return null;

  return (
    <>
      <Pagination
        count={pagesCount}
        page={currentPage}
        onChange={(_, num) => onPageChange(num)}
        color="secondary"
        showFirstButton
        showLastButton
        sx={{ alignSelf: "center" }}
        renderItem={(item) => (
          <PaginationItem
            component={NavLink}
            to={`${pathName}?page=${item.page}`}
            {...item}
          />
        )}
      />
    </>
  );
};

PaginationComp.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pathName: PropTypes.string.isRequired,
};

export default PaginationComp;
