import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../../../store/store";

const useFilters = () => {
  const [searchParams] = useSearchParams();
  const searchForm = useSelector((state: RootState) => state);
  const page = searchParams.get("page")
    ? +searchParams.get("page")
    : searchForm.search.page;
  const postsPerPage = searchParams.get("postsPerPage")
    ? +searchParams.get("postsPerPage")
    : 25;

  const filters = {
    q: searchParams.get("q"),
    startYear: searchParams.get("startYear")
      ? +searchParams.get("startYear")
      : undefined,
    endYear: searchParams.get("endYear")
      ? +searchParams.get("endYear")
      : undefined,
    page,
    postsPerPage,
  };
  return filters;
};

export default useFilters;
