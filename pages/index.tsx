import * as React from 'react';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import Link from '../src/Link';
// import ProTip from '../src/ProTip';
// import Copyright from '../src/Copyright';
import Header from '../src/component/Header';
import SearchIcon from '@mui/icons-material/Search';
import { Button, IconButton } from '@mui/material';
import Footer from '../src/component/Footer';
import Main from '../src/component/Main';

export default function Home() {
  return (

    <>
      <Header
        leftChild={
          <IconButton aria-label='search' >
            <SearchIcon />
          </IconButton>
        }
        centerChild={<a href='/' aria-label='Goodreads Home' title='Goodreads Home'></a>}

        rightChild={<Button variant='contained' color='secondary' size='small'>Sign in</Button>} />


      <Main>
        main
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
