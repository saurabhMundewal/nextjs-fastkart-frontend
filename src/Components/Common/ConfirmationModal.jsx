import { useContext } from 'react';
import { RiQuestionLine } from 'react-icons/ri';
import { useTranslation } from "react-i18next";
import Btn from '@/Elements/Buttons/Btn';
import CustomModal from './CustomModal';

const ConfirmationModal = ({ modal, setModal, isLoading, confirmFunction }) => {
  const { t } = useTranslation( 'common');
  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'theme-modal delete-modal', modalHeaderClass: 'p-0' }}>
      <RiQuestionLine className='icon-box wo-bg' />
      <h5 className='modal-title'>{t('Confirmation')}</h5>
      <p>{t('AreYouSure')} </p>
      <div className='button-box'>
        <Btn title='No' className='btn btn-md btn-theme-outline fw-bold' onClick={() => setModal('')} />
        <Btn title='Yes' className='theme-bg-color btn-md fw-bold text-light' loading={Number(isLoading)} onClick={confirmFunction} />
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
