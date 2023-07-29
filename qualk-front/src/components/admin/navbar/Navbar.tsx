import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';


function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        switch(location.pathname.split('/')[2]){
            case 'dashboard':
                setSelectedIndex(1);
                break
            case 'userlist':
                setSelectedIndex(2);
                break
            case 'quizlist':
                setSelectedIndex(3);
                break
            case 'wikilist':
                setSelectedIndex(4);
                break
            case 'community':
                setSelectedIndex(5);
                break
            case 'article':
                setSelectedIndex(6);
                break
        }
    }, [])

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        url: string,
    ) => {
        setSelectedIndex(index);
        navigate(`/admin${url}`);
    };

    return(
        <div className={styles.navbar_root}>
            <div className={styles.profile_container}>
                <Avatar />
                <span>UserName</span>
            </div>
            <Divider variant="middle" className={styles.divide}/>
            <Box sx={{ width: '100%', borderRadius: '4px' }}>
                <List component="nav" className={styles.list_root}>
                    <ListItem disablePadding divider>
                        <ListItemButton
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1, '/dashboard')}
                        sx={{borderRadius: '4px', bgcolor: '#322f2f'}}
                        >
                        <ListItemText primary="Dashboard" primaryTypographyProps={{fontSize: '0.875rem', color: 'white'}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2, '/userlist')}
                        sx={{borderRadius: '4px', bgcolor: '#322f2f'}}
                        >
                            <ListItemText primary="UserList" primaryTypographyProps={{fontSize: '0.875rem', color: 'white'}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3, '/quizlist')}
                        sx={{borderRadius: '4px', bgcolor: '#322f2f'}}
                        >
                            <ListItemText primary="QuizList" primaryTypographyProps={{fontSize: '0.875rem', color: 'white'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4, '/wikilist')}
                        sx={{borderRadius: '4px', bgcolor: '#322f2f'}}
                        >
                            <ListItemText primary="WikiList" primaryTypographyProps={{fontSize: '0.875rem', color: 'white'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        selected={selectedIndex === 5}
                        onClick={(event) => handleListItemClick(event, 5, '/community')}
                        sx={{borderRadius: '4px', bgcolor: '#322f2f'}}
                        >
                            <ListItemText primary="Community" primaryTypographyProps={{fontSize: '0.875rem', color: 'white'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                        selected={selectedIndex === 6}
                        onClick={(event) => handleListItemClick(event, 6, '/article')}
                        sx={{borderRadius: '4px', bgcolor: '#322f2f'}}
                        >
                            <ListItemText primary="Article" primaryTypographyProps={{fontSize: '0.875rem', color: 'white'}}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider variant="middle" className={styles.divide}/>
            <div>

            </div>
        </div>
    )
}

export default Navbar;