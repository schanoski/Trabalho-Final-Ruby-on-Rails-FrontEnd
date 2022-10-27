import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ServiceService from "../../src/services/ServiceService";
import CategoryService from "../../src/services/CategoryService";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Styles from '../../styles/Styles.module.css'

function NewService() {
  const router = useRouter()
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const insertService = (service) => {
    ServiceService.create(service).then((data) => {
      router.push(ROUTES.services.list)
      toast.success(`Service successfully created!`)
    }).catch((e) => console.error(e))
  }

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data))
  }, []);

  return (
    <Container>
      <h1>Tela de Cadastro de Serviço</h1>


      <form onSubmit={handleSubmit((data) => insertService(data))}>
        <div className={Styles.spaceTop}>
          <TextField fullWidth label="Description" {...register("description", { required: true })} />
          {errors.description && <p>description is required.</p>}
        </div>

        <div className={Styles.spaceTop}>
          <TextField fullWidth label="Type" {...register("service_type", { required: true })} />
          {errors.service_type && <p>Service Type is required.</p>}
        </div>

        <div className={Styles.spaceTop}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select {...register("category_id", { pattern: /\d/ })}>
                {
                  categories.map((category) => {
                    return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  })
                }
            </Select>
          </FormControl>

          {errors.category_id && <p>Category is required.</p>}
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

      </form>
    </Container>
  );
}

export default NewService;