import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';
import { useRouter } from 'next/router';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';

export function MainListItem() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const router = useRouter()

  return (
    <List style={{ width: "250px" }} sx={{ flex: 1 }}>
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
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} href="/app/setting" >
            <ListItemIcon>
              <TuneIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  )
}
export function SecondaryListItems() {
  const supabaseClient = useSupabaseClient()  
  const router = useRouter()
  return (
    <List style={{ width: "250px" }} >
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText onClick={() => supabaseClient.auth.signOut().then((res)=> router.push('/auth/login'))} primary="Logout" />
      </ListItemButton>

    </List>
  )
};