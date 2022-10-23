import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import ServiceService from "../../../src/services/ServiceService";

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
    <>
      <p>Exibindo o serviço: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.services.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{service.id}</dd>

        <dt>Title</dt>
        <dd>{service.description}</dd>

        <dt>Service Type</dt>
        <dd>{service.service_type}</dd>

        <dt>Category</dt>
        <dd>{service.category.name}</dd>

      </dl>

    </>
  );
}

export default ShowService;