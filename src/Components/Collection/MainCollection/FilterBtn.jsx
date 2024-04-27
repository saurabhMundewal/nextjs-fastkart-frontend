import { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { useTranslation } from "react-i18next";
import { RiFilter2Fill } from 'react-icons/ri';

const FilterBtn = ({ isOffcanvas }) => {
  const { t } = useTranslation( 'common');
  const { openOffCanvas, setOpenOffCanvas } = useContext(ThemeOptionContext);
  return (
    <>
      {isOffcanvas && (
        <div className='sidebar-filter-menu'>
          <a onClick={() => setOpenOffCanvas(!openOffCanvas)}>
            <RiFilter2Fill /> {t('FilterMenu')}
          </a>
        </div>
      )}
    </>
  );
};

export default FilterBtn;
