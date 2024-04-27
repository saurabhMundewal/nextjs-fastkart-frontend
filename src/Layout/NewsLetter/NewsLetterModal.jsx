import CustomModal from '@/Components/Common/CustomModal';
import Btn from '@/Elements/Buttons/Btn';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Form, Input, InputGroup, ModalHeader } from 'reactstrap';

const NewsLetterModal = ({ dataApi, headerLogo }) => {
  const [modal, setModal] = useState(true);
  useEffect(() => {
    const newsLetterModal = Cookies.get('newsLetterModal');
    if (newsLetterModal) {
      setModal(false);
    }
  }, []);
  const extraFunction = () => {
    Cookies.set('newsLetterModal', JSON.stringify(true));
    setModal(false);
  };
  return (
    <>
      <CustomModal extraFunction={extraFunction} modal={modal} setModal={setModal} classes={{ customChildren: true, modalClass: 'modal-lg newsletter-modal theme-modal' }}>
        <ModalHeader className='p-0' toggle={extraFunction} />
        <div className='modal-box'>
          <div className='modal-image'>
            {dataApi?.image_url && <Image src={dataApi?.image_url} className='img-fluid' alt='NewsLetter Image' width={400} height={361} />}
          </div>
          <div className='modal-content content-padding'>
            <div>
              {headerLogo && <Image src={headerLogo} className='modal-logo' alt='newsletter' height={17} width={100} />}
              <h2>
                {dataApi?.offer}% <span>off</span>
              </h2>
              <h5>{dataApi?.title}</h5>
              <p>{dataApi?.description}</p>
              <Form className='modal-form'>
                <InputGroup className='modal-form-box'>
                  <Input type='email' placeholder='Your email here' />
                  <Btn className='input-group-text' type='button' title='Submit' onClick={() => setModal(false)} />
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default NewsLetterModal;
