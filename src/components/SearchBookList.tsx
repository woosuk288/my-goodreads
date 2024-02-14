import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import debounce from "lodash/debounce";

import { useRouter } from "next/navigation";
import { BOOK_PATH, SEARCH_PATH } from "../constants/routes";
import { Button } from "@mui/material";
import { LINK_BUTTON_COLOR } from "../theme";

interface Props {
  onClose: () => void;
}
export default function SearchBookList({ onClose }: Props) {
  const [value, setValue] = React.useState<IKakaoBook | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly IKakaoBook[]>([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const fetchDebounce = React.useMemo(
    () =>
      debounce(async (request: { input: string }, callback: (results?: readonly IKakaoBook[]) => void) => {
        const KAKAO_BOOK_SEARCH_URL = `https://dapi.kakao.com/v3/search/book?query=${request.input}`;
        const response = await fetch(KAKAO_BOOK_SEARCH_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "KakaoAK " + process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
          },
        });
        const hits: IKakaoBookApiResponse = await response.json();
        console.log("hits : ", hits);

        callback(hits.documents);
      }, 500),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    setLoading(() => true);

    fetchDebounce({ input: inputValue }, (results?: readonly IKakaoBook[]) => {
      if (active) {
        let newOptions: readonly IKakaoBook[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setLoading(() => false);
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchDebounce]);

  return (
    <Autocomplete
      sx={{ padding: "5px 8px", backgroundColor: "#F4F1EA" }}
      slotProps={{ popper: { style: { width: "100%" } } }}
      id="kakao-book-search"
      getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      popupIcon={null}
      value={value}
      onChange={(event: any, newValue: IKakaoBook | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onClose();

        const params = new URLSearchParams(newValue as unknown as Record<string, string>);
        router.push(`${BOOK_PATH}?query=${inputValue}&${params.toString()}`);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <Box
          sx={{
            display: "flex",
            "> .MuiFormControl-root": { background: "#FFFFFF" },
          }}
        >
          <TextField
            {...params}
            placeholder="책 검색"
            variant="outlined"
            fullWidth
            // autoFocus
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { "&.Mui-focused fieldset": { borderColor: "text.primary" } } }}
          />
          <Button sx={{ color: LINK_BUTTON_COLOR }} onClick={onClose}>
            취소
          </Button>
        </Box>
      )}
      open={!!inputValue}
      loading={loading}
      loadingText="검색 중 ..."
      noOptionsText={"결과 없음"}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.isbn}>
            <Grid container alignItems="center">
              <Grid item>
                <Box sx={{ color: "text.secondary", mr: 2 }}>
                  <Avatar variant="square" src={option.thumbnail} alt={option.title} sx={{ width: 48, height: 48 }} />
                </Box>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" color="text.primary" gutterBottom>
                  {option.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" noWrap>
                  {option.authors.join(" ")}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
