import { Box, Typography, TypographyProps } from "@mui/material";

const BookPageHeading = ({ title, component = "h2" }: { title: string; component?: React.ElementType }) => {
  return (
    <Box
      className="book_page_heading"
      sx={{
        position: "relative",

        ":after": {
          content: '""',
          display: "block",
          position: "absolute",
          left: "50%",
          transform: "translate(-50%, 10px)",
          width: "140px",
          borderTop: "2px solid #D8D8D8",
        },
      }}
    >
      <Typography component={component} align="center" fontSize="1.125rem" fontWeight={700}>
        {title}
      </Typography>
    </Box>
  );
};

export default BookPageHeading;
