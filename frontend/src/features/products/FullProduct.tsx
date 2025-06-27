import {NavLink, useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneProduct, selectProductsLoading} from "./productsSlice.ts";
import {Card, CardActionArea, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import {fetchProductById} from "./productsThunks.ts";
import NotFoundPic from '../../assets/images/notFoundPic.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {apiUrl} from "../../../globalConstants.ts";


const FullProduct = () => {
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProduct);
    const fetchLoading = useAppSelector(selectProductsLoading);

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [id, dispatch]);

    return (
        <Container maxWidth="md">
            {fetchLoading ? <Spinner/> : null}

            {!fetchLoading && product ?
                <Card sx={{ width: "50%", margin: "0 auto" }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="200"
                            image={product?.image ? apiUrl + '/' + product.image : NotFoundPic}
                            alt={product.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.title}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.description}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                <strong>Price: {product.price} KGS</strong>
                            </Typography>
                        </CardContent>
                        <IconButton component={NavLink} to='/'>
                           <ArrowBackIcon sx={{fontSize: "14px"}}/>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: "10px" }}>
                                Go back home
                            </Typography>
                        </IconButton>
                    </CardActionArea>
                </Card>
                :
                <Typography variant="h6">Not found product</Typography>
            }
        </Container>
    );
};

export default FullProduct;