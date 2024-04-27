import React, { useContext, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import Image from 'next/image';
import ProductRating from '@/Components/Common/ProductBox/Widgets/ProductRating';
import SellerContext from '@/Helper/SellerContext';

const TopSeller = ({ classes = {}, dataAPI, spaceClass, paddingClass }) => {
    const { t } = useTranslation('common');
    const { filterStore,setGetSellerIds, isLoading } = useContext(SellerContext);
    useEffect(() => {
        if (dataAPI?.length > 0) {
            setGetSellerIds({
                ids: Array.from(new Set(dataAPI))?.join(","),
            });
        }
    }, [dataAPI,setGetSellerIds]);
    return (
        <>
            <div className={`brand-section ${spaceClass} ${paddingClass}` }>
                {/* <div className="brand-row ">
                    <div className="row g-sm-4 g-3 row-cols-xxl-6 row-cols-lg-5 row-cols-md-3 row-cols-2">
                        {filterStore?.map((store, i) => (
                            <div className="col" key={i}>
                                <Link href={`/seller/store/${ store.slug}`}>
                                    {store?.store_logo &&
                                        <Image src={store?.store_logo?.original_url} className="img-fluid" alt={store?.store_name} height={70} width={70} />
                                    }
                                    <h5>{store?.store_name}</h5>
                                    <div className="product-rating">
                                        <ProductRating totalRating={store?.rating_count || 0} />
                                        <span>({Number(store?.rating_count).toFixed(0)})</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default TopSeller;
