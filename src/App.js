import { Box } from '@mui/material';
import Header from './components/Header';
import Main from './components/Main';
import WalletModal from './components/WalletModal';
import './App.css';
function App() {
  return (
    <Box sx={{}}>
      <Header />
      <WalletModal />
      <Main />
    </Box>
  );
}

export default App;
