import { Box, Grid, List, ListItem, SxProps, Typography } from "@mui/material";
import Link from "../Link";

const sxFooter: SxProps = {
  background: '#f9f8f4',
  paddingBottom: '32px',
  paddingTop: '32px',

  ".footer_heading": {
    paddingLeft: '16px',
    fontSize: '0.875rem',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  ".footer_linklist": {
    marginBottom: '32px',
    fontSize: '0.875rem',
  },
  ".footer_linklist_item": {
    paddingTop: '2px',
    paddingBottom: '2px'
  },
  ".footer_linklist a": {

    textDecoration: 'none',
    "&:visited": {
      textDecoration: 'none'
    },
    "&:hover, &:active": {
      textDecoration: 'underline'
    }
  },
  ".footer_social_link_wrapper": {
    display: 'inline-block',
    paddingLeft: '16px',
  },
  ".footer_social_link": {
    display: 'inline-block',
    marginRight: '8px',
    marginBottom: '8px'
  },

  ".footer_app_links": {
    paddingLeft: '16px'
  }
}

export default function Footer() {
  return (

    <Box component={'footer'} sx={sxFooter}>
      <Grid container>
        <Grid item xs={6}>

          <Grid container>

            <Grid item md={3}>
              <Typography className="footer_heading" component='h3'>Company</Typography>
              <List className="footer_linklist">
                <ListItem className="footer_linklist_item">
                  <Link href="/about" color="secondary">
                    About us
                  </Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/jobs">Careers</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/about/terms">Terms</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/about/privacy">Privacy</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="https://help.goodreads.com/s/article/Goodreads-Interest-Based-Ads-Notice">Interest Based Ads</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/adprefs">Ad Preferences</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/help/list/mobile_website">Help</Link>
                </ListItem>
              </List>
            </Grid>

            <Grid item md={4}>
              <Typography className="footer_heading" component='h3'>Work with us</Typography>
              <List dense className="footer_linklist">
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/author/program">Authors</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/advertisers">Advertise</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/news?content_type=author_blogs">Authors &amp; ads blog</Link>
                </ListItem>
                <ListItem className="footer_linklist_item">
                  <Link color="secondary" href="/api">API</Link>
                </ListItem>
              </List>
            </Grid>

            <Grid item md={5}>
              <Typography className="footer_heading" component='h3'>Connect</Typography>

              <List>
                <li className="footer_social_link_wrapper">
                  <a className="footer_social_link" rel="noopener noreferrer" href="https://www.facebook.com/Goodreads/"><img alt="Goodreads on Facebook" src="https://s.gr-assets.com/assets/site_footer/footer_facebook-ea4ab848f8e86c5f5c98311bc9495a1b.svg" /></a>
                  <a className="footer_social_link" rel="noopener noreferrer" href="https://twitter.com/goodreads"><img alt="Goodreads on Twitter" src="https://s.gr-assets.com/assets/site_footer/footer_twitter-126b3ee80481a763f7fccb06ca03053c.svg" /></a>
                </li>
                <li className="footer_social_link_wrapper">
                  <a className="footer_social_link" rel="noopener noreferrer" href="https://www.instagram.com/goodreads/"><img alt="Goodreads on Instagram" src="https://s.gr-assets.com/assets/site_footer/footer_instagram-d59e3887020f12bcdb12e6c539579d85.svg" /></a>
                  <a className="footer_social_link" rel="noopener noreferrer" href="https://www.linkedin.com/company/goodreads-com/"><img alt="Goodreads on LinkedIn" src="https://s.gr-assets.com/assets/site_footer/footer_linkedin-5b820f4703eff965672594ef4d10e33c.svg" /></a>
                </li>
              </List>
            </Grid>

          </Grid>
        </Grid>

        <Grid item xs={6}>
          <div className="footer_app_links">
            <a href="https://itunes.apple.com/app/apple-store/id355833469?pt=325668&amp;ct=mw_footer&amp;mt=8"><img alt="Download app for iOS" src="https://s.gr-assets.com/assets/app/badge-ios-desktop-homepage-6ac7ae16eabce57f6c855361656a7540.svg" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.goodreads&amp;utm_source=mw_footer&amp;pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"><img alt="Download app for Android" srcSet="https://s.gr-assets.com/assets/app/badge-android-desktop-home-2x-e31514e1fb4dddecf9293aa526a64cfe.png 2x" src="https://s.gr-assets.com/assets/app/badge-android-desktop-home-0f517cbae4d56c88a128d27a7bea1118.png" />
            </a>
          </div>
          <List className="footer_linklist">
            <ListItem className="footer_linklist_item"> © 2024 Goodreads, Inc.</ListItem>
            <ListItem className="footer_linklist_item">
              <Link href="/toggle_mobile" color='secondary'>Desktop version</Link>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box >
  )
}