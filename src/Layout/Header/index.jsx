"use client";
import ThemeOptionContext from "@/Helper/ThemeOptionsContext";
import {  useSearchParams } from "next/navigation";
import { useContext, useMemo } from "react";
import { headerOptionsMap } from "../../../Data/LayoutData";
import StandardHeader from "./StandardHeader";
import MinimalHeader from "./MinimalHeader";
import BasicHeader from "./BasicHeader";
import ClassicHeader from "./ClassicHeader";

const MainHeader = () => {
  const path = useSearchParams()
  const theme = path.get('theme')
  const { themeOption ,isCairoThemeActive } = useContext(ThemeOptionContext);

  const headerList = {
    basic_header: <BasicHeader extraClass={theme == "tokyo" ? true : ""} headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive ? "header-gradient":""}/>,
    classic_header: <ClassicHeader  headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive ? "header-gradient":""}/>,
    minimal_header: <MinimalHeader headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive ? "header-gradient":""}/>,
    standard_header: <StandardHeader  headerClass={theme == 'cairo' ? 'header-gradient' : isCairoThemeActive ? "header-gradient":""}/>,
  };

  const showHeader = useMemo(() => {
    return headerOptionsMap[theme] || themeOption?.header?.header_options;
  }, [theme, themeOption?.header?.header_options]);
  
  return headerList[showHeader] || <ClassicHeader />
};  

export default MainHeader;