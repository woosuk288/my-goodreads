import { Box, SxProps } from "@mui/material";
import LoginForm from "./LoginForm";


const sxLogin: SxProps = {
  textAlign: 'center',
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

const sxAppLinkWrapper: SxProps = {
  margin: '24px 0',

  "> .text": {
    paddingBottom: '8px'
  }
}

export default function Login() {
  return (
    <Box className="Login" sx={sxLogin}>

      <Box component={'header'} className="logo_wrapper" sx={sxLogoWrapper}>

        <img src="/images/logo-goodreads.svg" alt="goodreads" />
      </Box>

      <LoginForm />

      <Box className="app_link_wrapper" sx={sxAppLinkWrapper}>
        <div className="text">앱 다운로드 받기</div>
        <a href="#">
          <img src="https://s.gr-assets.com/assets/app/badge-android-highres-e46912ad93a09553adffc67550d3b562.png" alt="Download app for Android" width={145} height={44} />
        </a>

      </Box>
    </Box>
  )
}