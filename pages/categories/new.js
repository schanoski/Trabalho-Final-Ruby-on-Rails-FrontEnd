import { Button, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import CategoryService from "../../src/services/CategoryService";
import Styles from '../../styles/Styles.module.css'

function NewCategory() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertCategory = (category) => {
    CategoryService.create(category).then(() => {
      router.push(ROUTES.categories.list)
      toast.success(`Category successfully created!`)
    }).catch((e) => console.error(e))
  }

  return (
    <Container>
      <h1>Tela de Cadastro de Categoria</h1>
      <form onSubmit={handleSubmit((data) => insertCategory(data))}>
        <Box>
          <div>
            <TextField fullWidth id="name" label="Name" variant="standard"  {...register("name", { required: true })} />
            {errors.name && <p className={Styles.msg-required}>Name is required.</p>}
          </div>
          <div className={Styles.spaceTop}>
            <div className={Styles.inline}>
              <Button variant="contained" type="submit"> 
                Enviar 
              </Button>
            </div>
            <div className={Styles.inline}>
              <Link
                  href={{
                    pathname: ROUTES.categories.list,
                  }}
                >
                  <Button variant="outlined">Cancelar</Button>
              </Link>
            </div>
          </div>
        </Box>

      </form>
      <p>
      </p>

    </Container>
  );
}

export default NewCategory;