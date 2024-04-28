"use client";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { BrandAPI } from "@/Utils/AxiosUtils/API";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../Common/Breadcrumb";
import WrapperComponent from "../Common/WrapperComponent";
import BrandCollection from "./BrandCollection";

const BrandContainer = ({ params }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: "", field: "" });
  const [category, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "attribute", "price", "rating", "sortBy", "field", "layout"]);

  const { data: Brand, isLoading, refetch } = useQuery([BrandAPI], () => request({ url: `${BrandAPI}/slug/${params}` }, router), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    isLoading && refetch();
  }, [isLoading]);

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(",") : [],
        attribute: attribute ? attribute?.attribute?.split(",") : [],
        price: price ? price?.price?.split(",") : [],
        rating: rating ? rating?.rating?.split(",") : [],
        sortBy: sortBy ? sortBy?.sortBy : "",
        field: field ? field?.field : "",
      };
    });
  }, [category, attribute, price, rating, sortBy, field]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={`Brand : ${params}`} subNavigation={[{ name: params }]} />
      <WrapperComponent colProps={{ xs: 12 }}>
        <div className="brand-box">{Brand?.brand_banner && Brand?.brand_banner?.original_url ? <Image src={Brand.brand_banner.original_url} className="img-fluid" height={286} width={1444} alt={Brand.name} /> : <h2>{Brand?.name}</h2>}</div>
      </WrapperComponent>
      <WrapperComponent classes={{ sectionClass: "section-b-space shop-section" }} customCol={true}>
        <BrandCollection filter={filter} setFilter={setFilter} initialGrid={5} noSidebar={true} />
      </WrapperComponent>
    </>
  );
};

export default BrandContainer;
