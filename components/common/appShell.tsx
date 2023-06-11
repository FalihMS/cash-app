import { styled, createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React, { PropsWithChildren } from "react"
import Drawer from '@mui/material/Drawer';
import { MainListItem, SecondaryListItems } from '../../components/listItems';
import useMediaQuery from '@mui/material/useMediaQuery';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import ListSubheader from '@mui/material/ListSubheader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


interface AppShellProps extends PropsWithChildren {
    page: string
}
export default function AppShell({ children, page }: AppShellProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    

    return (
        <React.Fragment>
            <MainAppbar isDesktop={matches} page={page}  />
            <Toolbar />
            <Box sx={{ ml: { md: '250px' } }}>
                {children}
            </Box>
        </React.Fragment>
    )
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// Main List Item
function PrimaryListItem({ isDesktop }: any) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ ml: { md: '250px' } }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            <Divider />
            {
                value == 0 && (
                    <List>
                        {
                            ["VelocityShares Daily Inverse VIX Medium-Term ETN",
                                "General Electric Company",
                                "Matador Resources Company",
                            ].map(() => isDesktop ? (
                                <ListItemButton divider sx={{ display: 'flex' }}>
                                    <ListItemText sx={{ maxWidth:'15%'}}  secondary={moment(moment().add(10, 'days')).format('MMM DD, H:mm')} />
                                    <ListItemText>Makan Chicken Curry - <Typography sx={{ color:'text.secondary' }} component="span" >(Pengeluaran, Pacaran)</Typography> </ListItemText>
                                    <ListItemText sx={{ textAlign: 'end', color: 'green'  }} primary="Rp. 500.000" />
                                </ListItemButton>
                            ) : (
                                <ListItemButton>
                                    <ListItemText primary="Makan Chicken Curry" secondary={moment().format('MMM DD, H:mm')} />
                                    <ListItemText sx={{ textAlign: 'end', color: 'green' }} primary="Rp. 500.000" />
                                </ListItemButton>
                            ))

                        }
                    </List>
                )
            }
        </Box>
    )
}

// Main AppBarr
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

}));
function MainAppbar({ isDesktop, page }: any) {
    const matches = isDesktop
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <AppBar position="absolute" open={open} elevation={0}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: { md: '250px' },

                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                       {page}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" variant={matches ? "permanent" : "temporary"} open={open} onClose={toggleDrawer}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    {
                        !matches && (
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        )
                    }

                </Toolbar>
                <Divider />
                <MainListItem />
                <Divider />
                <List style={{ width: "250px" }} >
                    <SecondaryListItems />
                </List>
            </Drawer>
        </>
    )
}