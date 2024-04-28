import request from "@/Utils/AxiosUtils";
import { OrderStatusAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cancelledImage from "../../../../../public/assets/images/svg/tracking/cancelled.svg";
import deliveredImage from "../../../../../public/assets/images/svg/tracking/delivered.svg";
import outfordeliveryImage from "../../../../../public/assets/images/svg/tracking/out-for-delivery.svg";
import pendingImage from "../../../../../public/assets/images/svg/tracking/pending.svg";
import processingImage from "../../../../../public/assets/images/svg/tracking/processing.svg";
import shippedImage from "../../../../../public/assets/images/svg/tracking/shipped.svg";

const DetailStatus = ({ data }) => {
  const router = useRouter();
  const { data: orderStatus } = useQuery([OrderStatusAPI], () => request({ url: OrderStatusAPI }, router), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  const imageObj = {
    processing: processingImage,
    pending: pendingImage,
    shipped: shippedImage,
    delivered: deliveredImage,
    outfordelivery: outfordeliveryImage,
    cancelled: cancelledImage,
  };
  return (
    <div className="mb-4">
      <div className="tracking-panel">
      {console.log("data==>", data)}
        {data && !data?.sub_orders?.length ? (
          
          <ul>
          {orderStatus?.length > 0
            ? orderStatus?.map((elem, index) => {
              elem = elem;
              const isCancelled = (elem?.sequence >= data?.order_status?.sequence && data?.order_status?.slug === 'cancelled') || elem?.slug === 'cancelled'  || (data?.is_digital_only &&
                  (elem?.slug == 'shipped' ||
                  elem?.slug == 'out-for-delivery'));
              const isActive = elem?.sequence <= data?.order_status?.sequence;
              return (
                <li className={`${isCancelled ? "d-none" : ""} ${isActive ? "active" : ""}`} key={index}>
                  <div className="panel-content">
                    <div className="icon">{elem?.slug && <Image src={elem?.slug == "out-for-delivery" ? imageObj["outfordelivery"] : imageObj[elem?.slug]} className="img-fluid" alt={elem?.slug} height={40} width={40} />}</div>
                    <div className="status">{elem?.name?.replace("_", " ")}</div>
                  </div>
                </li>
              )}
              )
            : null}
            {data?.order_status?.slug == "cancelled" ? (
              <li className="active cancelled-box">
                <div className="panel-content">
                  <div className="icon">{imageObj[data?.order_status?.slug] && <Image src={imageObj[data?.order_status?.slug] || cancelledImage} className="img-fluid" alt="image" height={40} width={40} />}</div>
                  <div className="status">{data?.order_status.name.replace("_", " ")}</div>
                </div>
              </li>
            ) : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default DetailStatus;
