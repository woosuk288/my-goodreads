// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '../src/Link';
// import ProTip from '../src/ProTip';
// import Copyright from '../src/Copyright';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import Main from '../src/component/Main';
import Home from '../src/component/Home';

export default function HomePage() {
  return (

    <>
      <Header />

      <Main>
        <Home />
      </Main>

      <Footer />


      {/*       
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example in TypeScript
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box> */}
    </>
  );
}
