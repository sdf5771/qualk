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
            <div className={styles.menu_list_container}>
                <Box sx={{ width: '100%', bgcolor: '#111519' }}>
                    <nav>
                        <List component="nav">
                            <ListItem disablePadding divider>
                                <ListItemButton
                                selected={selectedIndex === 1}
                                onClick={(event) => handleListItemClick(event, 1, '/dashboard')}
                                className={styles.list_item_btn}
                                >
                                <ListItemText primary="Dashboard" className={styles.list_item_text} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                selected={selectedIndex === 2}
                                onClick={(event) => handleListItemClick(event, 2, '/userlist')}
                                className={styles.list_item_btn}
                                >
                                    <ListItemText primary="UserList" className={styles.list_item_text}/>
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                selected={selectedIndex === 3}
                                onClick={(event) => handleListItemClick(event, 3, '/quizlist')}
                                className={styles.list_item_btn}
                                >
                                    <ListItemText primary="QuizList" className={styles.list_item_text} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                selected={selectedIndex === 4}
                                onClick={(event) => handleListItemClick(event, 4, '/wikilist')}
                                className={styles.list_item_btn}
                                >
                                    <ListItemText primary="WikiList" className={styles.list_item_text} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                selected={selectedIndex === 5}
                                onClick={(event) => handleListItemClick(event, 5, '/community')}
                                className={styles.list_item_btn}
                                >
                                    <ListItemText primary="Community" className={styles.list_item_text} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton
                                selected={selectedIndex === 6}
                                onClick={(event) => handleListItemClick(event, 6, '/article')}
                                className={styles.list_item_btn}
                                >
                                    <ListItemText primary="Article" className={styles.list_item_text}/>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </div>
            <Divider variant="middle" className={styles.divide}/>
            <div>

            </div>
        </div>
    )
}

export default Navbar;