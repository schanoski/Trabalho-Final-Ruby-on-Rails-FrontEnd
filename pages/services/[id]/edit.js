import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../../src/config/routes";
import ServiceService from "../../../src/services/ServiceService";
import CategoryService from "../../../src/services/CategoryService";

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
    <>
      <p>Página de Edição do artigo: {id}</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.services.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => updateService(data))}>
        <div className="field">
          <label>Description</label>
          <input {...register("description", { required: true })} defaultValue={service.description} />
          {errors.description && <p>description is required.</p>}
        </div>

        <div className="field">
          <label>Type</label>
          <input {...register("service_type", { required: true })} defaultValue={service.service_type} />
          {errors.service_type && <p>service type is required.</p>}
        </div>

        <div className="field">
          <label>Category</label>
          <select {...register("category_id", { pattern: /\d/ })} defaultValue={service.category_id}>
            <option>Select Category</option>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
          {errors.category_id && <p>Category is required.</p>}
        </div>

        <input type="submit" />
      </form>
    </>
  );
}

export default EditService;