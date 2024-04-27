import React, { useContext } from 'react';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import { FiMail, FiPhone } from 'react-icons/fi';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import appstoreImage from '../../../../public/assets/images/appstore.svg';
import playstoreImage from '../../../../public/assets/images/playstore.svg';


const FooterContact = () => {
    const { themeOption } = useContext(ThemeOptionContext);
    const { t } = useTranslation('common');

    return (
        <div className='footer-contact'>
            <ul>
                {themeOption?.footer?.support_number && (
                    <li>
                        <div className='footer-number'>
                            <FiPhone />
                            <div className='contact-number'>
                                <h6 className=''>{t("Hotline")}  24/7 :</h6>
                                <h5  className='text-content-white'>{themeOption?.footer?.support_number}</h5>
                            </div>
                        </div>
                    </li>
                )}
                {themeOption?.footer?.support_email && (
                    <li>
                        <div className='footer-number'>
                            <FiMail />
                            <div className='contact-number'>
                                <h6 className='text-content-white'>{t("EmailAddress")} :</h6>
                                <h5 className='text-content-white'>{themeOption?.footer?.support_email}</h5>
                            </div>
                        </div>
                    </li>
                )}
                {themeOption?.footer?.app_store_url != null  || themeOption?.footer?.play_store_url  !== null ? (
                    <li className='social-app mb-0'>
                        <h5 className='mb-2 text-content-white'>{t('DownloadApp')} :</h5>
                        <ul>
                            {themeOption?.footer?.play_store_url != null &&  (
                                <li className='mb-0'>
                                        <Link href={themeOption?.footer?.play_store_url} target='_blank'>
                                            {playstoreImage && <Image src={playstoreImage} alt='play store' height={100} width={100} />}
                                        </Link>
                                </li>
                            )}
                            {themeOption?.footer?.app_store_url != null && (
                                <li className='mb-0'>
                                        <Link href={themeOption?.footer?.app_store_url} target='_blank'>
                                            {appstoreImage && <Image src={appstoreImage} alt='app store' height={100} width={100} />}
                                        </Link>
                                </li>
                            )}
                        </ul>
                    </li>
                ) : (
                    ''
                )}
            </ul>
        </div>
    );
};

export default FooterContact;
