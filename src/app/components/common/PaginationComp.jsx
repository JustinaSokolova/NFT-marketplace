import React from "react";
import { Link as NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import { Pagination, PaginationItem } from "@mui/material";

const PaginationComp = (props) => {
  const { itemsCount, pagesCount, pageSize, onPageChange, currentPage } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
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
            to={`/captains?page=${item.page}`}
            {...item}
          />
        )}
      />
    </>
  );
};

PaginationComp.propTypes = {
  itemsCount: PropTypes.number.isRequired, // всего эл-в
  pagesCount: PropTypes.number.isRequired, // кол-во страниц
  pageSize: PropTypes.number.isRequired, //  кол-во эл-в на странице
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PaginationComp;
