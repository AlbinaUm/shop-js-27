import Grid from "@mui/material/Grid2";
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom";
import {apiUrl} from "../../../../../globalConstants.ts";
import NotFoundPic from "../../../../assets/images/notFoundPic.jpg";
import EditIcon from '@mui/icons-material/Edit';


interface Props {
    title: string;
    price: number;
    id: string;
    category_title: string;
    image: string | undefined;
}

const ProductItem: React.FC<Props> = ({title, price, category_title,  id, image}) => {
    let cartImage = NotFoundPic;

    if (image) {
        cartImage = apiUrl + '/' + image;
    }

    return (
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={cartImage}
                    alt={title}
                />
                <CardHeader title={title} />
                <CardContent>
                    <p>
                        <strong>
                            Category: {category_title}
                        </strong>
                    </p>
                    <p>
                        <strong>
                            Price: {price} KGS
                        </strong>
                    </p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={'/products/' + id}>
                        <ArrowForwardIcon/>
                    </IconButton>
                    <IconButton component={Link} to={'/products/' + id + '/edit'}>
                        <EditIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;