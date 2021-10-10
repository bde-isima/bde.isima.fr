import Grid from '@mui/material/Grid'

import Twitter from '@mui/icons-material/Twitter'
import Facebook from '@mui/icons-material/Facebook'
import Instagram from '@mui/icons-material/Instagram'

export default function Socials() {
  return (
    <Grid container item justifyContent="center" alignItems="center">
      <a
        href="https://www.facebook.com/bde.isima"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lien Facebook BDE ISIMA"
      >
        <Facebook className="m-4 text-primary dark:text-secondary" />
      </a>
      <a
        href="https://twitter.com/bde_isima"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lien Twitter BDE ISIMA"
      >
        <Twitter className="m-4 text-primary dark:text-secondary" />
      </a>
      <a
        href="https://www.instagram.com/bde_isima"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Lien Instagram BDE ISIMA"
      >
        <Instagram className="m-4 text-primary dark:text-secondary" />
      </a>
    </Grid>
  )
}
