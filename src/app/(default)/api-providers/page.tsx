import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { List, ListItem, ListItemText } from "@mui/material";

export default function ApiProviders() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          API 및 정보 제공
        </Typography>

        <List>
          <ListItem disablePadding>
            <ListItemText primary="도서 DB 제공 : 알라딘 인터넷서점(www.aladin.co.kr)" />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
