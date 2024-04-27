"use client";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ThemeAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Paris from "../../Components/Themes/Paris/index";
import Tokyo from "../../Components/Themes/Tokyo/index";
import Osaka from "../../Components/Themes/Osaka/index";
import Rome from "../../Components/Themes/Rome/index";
import Madrid from "../../Components/Themes/Madrid/index";
import Berlin from "../../Components/Themes/Berlin/index";
import Denver from "../../Components/Themes/Denver/index";
import Cairo from "../../Components/Themes/Cairo/index";
import Moscow from "../../Components/Themes/Moscow/index";
import { useContext, useEffect } from "react";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";


const ActiveTheme = () => {
  const { data, isLoading } = useQuery([ThemeAPI],() => request({ url: ThemeAPI }),{enabled: true,refetchOnWindowFocus: false,select: (res) => res?.data.data,});
  const search = useSearchParams();
  const themeBySlug = search.get("theme");
  const {setIsCairoThemeActive} =useContext(ThemeOptionContext)
  const checkActive = {
    paris: <Paris />,
    tokyo: <Tokyo />,
    osaka: <Osaka />,
    rome: <Rome />,
    madrid: <Madrid />,
    berlin: <Berlin />,
    denver: <Denver />,
    cairo: <Cairo />,
    // cairo: <CairoTheme />,
    moscow: <Moscow />
  };
  const activeTheme = data?.find((elem) => elem.status === 1);
  
  useEffect(() => {
    const activeTheme = data?.find((elem) => elem.status === 1);
    activeTheme?.slug === "cairo" ? setIsCairoThemeActive(true):setIsCairoThemeActive(false)
  }, [data])
  
  if (isLoading) return <Loader />;
  return themeBySlug
  ? checkActive[themeBySlug]
  : checkActive[activeTheme?.slug];
};

export default ActiveTheme;
