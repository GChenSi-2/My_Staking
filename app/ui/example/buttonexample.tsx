import Button from '@mui/material/Button';

export default function Buttonexample() {
  return <Button sx={{
    // bgcolor: 'red',
    bgcolor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.dark',
      boxShadow: 3,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }} variant="contained">Hello MUI</Button>;
}