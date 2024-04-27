import Loader from '@/Layout/Loader';
import request from '@/Utils/AxiosUtils';
import { TrackingAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import TitleDetails from './Common/TitleDetails';
import StatusDetail from './Common/StatusDetails';
import TableDetails from './Common/TableDetails';
import ConsumerDetails from './Common/ConsumerDetails';
import SubTable from './Common/SubTable';

const TrackOrderDetails = ({ orderNumber, emailPhone }) => {
  const { data, isLoading, refetch } = useQuery([TrackingAPI], () => request({ url: TrackingAPI, params: { order_number: orderNumber, email_or_phone: emailPhone } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  if (isLoading) return <Loader />;
  return (
    <>
      <TitleDetails params={orderNumber} data={data} />
      <StatusDetail data={data} />
      <TableDetails data={data} />
      <ConsumerDetails data={data} />
      {data?.sub_orders?.length ? <SubTable data={data?.sub_orders} />: null }
    </>
  );
};

export default TrackOrderDetails;
