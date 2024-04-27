import { useContext } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Input } from 'reactstrap';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import CustomHeading from '@/Components/Common/CustomHeading';
import { bankOfferSliderOption } from '../../../../../Data/SliderSettingsData';
import Btn from '@/Elements/Buttons/Btn';

import { useTranslation } from "react-i18next";

const BankOfferData = ({ dataAPI }) => {
  
  const { t } = useTranslation( 'common');
  const CopyCode = (value) => {
    navigator.clipboard.writeText(value);
  };
  return (
    <WrapperComponent classes={{ sectionClass: 'bank-section overflow-hidden' }} noRowCol={true}>
      <CustomHeading title={dataAPI?.title} customClass={'section-t-space'} customTitleClass={'title'} />
      <div className='slider-bank-3 arrow-slider slick-height bank-box'>
        <Slider {...bankOfferSliderOption}>
          {dataAPI?.offers?.map((offer, i) => (
            <div key={i}>
              <div className='bank-offer'>
                <div className='bank-left'>
                  {offer?.image_url &&<Image src={offer?.image_url} className='img-fluid w-100' alt='bank-image' height={225} width={515} />}
                </div>

                <div className='bank-footer bank-footer-1'>
                  <h4>
                    {t('Code')} :
                    <Input defaultValue={offer?.coupon_code} />
                  </h4>
                  <Btn type='button' className='bank-coupon' onClick={() => CopyCode(offer.coupon_code)}>
                    {t('CopyCode')}
                  </Btn>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </WrapperComponent>
  );
};

export default BankOfferData;
