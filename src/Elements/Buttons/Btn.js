import { useContext } from "react";
import { Button } from "reactstrap";

import { useTranslation } from "react-i18next";

const Btn = (props) => {
  
  const { t } = useTranslation( 'common');
  return (
    <Button {...props}>
      {props.loading ?
        <div className={`d-flex position-relative${props.loading ? " spinning" : ""}`}>
          {props.children}
          {t(props.title)}
        </div> :
        <>
          {props.children}
          {t(props.title)}
        </>
      }
    </Button>
  );
};
export default Btn;
