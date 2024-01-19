import { Box, Button, Checkbox, Divider, FormControlLabel, IconButton, InputAdornment, SxProps, TextField, Typography } from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Link from "../Link";
import { HOME_PATH, SIGNIN_PATH } from "../constants/routes";
import { useState } from "react";
import { IUserCredentials } from "LOGIN_MODULE";


const sxLogoSection: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '16px',
  padding: '16px',
  "img": {
    width: '205px',
  }
}

const sxFormSection: SxProps = {
  padding: '16px',
  ".forgot_password_wrapper": {
    marginBottom: '12px',
    textAlign: 'right',
  },
  ".MuiTextField-root": {
    width: '100%',
    marginTop: '8px',
    marginBottom: '4px',
    ".MuiInputBase-root": {
    },
    ".MuiInputBase-input": {
      "padding": "8.5px 14px"
    },

    "fieldset": { borderRadius: '24px' },

  },
  ".password_info_wrapper": {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    marginTop: '8px',
    ".MuiSvgIcon-root": {
      fontSize: '1.25rem',
      color: 'text.secondary',
    },
    ".MuiTypography-root": {
      color: 'text.secondary',
      lineHeight: 1
    }

  },
  ".checkbox_wrapper": {
    marginBlock: '12px',
    marginBottom: '24px',
  },

  ".legal_text_wrapper": {
    marginTop: '16px',
    marginBottom: '12px',
    "a": {
      color: '#1E1915',
      textDecoration: 'underline'
    }
  }

}

const sxFooterSection: SxProps = {
  marginTop: '32px',
  marginBottom: '32px',
  ".terms_wrapper": {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '8px',
  }
}


interface Props {

}

export default function SignInEmail({ }: Props) {

  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
    displayName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    })
  }

  const handleCancel = (name: keyof IUserCredentials) => () => {
    if (userCredentials[name]) {
      setUserCredentials({
        ...userCredentials,
        [name]: ''
      })
    }
  }

  const textFiledClearIcon = (name: keyof IUserCredentials) =>
    userCredentials[name]
      ? ({
        endAdornment: <InputAdornment position="end">
          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            onClick={handleCancel(name)}
          >
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      }) : undefined

  return (

    <Box className="SignInEmail">

      <Box sx={sxLogoSection}>
        <Link href={HOME_PATH} >
          <img src="/images/logo-goodreads.svg" alt="Goodreads" />
        </Link>
      </Box>

      <Box sx={sxFormSection} component='form'>
        <Typography component="h1" fontSize='1.5rem' fontWeight={600} gutterBottom>이메일 가입</Typography>
        <div className="forgot_password_wrapper">
          <Link href="/forgotpassword" sx={{ textDecoration: 'underline' }}>비밀번호를 잊었나요?</Link>
        </div>

        <TextField
          type="email" name="email" placeholder="이메일 주소"
          InputProps={textFiledClearIcon('email')}
          value={userCredentials.email} onChange={handleChange} />
        <TextField
          type="password" name="password" placeholder="비밀번호"
          InputProps={textFiledClearIcon('password')}
          value={userCredentials.password} onChange={handleChange} />


        <div className="checkbox_wrapper">
          <div className="checkbox_row">

            <FormControlLabel
              label="비밀번호 보이기"
              control={<Checkbox checked={true} onChange={handleChange} />}
            />
          </div>
          <div className="checkbox_row">
            <FormControlLabel
              label="로그인 유지하기"
              control={<Checkbox checked={false} onChange={handleChange} />}
            />
          </div>

        </div>

        <div className="submit_wrapper">
          <Button variant="contained" color="secondary" fullWidth sx={{ padding: '8px 16px', borderRadius: '24px' }}>로그인</Button>
        </div>

        <div className="legal_text_wrapper">
          <Typography>
            By creating an account, you agree to the Goodreads <Link href="https://www.goodreads.com/about/terms">Terms of Service</Link> and <Link href="https://www.goodreads.com/about/privacy">Privacy Policy</Link>
          </Typography>
        </div>

        <Divider sx={{ marginBottom: '12px', ":before, :after": { borderColor: (theme) => theme.palette.secondary.main, opacity: 0.5 } }}>
          <Typography align="center"

          >
            Goodreads가 처음이신가요?
          </Typography>
        </Divider>


        <Button variant="outlined" color="secondary" fullWidth sx={{ padding: '7px 15px', borderRadius: '24px' }} component={Link} href={SIGNIN_PATH}>가입하기</Button>
      </Box>

      <Box component='footer' sx={sxFooterSection} >
        <div className="terms_wrapper">
          <Link href="/about/terms">서비스 약관</Link>
          <Link href="/about/privacy">개인 정보 보호</Link>
          <Link href="/help">도움말</Link>
        </div>

        <Typography variant="body2" align="center">© 2023 Goodreads, Inc.</Typography>
      </Box>

    </Box>
  )
}