import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import ServiceService from "../../../src/services/ServiceService";
import CategoryService from "../../../src/services/CategoryService";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Styles from '../../../styles/Styles.module.css'

function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ServiceService.getById(id).then((data) => {
      setService(data)
    })
  }, [id])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const updateService = (service) => {
    ServiceService.update(id, service).then((data) => {
      router.push(ROUTES.services.list)
      toast.success(`Service successfully updated!`)
    }).catch((e) => {
      toast.error(`Erro when updating service: ${e.message}`)
    })
  }

  useEffect(() => {
    CategoryService.getAll().then((data) => setCategories(data));
  }, []);

  if (!service || !categories.length) return `Carregando...`

  return (
    <Container>
      <h2>Página de Edição de Serviços: {id}</h2>

      <form onSubmit={handleSubmit((data) => updateService(data))}>
        <div className={Styles.spaceTop}>
          <TextField label="Description" fullWidth 
          {
            ...register("description",
            { required: true }
            )
          } 
            defaultValue={service.description} />
          {errors.description && <p className={Styles.msgRequired}> description is required.</p>}
        </div>

        <div className={Styles.spaceTop}>
          <TextField label="Type" fullWidth {...register("service_type", { required: true })} defaultValue={service.service_type} />
          {errors.service_type && <p className={Styles.msgRequired}>service type is required.</p>}
        </div>

        <div className={Styles.spaceTop}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select {...register("category_id", { pattern: /\d/ })} defaultValue={service.category_id}>
              {categories.map((category) => {
                return (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {errors.category_id && <p className={Styles.msgRequired}>Category is required.</p>}

        </div>

        <div className={Styles.spaceTop}>
          <div className={Styles.inline}>
            <Button variant="contained" type="submit" > Atualizar </Button>
          </div>
          <div className={Styles.inline}>
            <Link
              href={{
                pathname: ROUTES.services.list,
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

export default EditService;