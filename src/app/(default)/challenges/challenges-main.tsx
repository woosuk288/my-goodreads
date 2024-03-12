"use client";

import { useState } from "react";
import { Box, Button, SxProps, TextField, Theme, Typography } from "@mui/material";
import useSWR from "swr";
import { useAuth } from "@/components/AuthProvider";
import { API_CHALLENGE_BY_ID, HOME_PATH, USER_CHALLENGES_PATH } from "@/constants/routes";
import { updateChallenge, getChallenge, deleteChallege } from "@/lib/firebase/firestore";
import useSWRMutation from "swr/mutation";
import LoadingProgress from "@/components/LoadingProgress";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

const MIN_READING_GOAL = 1;
const MAX_READING_GAOL = 1000;

export default function ChallengesMain() {
  const router = useRouter();

  const thisYear = new Date().getFullYear().toString();
  const { state, user } = useAuth();

  const { data: challengeSnap, isLoading } = useSWR(user ? API_CHALLENGE_BY_ID(user.uid) : null, () => getChallenge(user!.uid, thisYear), {
    onSuccess(data, key, config) {
      setReadingGoal(data.get("readingGoal").toString());
    },
  });
  const [readingGoal, setReadingGoal] = useState<string>("");
  const { trigger, isMutating } = useSWRMutation(
    user && API_CHALLENGE_BY_ID(user.uid),
    () => updateChallenge(Number(readingGoal), thisYear),
    {
      onSuccess() {
        router.push(USER_CHALLENGES_PATH + `/${user?.uid}/${thisYear}`);
      },
    }
  );

  const { trigger: deleteTrigger, isMutating: isDeleting } = useSWRMutation(
    user && API_CHALLENGE_BY_ID(user.uid),
    () => deleteChallege(thisYear),
    {
      onSuccess() {
        router.push(HOME_PATH);
      },
      populateCache() {
        return undefined;
      },
      revalidate: false,
    }
  );

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorGoal && !isGoalSame) {
      trigger();
    }
  };

  const handleChallegeLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (confirm("정말 포기하실 건가요?")) {
      deleteTrigger();
    }
  };

  if (state === "loading" || isLoading) return <LoadingProgress />;

  const errorGoal = !!(readingGoal && !(MIN_READING_GOAL <= Number(readingGoal) && Number(readingGoal) <= MAX_READING_GAOL));
  const isGoalSame = readingGoal && challengeSnap?.data()?.readingGoal.toString() === readingGoal;

  return (
    <Box sx={sxChallengesMain}>
      <div className="challenge_container">
        <div className="challenge_content">
          <div className="img_wrapper">
            <img src="https://th.bing.com/th/id/OIG1.qpF4MPDGP3iNZ.Zz4CZQ?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Homepagemasthead" />
          </div>
          <Typography className="challenge_text">
            {thisYear}년에 몇 권의 책을 읽고 싶은지 알려주시면 {/* Goodreads */}
            목표를 달성할 수 있도록 도와드릴게요.
          </Typography>
        </div>
        <form className="challenge_form" onSubmit={handleChallengeSubmit}>
          <div className="field">
            <TextField
              className="challenge_input_number"
              name="user_challenge_goal"
              placeholder="N 권의 책"
              size="small"
              type="number"
              value={readingGoal}
              onChange={(e) => {
                let value = parseInt(e.target.value, 10);
                const min = 0;
                const max = 1000;
                if (value > max) value = max;
                if (value < min) value = min;

                setReadingGoal(isNaN(value) ? "" : String(value));
              }}
              error={errorGoal}
              helperText={errorGoal && "1~1000까지의 입력만 가능합니다."}
              disabled={isMutating || isDeleting}
            />
          </div>
          <div className="actions">
            <Button
              type="submit"
              className="challenge_action_button"
              variant="contained"
              size="large"
              disabled={isGoalSame || isMutating || isDeleting}
            >
              {challengeSnap?.exists() ? "목표 수정하기" : "도전 시작하기"}
            </Button>
          </div>
        </form>

        {challengeSnap?.exists() && (
          <div className="challenge_leave">
            <Button component={NextLink} href="#" onClick={handleChallegeLeave} disabled={isMutating || isDeleting}>
              도전에서 나가기
            </Button>
          </div>
        )}
      </div>
    </Box>
  );
}

const sxChallengesMain: SxProps<Theme> = (theme) => ({
  ".challenge_content": {
    marginTop: "10px",
    marginBottom: "20px",
    textAlign: "center",
    img: { borderRadius: "4px" },
    [theme.breakpoints.up("sm")]: {
      img: {
        height: "380px",
        objectFit: "cover",
        objectPosition: "100% 53%",
      },
    },
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

  ".challenge_leave": {
    margin: "8px",
    textAlign: "center",
    a: {
      color: "text.secondary",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
});
