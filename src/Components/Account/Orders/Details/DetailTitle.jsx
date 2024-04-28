import { useContext, useState } from 'react';
import Link from 'next/link';
import { RiDownload2Fill, RiRefreshLine } from 'react-icons/ri';
import { useTranslation } from "react-i18next";
import PaynowModal from './PaynowModal';
import { OrderInvoiceAPI } from '@/Utils/AxiosUtils/API';
import { useQuery } from '@tanstack/react-query';
import useCreate from '@/Utils/Hooks/useCreate';

const DetailTitle = ({ params, data }) => {
  const [modal, setModal] = useState(false);
  const { t } = useTranslation('common');

  const { mutate: InvoiceMutate, isLoading } = useCreate(OrderInvoiceAPI, false, false, "Downloaded Successfully", (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
          const blob = new Blob([resDta?.data], { type: `invoice-${data?.order_number}.pdf` });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `invoice-${data?.order_number}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
      }
  }, false, 'blob')

  return (
    <>
      <div className='title-header'>
        <div className='d-flex align-items-center flex-wrap gap-2'>
          <h5>{`${t('OrderNumber')}: #${params}`}</h5>
          <div className='right-option'>
            {(data?.payment_status === 'FAILED' || data?.payment_status === 'PENDING') && data?.order_status && data?.order_status?.slug != 'cancelled' && data?.payment_method != 'cod' && (
              <a className='btn btn-md fw-bold text-light theme-bg-color' onClick={() => setModal(true)}>
                {t('PayNow')}
                <RiRefreshLine className='ms-2' />
              </a>
            )}
            {data?.invoice_url && data?.payment_status && data?.payment_status === 'COMPLETED' && (
              <div onClick={() => InvoiceMutate()} className='btn btn-md fw-bold text-light theme-bg-color ms-auto'>
                {t('Invoice')} <RiDownload2Fill className='ms-2' />
              </div>
            )}
          </div>
        </div>
      </div>
      <PaynowModal modal={modal} setModal={setModal} params={params} />
    </>
  );
};

export default DetailTitle;
