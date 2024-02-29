"use client";

import { useState } from "react";
import { Box, Button, SxProps, TextField, Typography } from "@mui/material";

export default function ChallengesMain() {
  const [bookCount, setBookCount] = useState<string>("");

  return (
    <Box sx={sxChallengesMain}>
      <div className="challenge_container">
        <div className="challenge_content">
          <div className="img_wrapper">
            <img src="https://th.bing.com/th/id/OIG1.qpF4MPDGP3iNZ.Zz4CZQ?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Homepagemasthead" />
          </div>
          <Typography className="challenge_text">
            {new Date().getFullYear()}년에 몇 권의 책을 읽고 싶은지 알려주시면 {/* Goodreads */}
            목표를 달성할 수 있도록 도와드릴게요.
          </Typography>
        </div>
        <form className="challenge_form">
          <div className="field">
            <TextField
              className="challenge_input_number"
              name="user_challenge_goal"
              placeholder="N 권의 책"
              size="small"
              type="number"
              value={bookCount}
              onChange={(e) => {
                let value = parseInt(e.target.value, 10);
                console.log("value : ", value);
                const min = 0;
                const max = 1000;
                if (value > max) value = max;
                if (value < min) value = min;

                setBookCount(isNaN(value) ? "" : String(value));
              }}
            />
          </div>
          <div className="actions">
            <Button
              className="challenge_action_button"
              type="submit"
              variant="contained"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                alert("Not yet.");
              }}
            >
              도전 시작하기
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );
}

const sxChallengesMain: SxProps = {
  ".challenge_content": {
    marginTop: "10px",
    marginBottom: "20px",
    textAlign: "center",
  },

  ".challenge_text": {
    margin: "8px 20px",
    wordBreak: "keep-all",
    fontSize: "1.125rem",
    lineHeight: 1.3,
  },
  ".challenge_form": {
    textAlign: "center",
    "> .actions": {
      margin: "20px",
    },
  },
  ".challenge_input_number": {
    width: "160px",
    input: {
      textAlign: "center",
    },
  },
  ".challenge_action_button": {
    width: "100%",
    maxWidth: "280px",
    margin: "20px",
    fontSize: "1.125rem",
    fontWeight: "bold",
  },
};
