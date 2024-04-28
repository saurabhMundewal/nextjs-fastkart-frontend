"use client";

import CategoryMainPage from "@/Components/category";

const categorySlugPage = ({ params }) => {
  return <CategoryMainPage slug={params?.categorySlug} />;
};

export default categorySlugPage;
