import { HOME_PATH } from "@/constants/routes";
import { HEADER_HEIGHT } from "@/constants/values";
import { Button, Container, Typography, Stack } from "@mui/material";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: `calc(100vh - ${HEADER_HEIGHT})`,
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Button variant="contained" color="primary" component={NextLink} href={HOME_PATH} replace>
          &larr; Go Home
        </Button>
        <Typography variant="h4" align="center">
          죄송합니다. <br /> 해당 페이지를 찾을 수 없습니다.
        </Typography>
        <Typography variant="h6" align="center">
          최근 인기있는 도서들을 살펴보세요.
        </Typography>
      </Stack>
    </Container>
  );
}
