"use client";
import AccountProvider from "@/Helper/AccountContext/AccountProvider";
import BlogProvider from "@/Helper/BlogContext/BlogProvider";
import BrandProvider from "@/Helper/BrandContext/BrandProvider";
import CartProvider from "@/Helper/CartContext/CartProvider";
import CategoryProvider from "@/Helper/CategoryContext/CategoryProvider";
import CompareProvider from "@/Helper/CompareContext/CompareProvider";
import CurrencyProvider from "@/Helper/CurrencyContext/CurrencyProvider";
import TaxProvider from "@/Helper/TaxContext/TaxProvider";
import ProductProvider from "@/Helper/ProductContext/ProductProvider";
import ProductIdsProvider from "@/Helper/ProductIdsContext/ProductIdsProvider";
import SellerProvider from "@/Helper/SellerContext/SellerProvider";
import SettingProvider from "@/Helper/SettingContext/SettingProvider";
import ThemeOptionProvider from "@/Helper/ThemeOptionsContext/ThemeOptionProvider";
import WishlistProvider from "@/Helper/WishlistContext/WishlistProvider";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SubLayout from "./SubLayout";
import BrandIdsProvider from "@/Helper/BrandIdsContext/BrandIdsProvider";
import BlogIdsProvider from "@/Helper/BlogIdsContext/BlogIdsProvider";

const MainLayout = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("version=1.0.0")
  }, [])
  
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={children.dehydratedState}>
          <ThemeOptionProvider>
            <AccountProvider>
              <SellerProvider>
                <BrandProvider>
                  <BlogProvider>
                    <ProductIdsProvider>
                      <CompareProvider>
                      <TaxProvider>
                        <CartProvider>
                          <WishlistProvider>
                            <CategoryProvider>
                              <ProductProvider>
                                <SettingProvider>
                                  <CurrencyProvider>                                    
                                    <BrandIdsProvider>
                                    <BlogIdsProvider>
                                      <SubLayout children={children} />
                                    </BlogIdsProvider>
                                    </BrandIdsProvider>                                    
                                  </CurrencyProvider>
                                </SettingProvider>
                              </ProductProvider>
                            </CategoryProvider>
                          </WishlistProvider>
                        </CartProvider>
                        </TaxProvider>
                      </CompareProvider>
                    </ProductIdsProvider>
                  </BlogProvider>
                </BrandProvider>
              </SellerProvider>
            </AccountProvider>
          </ThemeOptionProvider>
        </Hydrate>
      </QueryClientProvider>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
};

export default MainLayout;
