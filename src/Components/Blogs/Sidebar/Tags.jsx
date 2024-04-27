'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';

import request from '@/Utils/AxiosUtils';
import { TagAPI } from '@/Utils/AxiosUtils/API';
import { useTranslation } from "react-i18next";
import NoDataFound from '@/Components/Common/NoDataFound';

const Tags = () => {
  
  const { t } = useTranslation( 'common');
  // Get Tag Data
  const { data: BlogTagData, isLoading } = useQuery([TagAPI], () => request({ url: TagAPI, params: { type: 'post' } }), {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data.data.data,
  });

  return (
    <AccordionItem>
      <AccordionHeader targetId='3'>{t('ProductTags')}</AccordionHeader>
      <AccordionBody accordionId='3' className='pt-0'>
        <div className='product-tags-box'>
          {BlogTagData?.length > 0 ? (
            <ul>
              {BlogTagData?.map((tags, index) => (
                <li key={index}>
                  <Link href={{ pathname: `/blogs`, query: { tag: tags?.slug } }}>{tags.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <NoDataFound data={{ customClass: 'bg-light no-data-added', title: 'No Blog Found' }} />
          )}
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default Tags;
