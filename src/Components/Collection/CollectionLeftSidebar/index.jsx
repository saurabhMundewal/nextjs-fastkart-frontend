import { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import WrapperComponent from '@/Components/Common/WrapperComponent';
import OfferBanner from '@/Components/ParisTheme/OfferBanner';
import CollectionSidebar from '../CollectionSidebar';
import MainCollection from '../MainCollection';

const CollectionLeftSidebar = ({ filter, setFilter ,hideCategory ,categorySlug }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <>
      {
        !hideCategory &&
        <WrapperComponent colProps={{ xs: 12 }}>
        {themeOption?.collection?.collection_banner_image_url && (
          <OfferBanner classes={{ customHoverClass: 'banner-contain hover-effect' }} imgUrl={themeOption?.collection?.collection_banner_image_url} />
        )}
      </WrapperComponent>
      }      
      <WrapperComponent classes={{ sectionClass: 'section-b-space shop-section' }} customCol={true}>
         <CollectionSidebar filter={filter} setFilter={setFilter}  hideCategory  />
         <MainCollection filter={filter} setFilter={setFilter} categorySlug={categorySlug} />
      </WrapperComponent>
    </>
  );
};

export default CollectionLeftSidebar;
