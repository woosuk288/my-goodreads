import { Box, Typography } from "@mui/material";

const BookPageHeading02 = ({ title }: { title: string }) => {
  return (
    <Box
      className="book_page_heading02"
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
      <Typography component="h2" align="center" fontSize="1.125rem" fontWeight={700}>
        {title}
      </Typography>
    </Box>
  );
};

export default BookPageHeading02;
