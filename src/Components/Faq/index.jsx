"use client";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { FaqAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, Container, Row } from "reactstrap";
import emptyImage from "../../../public/assets/svg/no-product.svg";
import Breadcrumb from "../Common/Breadcrumb";
import NoDataFound from "../Common/NoDataFound";

const BrowserFaq = () => {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(0);
  const router = useRouter();

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const { data, isLoading } = useQuery([FaqAPI], () => request({ url: FaqAPI, params: { status: 1 } }, router), {
    enabled: true,
    refetchOnWindowFocus: false,
    select: (data) => data?.data?.data,
  });

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={`Faq's`} subNavigation={[{ name: `Faq's` }]} />
      {data?.length > 0 ? (
        <section className="faq-box-contain section-b-space">
          <Container>
            <Row>
              <Col xl={5}>
                <div className="faq-contain">
                  <h2>{t("FrequentlyAskedQuestions")}</h2>
                  <p>{t("faqDescription")}</p>
                </div>
              </Col>
              <Col xl={7}>
                <div className="faq-accordion">
                  <Accordion open={open} toggle={toggle}>
                    {data?.map((faq, i) => (
                      <AccordionItem key={i}>
                        <AccordionHeader targetId={i}>
                          {faq?.title}
                          {open == i ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
                        </AccordionHeader>
                        <AccordionBody accordionId={i}>
                          <p>{faq?.description}</p>
                        </AccordionBody>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <NoDataFound
          data={{
            customClass: "no-data-added",
            imageUrl: emptyImage,
            title: "No FAQ Found",
            description: "I regret to inform you that the FAQ is currently unavailable.",
            height: 300,
            width: 300,
          }}
        />
      )}
    </>
  );
};

export default BrowserFaq;
