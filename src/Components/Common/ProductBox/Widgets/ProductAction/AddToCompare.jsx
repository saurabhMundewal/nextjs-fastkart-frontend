import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useCreate from '@/Utils/Hooks/useCreate';
import { CompareAPI } from '@/Utils/AxiosUtils/API';
import CompareContext from '@/Helper/CompareContext';
import Btn from '@/Elements/Buttons/Btn';
import { RiRefreshLine } from 'react-icons/ri';
import { useCustomSearchParams } from '@/Utils/Hooks/useCustomSearchParams';

const AddToCompare = ({ productObj, customClass, hideAction }) => {
  const [category,brand, attribute, price, rating, sortBy, field, layout,theme] = useCustomSearchParams(["category" , "brand", "attribute", "price", "rating", "sortBy", "field", "layout","theme"]);
  const { compareState, setCompareState } = useContext(CompareContext);
  const cookieUAT = Cookies.get('uat');
  const router = useRouter();
  const pathname = usePathname();
  const { data, mutate, isLoading } = useCreate(CompareAPI, false, false, 'Added to Compare List');
  const addToCompare = (productObj) => {
    if (!cookieUAT) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, ...category ,...theme }).toString();
       const sendPath = `${pathname}?${queryParams}`
       Cookies.set('CallBackUrl', sendPath);
       Cookies.set('compareId', productObj?.id);
      router.push("/auth/login");
    } else {
      mutate({ product_id: productObj?.id });
    }
  };
  useEffect(() => {
    if (data?.status == 200 || data?.status == 201) {
      setCompareState([...compareState, productObj]);
    }
  }, [isLoading]);
  return (
    <>
      {customClass ? (
        <Btn className={customClass ?? ''} onClick={() => addToCompare(productObj)}>
          <RiRefreshLine />
        </Btn>
      ) : (
        !hideAction?.includes('compare') &&
        <li title='Compare' onClick={() => addToCompare(productObj)}>
          <a>
            <RiRefreshLine />
          </a>
        </li>
      )}
    </>
  );
};

export default AddToCompare;
