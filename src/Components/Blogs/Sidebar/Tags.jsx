"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";

import NoDataFound from "@/Components/Common/NoDataFound";
import request from "@/Utils/AxiosUtils";
import { TagAPI } from "@/Utils/AxiosUtils/API";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Tags = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  // Get Tag Data
  const { data: BlogTagData, isLoading } = useQuery([TagAPI], () => request({ url: TagAPI, params: { type: "post" } }, router), {
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data.data.data,
  });

  return (
    <AccordionItem>
      <AccordionHeader targetId="3">{t("ProductTags")}</AccordionHeader>
      <AccordionBody accordionId="3" className="pt-0">
        <div className="product-tags-box">
          {BlogTagData?.length > 0 ? (
            <ul>
              {BlogTagData?.map((tags, index) => (
                <li key={index}>
                  <Link href={{ pathname: `/blogs`, query: { tag: tags?.slug } }}>{tags.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            <NoDataFound data={{ customClass: "bg-light no-data-added", title: "No Blog Found" }} />
          )}
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default Tags;
