"use client";
import Btn from "@/Elements/Buttons/Btn";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, InputGroup } from "reactstrap";
import Breadcrumb from "../Common/Breadcrumb";
import { LeafSVG } from "../Common/CommonSVG";
import WrapperComponent from "../Common/WrapperComponent";
import SearchedData from "./SearchedData";

const SearchModule = () => {
  const { t } = useTranslation("common");
  const [search] = useCustomSearchParams(["search"]);
  const [searchState, setSearchState] = useState("");
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery([ProductAPI, "search"], () => request({ url: ProductAPI, params: { search: search?.search ?? searchState, paginate: 12, status: 1 } }, router), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  useEffect(() => {
    search?.search && refetch();
    setSearchState(search?.search);
  }, [search ,search?.search]);
  useEffect(() => {
    search?.search == undefined && isLoading && refetch();
  }, [isLoading])
  
    if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={"Search"} subNavigation={[{ name: "Search" }]} />
      <WrapperComponent classes={{ sectionClass: "search-section", col: "mx-auto" }} colProps={{ xxl: 6, xl: 8 }}>
        <div className="title d-block text-center">
          <h2>{t("Searchforproducts")}</h2>
          <span className="title-leaf">
            <LeafSVG />
          </span>
        </div>

        <div className="search-box">
          <InputGroup>
            <Input type='text' className='form-control' value={searchState} onChange={(e) => setSearchState(e.target.value)} />
            <Btn className='theme-bg-color text-white m-0' type='button' title='Search' onClick={()=>  router.push(`/search?search=${searchState}`)} />
          </InputGroup>
        </div>
      </WrapperComponent>
      <SearchedData data={data} />
    </>
  );
};

export default SearchModule;
