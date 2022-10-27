import { Button, Container, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import CategoryService from "../../../src/services/CategoryService";
import Styles from '../../../styles/Styles.module.css'

function ShowCategory() {
  const router = useRouter()
  const { id } = router.query

  const [category, setCategory] = useState(null);

  useEffect(() => {
    CategoryService.getById(id).then((data) => {
      setCategory(data)
    })
  }, [id])

  if (!category) return `Carregando...`

  return (
    <Container>
      <h1>Exibindo a categoria: {id}</h1>

      <div>
        <div className={Styles.spaceTop}>
          <TextField fullWidth
              disabled
              id="standard-disabled"
              label="ID"
              defaultValue={category.id}
              variant="standard"
            />
        </div>

        <div className={Styles.spaceTop}>
          <TextField fullWidth
              disabled
              id="standard-disabled"
              label="Name"
              defaultValue={category.name}
              variant="standard"
            />
        </div>
      </div>

      <div className={Styles.spaceTop}>
        <Link
            href={{
              pathname: ROUTES.categories.list,
            }}
          >
            <Button variant="outlined">Voltar</Button>
          </Link>
      </div>
    </Container>
  );
}

export default ShowCategory;