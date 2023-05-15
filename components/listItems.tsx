import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TuneIcon from '@mui/icons-material/Tune';
import { useRouter } from 'next/router';
import { List } from '@mui/material';

export function MainListItem() {
  const router = useRouter()

  return (
    <List style={{ width: "300px" }} sx={{ flex: 1 }}>
      <ListItemButton onClick={() => router.push('/app/dashboard')}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push('/app/transaction')}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Transaction" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push('/app/wallet')}>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Wallet Account" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push('/app/setting')}>
        <ListItemIcon>
          <TuneIcon />
        </ListItemIcon>
        <ListItemText primary="Setting" />
      </ListItemButton>
    </List>
  )
}
export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);