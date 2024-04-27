'use client';
import { useQuery } from '@tanstack/react-query';
import { BlogAPI } from '@/Utils/AxiosUtils/API';
import request from '@/Utils/AxiosUtils';import Breadcrumb from '../Common/Breadcrumb';
import BlogCard from './BlogCard';
import Sidebar from './Sidebar/Sidebar';
import WrapperComponent from '../Common/WrapperComponent';
import { useSearchParams } from 'next/navigation';
import Loader from '@/Layout/Loader';
import { useEffect, useState } from 'react';

const BlogDetail = () => {
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const querySearchCategory = searchParams?.get('category');
  const querySearchTag = searchParams?.get('tag');
  const breadcrumbTitle = querySearchCategory ? `Blogs:${querySearchCategory}` : querySearchTag ? `Blogs:${querySearchTag}` : 'Blogs';
  const {data: BlogData,isLoading,refetch,} = useQuery([BlogAPI, querySearchCategory, querySearchTag], () => request({ url: BlogAPI, params: {  page, paginate: 9 , category: querySearchCategory ?? '', tag: querySearchTag ?? '' } }), {enabled: false,refetchOnWindowFocus: false,select: (res) => res?.data,});
  useEffect(() => {
     refetch();
  }, [page, querySearchCategory, querySearchTag]);
  if (isLoading) {return <Loader/>}

  return (
    <>
      <Breadcrumb title={breadcrumbTitle} subNavigation={[{ name: 'Blog', link: '/blogs' }]} />
      <WrapperComponent classes={{ sectionClass: 'blog-section section-b-space', row: 'g-4' }} customCol={true}>
        <BlogCard page={page} setPage={setPage} BlogData={BlogData} isLoading={isLoading} refetch={refetch}  />
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default BlogDetail;
