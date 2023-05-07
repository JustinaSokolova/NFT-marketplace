import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BoxContainer from "../../common/BoxContainer";
import { fetchFaq, getFaq, getFaqLoadingStatus } from "../../../store/faq";
import SkeletonNftListRow from "../../ui/skeleton/SkeletonNftListRow";

const FaqPage = () => {
  const [expanded, setExpanded] = useState("panel0");
  const dispatch = useDispatch();
  const faqData = useSelector(getFaq());
  const isLoading = useSelector(getFaqLoadingStatus());

  useEffect(() => {
    dispatch(fetchFaq());
  }, [dispatch]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return !isLoading ? (
    <Box sx={{ maxWidth: "800px", minWidth: "600px" }}>
      <BoxContainer>
        {faqData.map((item, index) => (
          <Accordion
            key={item.question}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            variant="outlined"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
            >
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <Box sx={{ typography: "body2" }}>{item.answer}</Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </BoxContainer>
    </Box>
  ) : (
    <Box sx={{ maxWidth: "800px", minWidth: "600px" }}>
      <SkeletonNftListRow />
    </Box>
  );
};

export default FaqPage;
