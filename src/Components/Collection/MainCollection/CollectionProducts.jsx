import { useContext, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Col, Row } from "reactstrap";
import NoDataFound from "@/Components/Common/NoDataFound";
import Pagination from "@/Components/Common/Pagination";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import noProduct from "../../../../public/assets/svg/no-product.svg";
import ProductSkeletonComponent from "@/Components/Common/SkeletonLoader/ProductSkeleton/ProductSkeletonComponent";
import ProductBox from "@/Components/Common/ProductBox";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";

const CollectionProducts = ({ setFilter, filter, grid }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { slug } = useParams();
  const [category, brand, attribute, price, rating, sortBy, field, layout] =
    useCustomSearchParams([
      "category",
      "brand",
      "attribute",
      "price",
      "rating",
      "sortBy",
      "field",
      "layout",
    ]);
  const [page, setPage] = useState(filter?.page);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (page > 1) {
      const queryParams = new URLSearchParams({
        ...brand,
        ...attribute,
        ...price,
        ...sortBy,
        ...field,
        ...rating,
        ...layout,
        ...category,
        page,
      }).toString();
      router.push(`${pathname}?${queryParams}`);
      setFilter((prev) => {
        return { ...prev, page: page };
      });
    }
  }, [page]);

  const { data, fetchStatus } = useQuery(
    [page, filter],
    () =>
      request({
        url: ProductAPI,
        params: {
          page: filter?.page ?? 1,
          status: 1,
          paginate: 40,
          field: filter?.field ?? "created_at",
          price: filter?.price.join(",") ?? "",
          category: filter?.category.join(","),
          brand: filter.brand.join(","),
          sort: "",
          sortBy: filter?.sortBy ?? "asc",
          rating: filter?.rating.join(",") ?? "",
          attribute: filter?.attribute.join(",") ?? "",
          store_slug: slug ? slug : null,
        },
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (data) => data.data,
    }
  );
  return (
    <>
      {fetchStatus == "fetching" ? (
        <Row
          xxl={grid !== 3 && grid !== 5 ? 4 : ""}
          xl={grid == 5 ? 5 : 3}
          lg={grid == 5 ? 4 : 2}
          className={`g-sm-4 g-3 product-list-section ${
            grid == "list"
              ? "list-style"
              : grid == 4
              ? "row-cols-xl-4"
              : grid == 5
              ? "row-cols-xl-4 row-cols-xxl-5"
              : ""
          }`}
          xs={2}
          md={3}
        >
          <ProductSkeletonComponent item={40} />
        </Row>
      ) : data?.data?.length > 0 ? (
        <div
          className={`${
            themeOption?.product?.full_border ? "full_border" : ""
          } ${themeOption?.product?.image_bg ? "product_img_bg" : ""} ${
            themeOption?.product?.product_box_bg ? "full_bg" : ""
          } ${
            themeOption?.product?.product_box_border ? "product_border" : ""
          } `}
        >
          <Row
            className={`g-sm-4 g-3 product-list-section ${
              grid == "list"
                ? "list-style"
                : grid == 4
                ? "row-cols-xl-4"
                : grid == 5
                ? "row-cols-xl-4 row-cols-xxl-5"
                : ""
            }`}
            xs={2}
            md={3}
          >
            {data?.data?.map((product, i) => (
              <Col key={i}>
                <ProductBox
                  product={product}
                  className="boxClass"
                  style="'horizontal'"
                />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <NoDataFound
          data={{
            imageUrl: noProduct,
            customClass: "no-data-added collection-no-data",
            title: "Sorry! Couldn't find the products you were looking For!",
            description:
              "Please check if you have misspelt something or try searching with other way.",
            height: 345,
            width: 345,
          }}
        />
      )}

      {data?.data?.length > 0 && (
        <nav className="custome-pagination">
          <Pagination
            current_page={data?.current_page}
            total={data?.total}
            per_page={data?.per_page}
            setPage={setPage}
          />
        </nav>
      )}
    </>
  );
};

export default CollectionProducts;
