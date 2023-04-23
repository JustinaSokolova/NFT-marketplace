import React from "react";

import Carousel from "react-multi-carousel";
import { Box, Button } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import CollectionItem from "../pages/Collection/CollectionItem";

const SliderComp = ({ props }) => {
  const handleDragStart = (e) => e.preventDefault();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3,
    },
    desktop2: {
      breakpoint: { max: 1730, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop3: {
      breakpoint: { max: 1560, min: 1024 },
      items: 4,
      slidesToSlide: 2,
    },
    tablet1: {
      breakpoint: { max: 1260, min: 464 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet2: {
      breakpoint: { max: 970, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 620, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;
    return (
      <div
        className="carousel-button-group mb-4  gap-4 flex justify-end
          items-center w-full"
      >
        <button className="block p-3 bg-slate-300" onClick={() => previous()}>
          {" "}
          <ArrowBackIosNewIcon />
        </button>
        <button onClick={() => next()}>
          <span className="block p-3 bg-slate-300">
            <ArrowForwardIosIcon />
          </span>
        </button>
      </div>
    );
  };
  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;

    return (
      <Button
        onClick={() => onClick()}
        className="custom-carousel-button--next"
      >
        <ArrowForwardIosIcon />
      </Button>
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      carouselState: { currentSlide },
    } = rest;

    return (
      <Button
        onClick={() => onClick()}
        className="custom-carousel-button--prev"
      >
        <ArrowBackIosNewIcon />
      </Button>
    );
  };

  if (props.length <= 0)
    return "There are no sold NFTs for the selected period";

  return (
    <Box
      sx={{
        maxWidth: "78vw",
        margin: "0 auto",
      }}
    >
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        showDots={true}
        slidesToSlide={2}
        dotListClass="custom-dot-list-style"
        // renderButtonGroupOutside={true}
        // arrows={false}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {props.map((item) => (
          <Box sx={{ m: "24px" }} key={item.tokenId}>
            <CollectionItem
              key={item.tokenId}
              {...item}
              onDragStart={handleDragStart}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};
export default SliderComp;
