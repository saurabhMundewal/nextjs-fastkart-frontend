"use client";
import Breadcrumb from "@/Components/Common/Breadcrumb";
import WrapperComponent from "@/Components/Common/WrapperComponent";
import request from "@/Utils/AxiosUtils";
import { BlogAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import BlogCardDetails from "../BlogCardDetails";
import Sidebar from "../Sidebar/Sidebar";

const SingleBlog = ({ params }) => {
  const router = useRouter();
  const { data: Blog, isLoading, refetch } = useQuery([params], () => request({ url: `${BlogAPI}/slug/${params}` }, router), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });
  return (
    <>
      <Breadcrumb title={Blog?.title} subNavigation={[{ name: "Blogs", link: "/blogs" }, { name: Blog?.title }]} />
      <WrapperComponent classes={{ sectionClass: "blog-section section-b-space", row: "g-4" }} customCol={true}>
        <BlogCardDetails Blog={Blog} key={params} />
        <Sidebar />
      </WrapperComponent>
    </>
  );
};

export default SingleBlog;
