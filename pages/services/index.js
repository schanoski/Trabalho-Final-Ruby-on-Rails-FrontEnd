import { useEffect, useState } from "react";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Libs
import { Button, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";

// Material Icons
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Internals
import ROUTES from "../../src/config/routes";
import ServiceService from "../../src/services/ServiceService";
import { Container } from "@mui/system";

function ServiceList() {
  const { router } = useRouter();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const deleteService = (service) => {
    var accepted = confirm(`Você realmente gostaria de deletar o servico: ${service.description}`);
    if (!accepted) return;

    setIsLoading(true);
    ServiceService.destroy(service.id)
      .then((data) => {
        getServices().then(() => {
          setIsLoading(false);
          toast.success("Service destroyed sucessfully!");
        });
      })
      .catch((e) => {
        setIsLoading(false);
        toast.error(`Erro when destroying service: ${e.message}`);
      });
  };

  const getServices = async () => {
    let data = await ServiceService.getAll();
    console.log(data);
    setServices(data);
  };

  useEffect(() => {
    getServices().then(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <p>Carregando....</p>;

  return (
    <Container fluid>
      <Grid container mt={2}>
        <Grid xs={6}>
            <Typography variant="h4">Services List</Typography>
        </Grid>
        <Grid xs={6}>
          <p>
            <Link
              href={{
                pathname: ROUTES.services.new,
              }}
            >
              <Button variant="contained" color="success" size="small" startIcon={<DeleteForeverIcon fontSize="small" />}>
                New Service
              </Button>
            </Link>
          </p>
        </Grid>
        <Grid xs={12}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type Service</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => {
                return (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.description}</td>
                    <td>{service.category.name}</td>
                    <td>{service.service_type}</td>
                    <td>
                      <Link
                        href={{
                          pathname: ROUTES.services.show,
                          query: {
                            id: service.id,
                          },
                        }}
                      >
                        <Button variant="contained" size="small">
                          <VisibilityIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Link
                        href={{
                          pathname: ROUTES.services.edit,
                          query: {
                            id: service.id,
                          },
                        }}
                      >
                        <Button variant="contained" color="warning" size="small">
                          <EditIcon fontSize="small" />
                        </Button>
                      </Link>
                      <Button variant="contained" color="error" size="small" onClick={() => deleteService(service)}>
                        <DeleteForeverIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ServiceList;