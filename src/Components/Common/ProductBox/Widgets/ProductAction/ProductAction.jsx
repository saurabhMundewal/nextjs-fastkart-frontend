import QuickView from '../../Widgets/ProductAction/QuickView';
import AddToWishlist from '../../Widgets/ProductAction/AddToWishlist';
import AddToCompare from '../../Widgets/ProductAction/AddToCompare';

const ProductBoxAction = ({ productObj,listClass, actionsToHide}) => {
  return (
    <ul className={listClass}>
      <QuickView productObj={productObj} />
      <AddToCompare productObj={productObj} />
      <AddToWishlist productObj={productObj} hideAction={actionsToHide}/>
    </ul>
  );
};

export default ProductBoxAction;
