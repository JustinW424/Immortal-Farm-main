import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { WalletConnectButton } from '../WalletModal';
// const StyledLink = styled(Link)(({ theme }) => ({
//   margin: '0px 10px',
//   padding: '10px',
//   textDecoration: 'none',
//   color: '#fff',
//   fontSize: '15px',
//   transition: 'all 0.4s',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   textTransform: 'uppercase',
//   '&:hover , &.Mui-focusVisible': {
//     borderBottom: `3px solid rgb(76, 163, 253)`,
//     color: 'rgb(76, 163, 253)',
//   },
// }));
// const StyledDropDown = styled('span')(({ theme }) => ({
//   textDecoration: 'none',
//   color: '#fff',
//   fontSize: '15px',
//   transition: 'all 0.4s',
//   fontWeight: 'bold',
//   cursor: 'pointer',
//   position: 'relative',
//   textTransform: 'uppercase',
//   padding: '0px 10px',
//   display: 'flex',
//   alignItems: 'center',
//   '&>div': {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     border: '1px solid rgb(76, 163, 253)',
//     flexDirection: 'column',
//     transform: 'translateY(100%)',
//     backgroundColor: '#000',
//     padding: '5px',
//     display: 'none',
//     '&>a': {
//       padding: '5px 0',
//     },
//   },
//   '&:hover > div': {
//     display: 'flex',
//   },
// }));
export default function Header() {
  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: 'none' }}>
      <Toolbar
        sx={{
          pt: 4,
          mx: { md: 4 },
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Typography
          color="common.white"
          fontWeight="800"
          fontSize={{
            xl: '7rem',
            lg: '4rem',
            md: '3rem',
            sm: '2rem',
            xs: '2rem',
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textShadow: {
              xl: '.5rem .2rem #A8B8EE',
              lg: '.3rem .2rem #A8B8EE',
              md: '.2rem .15rem #A8B8EE',
              xs: '.2rem .15rem #A8B8EE',
            },
          }}
        >
          IMM
          <Box
            sx={{
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              mx: { xl: -3, lg: -2, md: -1.2, sm: -0.8, xs: -0.5 },
              width: {
                xl: '8rem',
                lg: '4.5rem',
                md: '3.5rem',
                sm: '2.5rem',
                xs: '2.5rem',
              },
            }}
          >
            <img
              src="/images/flower.png"
              alt="logo"
              style={{
                zIndex: 1,
                width: '100%',
              }}
            />
          </Box>
          RTAL FARM
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}> */}
        {/* <StyledLink href="https://bancambios.exchange/">Home</StyledLink>
          <StyledLink href="https://bancambios.exchange/swap">
            Stableswap
          </StyledLink>
          <StyledLink href="https://bancambios.exchange/alphatrade">
            Alphatrade
          </StyledLink>
          <StyledDropDown>
            Catapult <i class="arrow down" style={{ marginLeft: '10px' }}></i>
            <div>
              <StyledLink href="https://bancambios.exchange/catapult-eco-sto">
                Eto-STO's
              </StyledLink>
              <StyledLink href="https://bancambios.exchange/catapult-dlt-projects">
                DLT <br /> Projects
              </StyledLink>
            </div>
          </StyledDropDown>
          <StyledLink href="https://bancambios.exchange/nft">Nft</StyledLink>
          <StyledLink href="/" className="Mui-focusVisible">
            Token sale
          </StyledLink> */}
        <WalletConnectButton size="medium" />
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}
