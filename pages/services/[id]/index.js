import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import ServiceService from "../../../src/services/ServiceService";
import Styles from '../../../styles/Styles.module.css'

function ShowService() {
  const router = useRouter()
  const { id } = router.query

  const [service, setService] = useState(null);

  useEffect(() => {
    ServiceService.getById(id).then((data) => {
      setService(data)
    })
  }, [id])

  if (!service) return `Carregando...`

  return (
    <Container>
      <h1>Exibindo o serviço: {id}</h1>

      <div>
        <div className={Styles.spaceTop}>
            <TextField fullWidth
                disabled
                id="standard-disabled"
                label="ID"
                defaultValue={service.id}
                variant="standard"
              />
          </div>

          <div className={Styles.spaceTop}>
            <TextField fullWidth
                disabled
                id="standard-disabled"
                label="Description"
                defaultValue={service.description}
                variant="standard"
              />
          </div>

          <div className={Styles.spaceTop}>
            <TextField fullWidth
                disabled
                id="standard-disabled"
                label="Type"
                defaultValue={service.service_type}
                variant="standard"
              />
          </div>
          <div className={Styles.spaceTop}>
            <TextField fullWidth
                disabled
                id="standard-disabled"
                label="Category"
                defaultValue={service.category.name}
                variant="standard"
              />
          </div>
      </div>

      <div className={Styles.spaceTop}>
        <Link
            href={{
              pathname: ROUTES.services.list,
            }}
          >
            <Button variant="outlined">Voltar</Button>
          </Link>
      </div>

    </Container>
  );
}

export default ShowService;