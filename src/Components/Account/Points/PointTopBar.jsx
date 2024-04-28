import AccountHeading from "@/Components/Common/AccountHeading";
import NoDataFound from "@/Components/Common/NoDataFound";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { PointAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import emptyImage from "../../../../public/assets/svg/empty-items.svg";
import PointTable from "./PointTable";

const PointTopBar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery([PointAPI], () => request({ url: PointAPI, params: { page, paginate: 10 } }, router), {
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, [page]);
  if (isLoading) return <Loader />;
  return (
    <>
      <AccountHeading title="Points" />
      {data?.transactions?.data?.length > 0 ? (
        <PointTable data={data} setPage={setPage} />
      ) : (
        <NoDataFound
          data={{
            customClass: "no-data-added",
            imageUrl: emptyImage,
            title: "No Transaction Found",
            description: "You have not earned any points yet",
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default PointTopBar;
