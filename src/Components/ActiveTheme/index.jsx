"use client";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ThemeAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import Berlin from "../../Components/Themes/Berlin/index";
import Cairo from "../../Components/Themes/Cairo/index";
import Denver from "../../Components/Themes/Denver/index";
import Madrid from "../../Components/Themes/Madrid/index";
import Moscow from "../../Components/Themes/Moscow/index";
import Osaka from "../../Components/Themes/Osaka/index";
import Paris from "../../Components/Themes/Paris/index";
import Rome from "../../Components/Themes/Rome/index";
import Tokyo from "../../Components/Themes/Tokyo/index";

const ActiveTheme = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery([ThemeAPI], () => request({ url: ThemeAPI }, router), { enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data.data });
  const search = useSearchParams();
  const themeBySlug = search.get("theme");
  const { setIsCairoThemeActive } = useContext(ThemeOptionContext);
  const checkActive = {
    paris: <Paris />,
    tokyo: <Tokyo />,
    osaka: <Osaka />,
    rome: <Rome />,
    madrid: <Madrid />,
    berlin: <Berlin />,
    denver: <Denver />,
    cairo: <Cairo />,
    moscow: <Moscow />,
  };
  const activeTheme = data?.find((elem) => elem.status === 1);

  useEffect(() => {
    const activeTheme = data?.find((elem) => elem.status === 1);
    activeTheme?.slug === "cairo" ? setIsCairoThemeActive(true) : setIsCairoThemeActive(false);
  }, [data]);

  if (isLoading) return <Loader />;
  return themeBySlug ? checkActive[themeBySlug] : checkActive[activeTheme?.slug];
};

export default ActiveTheme;
