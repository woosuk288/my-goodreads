// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '../src/Link';
// import ProTip from '../src/ProTip';
// import Copyright from '../src/Copyright';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import Main from '../src/component/Main';

export default function Home() {
  return (

    <>
      <Header />

      <Main>
        main

        <ul>
          <li><a href="/signup">signup</a></li>
          <li><a href="/review">review</a></li>
          <li><a href="/about">about</a></li>
        </ul>
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
