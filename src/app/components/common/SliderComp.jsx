import React, { useState, useRef } from "react";

import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/material";
// import "react-multi-carousel/lib/styles.css";

import Button from "@mui/material/Button";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

import CollectionItem from "../pages/Collection/CollectionItem";

const SliderComp = ({ props }) => {
  // const sliderRef = useRef(null);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const handlePrevSlide = (e) => {
  //   e.preventDefault();
  //   if (sliderRef?.current) {
  //     sliderRef.current.prev();
  //   }
  // };

  // const handleNextSlide = (e) => {
  //   e.preventDefault();
  //   if (sliderRef?.current) {
  //     sliderRef.current.next();
  //   }
  // };
  return (
    <Box>
      <Carousel
        // NextIcon={<ArrowCircleRightOutlinedIcon />}
        // PrevIcon={<ArrowCircleLeftOutlinedIcon />}
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={false}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        // autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        navButtonsAlwaysVisible={true}

        // deviceType={this.props.deviceType}
      >
        <Box
          sx={{
            // width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {props.map((item) => (
            <CollectionItem key={item.tokenId} {...item} />
          ))}
        </Box>
      </Carousel>
      {/* <Box>
        <Button onClick={handlePrevSlide}>
          <ArrowCircleRightOutlinedIcon />
        </Button>
        <Button onClick={handlePrevSlide}>
          <ArrowCircleLeftOutlinedIcon />
        </Button>
      </Box> */}
    </Box>
  );
};
export default SliderComp;
