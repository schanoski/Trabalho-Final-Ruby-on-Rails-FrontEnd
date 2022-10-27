import { Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import CategoryService from "../../../src/services/CategoryService";
import Styles from '../../../styles/Styles.module.css'

function EditCategory() {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    CategoryService.getById(id).then((data) => {
      setCategory(data)
    })
  }, [id]) 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateCategory = (category) => {
    CategoryService.update(id, category).then((data) => {
      router.push(ROUTES.categories.list)
      toast.success(`Category successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating category: ${e.message}`)
    })
  }

  if (!category ) return `Carregando...`

  return (
    <Container>
      <h2>Página de Edição de Categoria: {id}</h2>

      <form onSubmit={handleSubmit((data) => updateCategory(data))}>
        <div className="field">
          <TextField label="Name" fullWidth
          {
            ...register("name",
             { required: true }
             )
          } 
          defaultValue={category.name} 
          />
          {errors.name && <p className={Styles.msgRequired}>name is required.</p>}
        </div>
        <div className={Styles.spaceTop}>
          <div className={Styles.inline}>
            <Button variant="contained" type="submit" > Atualizar </Button>
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
      </form>
    </Container>
  );
}

export default EditCategory;