import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ROUTES from "../../src/config/routes";
import ServiceService from "../../src/services/ServiceService";
import CategoryService from "../../src/services/CategoryService";

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
    <>
      <p>Tela de Cadastro de Serviço</p>
      <p>
        <Link
          href={{
            pathname: ROUTES.services.list,
          }}
        >
          <a>Cancelar</a>
        </Link>
      </p>

      <form onSubmit={handleSubmit((data) => insertService(data))}>
        <div className="field">
          <label>Description</label>
          <input {...register("description", { required: true })} />
          {errors.description && <p>description is required.</p>}
        </div>

        <div className="field">
          <label>Service Type</label>
          <input {...register("service_type", { required: true })} />
          {errors.service_type && <p>Service Type is required.</p>}
        </div>

        <div className="field">
          <label>Category</label>
          <select {...register("category_id", { pattern: /\d/ })}>
          <option>Select Category</option>
            {
              categories.map((category) => {
                return <option key={category.id} value={category.id}>{category.name}</option>
              })
            }
          </select>
          {errors.category_id && <p>Category is required.</p>}
        </div>


        <input type="submit" />
      </form>
    </>
  );
}

export default NewService;