"use client";

import { useState } from "react";
import { Box, Button, SxProps, TextField, Theme, Typography } from "@mui/material";
import useSWR from "swr";
import { useAuth } from "@/components/AuthProvider";
import { API_CHALLENGE_BY_ID, HOME_PATH, LOGIN_PATH, USER_CHALLENGES_PATH } from "@/constants/routes";
import { updateChallenge, getChallenge, deleteChallege } from "@/lib/firebase/firestore";
import useSWRMutation from "swr/mutation";
import LoadingProgress from "@/components/LoadingProgress";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import SignUpBanner from "@/components/SignUpBanner";

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

    if (!user) {
      router.push(LOGIN_PATH);
      return;
    }

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
      <div className="signup_banner_wrapper">
        <SignUpBanner />
      </div>

      <div className="challenge_container">
        <div className="challenge_banner_wrapper">
          <Typography className="challenge_year">{new Date().getFullYear()}</Typography>

          <img className="challenge_book_image" src="/images/challege_book.svg" alt={`${new Date().getFullYear()} Reading Challenge`} />
          <Typography className="challenge_title" fontSize="1.8rem" fontWeight="bold">
            READING CHALLENGE
          </Typography>
        </div>
        <div className="challenge_stats_wrapper">
          <div className="challenge_table_wrapper">
            <table>
              <tbody>
                <tr>
                  <td className="challenge_stat_item">Participants</td>
                  <td className="stat_number">6,855,413</td>
                </tr>
                <tr>
                  <td className="challenge_stat_item">Books {/* Pledged */}</td>
                  <td className="stat_number">272,204,840</td>
                </tr>
                <tr>
                  <td className="challenge_stat_item">Avg. Books {/* Pledged */}</td>
                  <td className="stat_number">39</td>
                </tr>
                <tr>
                  <td className="challenge_stat_item"> Time Left</td>
                  <td className="stat_number">{getRemainingTime()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="challenge_content">
          <Typography className="challenge_text">
            {thisYear}년에 몇 권의 책을 읽고 싶은지 알려주세요. Goodreads가 목표를 달성할 수 있도록 도와드릴게요.
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

const getRemainingTime = () => {
  // Get the current date and time
  const now = new Date();

  // Calculate the end of this year
  const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

  // Calculate the remaining time in milliseconds
  const remainingTime = endOfYear.getTime() - now.getTime();

  // Convert the remaining time to days and hours
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // return { remainingDays, remainingHours };
  return `${remainingDays} days, \n${remainingHours} hours`;
};

const sxChallengesMain: SxProps<Theme> = (theme) => ({
  marginTop: "10px",

  ".signup_banner_wrapper": {
    display: { sm: "none" },
  },

  ".challenge_banner_wrapper": {
    marginTop: "8px",
    paddingY: "8px",
    backgroundColor: "#732150",
    color: "#FFFFFF",
    textAlign: "center",
  },
  ".challenge_year": {
    fontSize: "3rem",
    lineHeight: 1.2,
    fontWeight: "bold",
  },
  ".challenge_book_image": {
    display: "inline-block",
    width: "130px",
    marginTop: "12px",
  },

  ".challenge_stats_wrapper": {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "#732150",
  },
  ".challenge_table_wrapper": {
    padding: "10px",
    borderRadius: "2px",
    backgroundColor: "#FFFFFF",
  },
  ".challenge_stats_wrapper table": {
    marginLeft: "auto",
    marginRight: "auto",
    padding: "1rem",
    borderCollapse: "collapse",
  },
  ".challenge_stats_wrapper td": {
    padding: "2px 10px",
  },
  ".challenge_stat_item": {
    color: "text.secondary",
    textAlign: "right",
    verticalAlign: "baseline",
  },
  ".stat_number": {
    fontWeight: 600,
  },

  ".challenge_content": {
    marginTop: "10px",
    marginBottom: "20px",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      img: {
        height: "380px",
        objectFit: "cover",
        objectPosition: "100% 53%",
      },
    },
  },

  ".challenge_text": {
    margin: "16px 20px",
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
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  },
  ".challenge_action_button": {
    width: "100%",
    maxWidth: "280px",
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
