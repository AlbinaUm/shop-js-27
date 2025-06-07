import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectAdminProducts} from "./productsAdminSlice.ts";
import {useEffect} from "react";
import {fetchAdminAllProducts} from "./productsAdminThunks.ts";
import {GridColDef, DataGrid} from '@mui/x-data-grid'
import {Product} from "../../../types";
import {IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Grid2";


const AdminProductsList = () => {
    const products = useAppSelector(selectAdminProducts);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAdminAllProducts());
    }, [dispatch]);

    const columns: GridColDef<Product>[] = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: false,
            valueGetter: (_value, row: Product) => row.category.title,
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 150,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
            editable: false,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 160,
            editable: false,
        },
        {
            field: 'actions',
            headerName: '',
            sortable: false,
            editable: false,
            filterable: false,
            width: 100,
            renderCell: () => (
                <>
                    <IconButton>
                        <ClearIcon/>
                    </IconButton>

                    <IconButton>
                        <EditIcon/>
                    </IconButton>
                </>
            )
        },
    ];
    return (
        <Grid container>

            <Grid>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={products}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Grid>
        </Grid>
    );
};

export default AdminProductsList;