'use client';
import AccountProvider from '@/Helper/AccountContext/AccountProvider';
import BlogProvider from '@/Helper/BlogContext/BlogProvider';
import BrandProvider from '@/Helper/BrandContext/BrandProvider';
import CartProvider from '@/Helper/CartContext/CartProvider';
import CategoryProvider from '@/Helper/CategoryContext/CategoryProvider';
import CompareProvider from '@/Helper/CompareContext/CompareProvider';
import CurrencyProvider from '@/Helper/CurrencyContext/CurrencyProvider';
import ProductProvider from '@/Helper/ProductContext/ProductProvider';
import ProductIdsProvider from '@/Helper/ProductIdsContext/ProductIdsProvider';
import SellerProvider from '@/Helper/SellerContext/SellerProvider';
import SettingProvider from '@/Helper/SettingContext/SettingProvider';
import ThemeOptionProvider from '@/Helper/ThemeOptionsContext/ThemeOptionProvider';
import WishlistProvider from '@/Helper/WishlistContext/WishlistProvider';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import SubLayout from './SubLayout';


const MainLayout = ({ children }) => {
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
                        <CartProvider>
                          <WishlistProvider>
                          <CategoryProvider>
                            <ProductProvider>
                              <SettingProvider>
                                <CurrencyProvider>
                                  <SubLayout children={children} />
                                </CurrencyProvider>
                              </SettingProvider>
                            </ProductProvider>
                          </CategoryProvider>
                          </WishlistProvider>
                        </CartProvider>
                      </CompareProvider>
                    </ProductIdsProvider>
                  </BlogProvider>
                </BrandProvider>
              </SellerProvider>
            </AccountProvider>
          </ThemeOptionProvider>
        </Hydrate>
      </QueryClientProvider>
      <ToastContainer autoClose={2000}  theme='colored' />
    </>
  );
};

export default MainLayout;
