import AccountHeading from "@/Components/Common/AccountHeading";
import NoDataFound from "@/Components/Common/NoDataFound";
import Pagination from "@/Components/Common/Pagination";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { RefundAPI } from "@/Utils/AxiosUtils/API";
import { dateFormate } from "@/Utils/CustomFunctions/DateFormate";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table } from "reactstrap";
import emptyImage from "../../../../public/assets/svg/empty-items.svg";

const RefundTable = () => {
  const { t } = useTranslation("common");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data, isLoading, refetch } = useQuery([RefundAPI], () => request({ url: RefundAPI, params: { page, paginate: 10 } }, router), {
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
      <AccountHeading title="Refund" />
      {data?.data?.length > 0 ? (
        <>
          <div className="total-box mt-0">
            <div className="wallet-table mt-0">
              <Table className="m-0">
                <tbody>
                  <tr>
                    <th>{t("No")}</th>
                    <th>{t("Order")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("Reason")}</th>
                    <th>{t("CreatedAt")}</th>
                  </tr>
                  {data?.data?.map((refund, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <span className="fw-bolder">#{refund?.order?.order_number}</span>
                      </td>
                      <td>
                        <div className={`status-${refund.status}`}>
                          <span>{refund.status}</span>
                        </div>
                      </td>
                      <td className="reason-table">{refund?.reason}</td>
                      <td>{dateFormate(refund?.created_at, true)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <nav className="custome-pagination">
            <Pagination current_page={data?.transactions?.current_page} total={data?.transactions?.total} per_page={data?.transactions?.per_page} setPage={setPage} />
          </nav>
        </>
      ) : (
        <NoDataFound
          data={{
            customClass: "no-data-added",
            imageUrl: emptyImage,
            title: "NoRefundsFound",
            description: "YouHaveNoRefundsProcessedYet",
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default RefundTable;
