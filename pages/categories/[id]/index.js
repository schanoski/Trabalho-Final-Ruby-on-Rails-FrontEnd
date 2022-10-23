import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ROUTES from "../../../src/config/routes";
import CategoryService from "../../../src/services/CategoryService";

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
    <>
      <p>Exibindo a categoria: {id}</p>

      <p>
        <Link
          href={{
            pathname: ROUTES.categories.list,
          }}
        >
          <a>Voltar</a>
        </Link>
      </p>

      <dl>
        <dt>ID</dt>
        <dd>{category.id}</dd>

        <dt>Name</dt>
        <dd>{category.name}</dd>

      </dl>

    </>
  );
}

export default ShowCategory;