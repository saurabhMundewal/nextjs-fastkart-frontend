import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import BasicFooter from "../BasicFooter";
import Image from "next/image";
import useCreate from "@/Utils/Hooks/useCreate";
import { SubscribeAPI } from "@/Utils/AxiosUtils/API";
import { Field, Formik } from "formik";
import { Form } from "reactstrap";
import Btn from "@/Elements/Buttons/Btn";
import { RiMailLine } from "react-icons/ri";

const SubscribeFooter = () => {
    const { t } = useTranslation("common");
    const { themeOption } = useContext(ThemeOptionContext);
    const { mutate, isLoading } = useCreate(SubscribeAPI, false, false, 'No', (resDta) => ToastNotification("success", resDta?.data?.message));
    const getText = (text) => {
        const words = text?.split(" ");
        const firstTwoWords = words?.slice(0, 2).join(" ");
        const remainingText = words?.slice(2).join(" ");
        return (<h2>{firstTwoWords} <span>{remainingText}</span></h2>);
    };
    return (
        <>
            <Image src={themeOption?.footer ? themeOption?.footer?.bg_image : ''} className="footer-image img-fluid" alt="" width={1905} height={830} />
            <div className="container-fluid-lg">
                <div className="footer-newsletter section-b-space">
                    <div className="newsletter-detail">
                        {getText(themeOption?.footer?.title)}
                        <h5>{themeOption?.footer?.sub_title}</h5>
                        <Formik
                            initialValues={{ email: '' }}
                            onSubmit={(values, { resetForm }) => { mutate(values, { onSuccess: () => { resetForm(); }, }); }}
                        >
                            {({ values, errors, touched, setFieldValue }) => (
                                <Form>
                                    <div className='input-box input-group'>
                                        <Field type='email' placeholder='Enter Your Email' name="email" className="form-control" />
                                        {/* <div className="mail-icon">
                                            <RiMailLine />
                                        </div> */}
                                        <Btn className='sub-btn'>
                                            <span>{t('Subscribe')}</span>
                                            {/* <i className="fa-solid fa-arrow-right icon" /> */}
                                        </Btn>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

            </div>
            <BasicFooter />
        </>
    );
};

export default SubscribeFooter;
