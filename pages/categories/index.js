import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography, Table, TableHead, TableBody, TableContainer, TableRow, TableCell } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import CategoryService from "../../src/services/CategoryService";
import { Container } from "@mui/system";


function CategoryList() {
  const { router } = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteCategory = (category) => {
    var accepted = confirm(`Você realmente gostaria de deletar a categoria?: ${category.name}`);
    if (!accepted) return;

    setIsLoading(true);
    CategoryService.destroy(category.id)
      .then((data) => {
        getCategories().then(() => {
          setIsLoading(false);
          toast.success("Category destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying category: ${e.message}`);
      });
  };

  const getCategories = async () => {
    let data = await CategoryService.getAll();
    console.log(data);
    setCategories(data);
  };

  useEffect(() => {
    getCategories().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={8}>
            <Typography variant="h4">Categories List</Typography>
        </Grid>
        <Grid xs={4}>
          <p>
            <Link
              href={{
                pathname: ROUTES.categories.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New Category
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => {
                  return (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: ROUTES.categories.show,
                            query: {
                              id: category.id,
                            },
                          }}
                        >
                          <Button variant="contained" size="small">
                            <VisibilityIcon fontSize="small" />
                          </Button>
                        </Link>
                        <Link
                          href={{
                            pathname: ROUTES.categories.edit,
                            query: {
                              id: category.id,
                            },
                          }}
                        >
                          <Button variant="contained" color="warning" size="small">
                            <EditIcon fontSize="small" />
                          </Button>
                        </Link>
                        <Button variant="contained" color="error" size="small" onClick={() => deleteCategory(category)}>
                          <DeleteForeverIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryList;