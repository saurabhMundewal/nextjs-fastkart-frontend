"use client";
import Avatar from "@/Components/Common/Avatar";
import CustomModal from "@/Components/Common/CustomModal";
import NoDataFound from "@/Components/Common/NoDataFound";
import Btn from "@/Elements/Buttons/Btn";
import SettingContext from "@/Helper/SettingContext";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalBody, ModalHeader } from "reactstrap";
import { placeHolderImage } from "../../../../Data/CommonPath";

const HeaderDealModal = ({ setModal, modal }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { themeOption } = useContext(ThemeOptionContext);
  const { convertCurrency } = useContext(SettingContext);
  const [getProductIds, setGetProductIds] = useState({});

  const { data: filteredProduct, refetch, isLoading } = useQuery([ProductAPI, "DealModal"], () => request({ url: ProductAPI, params: { ...getProductIds, status: 1 } }, router), { enabled: false, refetchOnWindowFocus: false, select: (data) => data?.data?.data });
  useEffect(() => {
    if (themeOption?.header?.today_deals?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(themeOption?.header?.today_deals))?.join(",") });
    }
    !isLoading && Object.keys(getProductIds).length > 0 && refetch();
  }, [themeOption?.header?.today_deals]);
  useEffect(() => {
    isLoading && getProductIds?.ids && refetch();
  }, [isLoading, getProductIds?.ids]);
  return (
    <CustomModal
      modal={modal}
      setModal={setModal}
      classes={{
        modalClass: "theme-modal deal-modal modal-dialog modal-dialog-centered modal-fullscreen-sm-down",
        customChildren: true,
      }}
    >
      <ModalHeader>
        <div>
          <h5 className="modal-title w-100">{t("DealToday")}</h5>
          <p className="mt-1 text-content">{t("Recommendeddealsforyou")}.</p>
        </div>
        <Btn type="button" className="btn-close" onClick={() => setModal(false)}></Btn>
      </ModalHeader>
      <ModalBody>
        {filteredProduct?.filter((elem) => themeOption?.header?.today_deals?.includes(elem?.id))?.length > 0 ? (
          <div className="deal-offer-box">
            <ul className="deal-offer-list">
              {filteredProduct
                ?.filter((elem) => themeOption?.header?.today_deals?.includes(elem?.id))
                .map((result, i) => (
                  <li className="list-1" key={i}>
                    <div className="deal-offer-contain">
                      <Link href={`/product/${result?.slug}`} className="deal-image">
                        <Avatar data={result?.product_thumbnail} placeHolder={placeHolderImage} name={result?.name} height={80} width={80} />
                      </Link>

                      <Link href={`/product/${result?.slug}`} className="deal-contain">
                        <h5>{result?.name}</h5>
                        <h6>
                          {convertCurrency(result?.sale_price)}
                          {result.discount || result?.price ? <del>{convertCurrency(result?.price)}</del> : null}
                          <span>{result?.unit}</span>
                        </h6>
                      </Link>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <NoDataFound
            data={{
              customClass: "bg-light no-data-added",
              title: "No Product Found",
            }}
          />
        )}
      </ModalBody>
    </CustomModal>
  );
};

export default HeaderDealModal;
