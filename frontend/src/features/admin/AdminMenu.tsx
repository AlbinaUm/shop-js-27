import Grid from "@mui/material/Grid2";
import {List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AdminMenu = () => {
    return (
        <Grid container direction="column">
            <Grid>
                <Typography variant="h4">Admin menu</Typography>
            </Grid>

            <Grid>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/products'>
                            <ListItemText primary="Products"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/products/new'>
                            <ListItemText primary="New products"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton component={Link} to='/admin/categories'>
                            <ListItemText primary="Categories"/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
};

export default AdminMenu;