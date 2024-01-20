import { Box, Container, SxProps, Typography } from "@mui/material";
import LoginForm from "./SocialLoginButtonGroup";


const sxLogin: SxProps = {
}

const sxLogoWrapper: SxProps = {
  textAlign: 'center',
  margin: '50px auto 15px auto',
  paddingBottom: '10px',

  "> img": {
    backgroundSize: '100% 100%',
    height: '40px',
    width: '181px'
  },
}

const authExternalProviders: SxProps = {
  borderBottom: '2px solid #ccc',
  marginBottom: '16px',
}

const sxAppLinkWrapper: SxProps = {
  margin: '24px 0',
  textAlign: 'center',

  "> .text": {
    paddingBottom: '8px'
  }
}

export default function Login() {
  return (
    <Container className="Login" sx={sxLogin}>

      <Box component={'header'} className="logo_wrapper" sx={sxLogoWrapper}>

        <img src="/images/logo-goodreads.svg" alt="goodreads" />
      </Box>

      <Box sx={authExternalProviders}>

        <LoginForm />

        <Box className="app_link_wrapper" sx={sxAppLinkWrapper}>
          <Typography textAlign='center' sx={{ marginBottom: '8px' }}>앱 다운로드 받기</Typography>
          <a href="#" rel="noopener noreferrer">
            <img src="https://s.gr-assets.com/assets/app/badge-android-highres-e46912ad93a09553adffc67550d3b562.png" alt="Download app for Android" width={160} />
          </a>
        </Box>
      </Box>
    </Container>
  )
}