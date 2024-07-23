import React, { useContext, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { LogoutAPI } from "@/Utils/AxiosUtils/API";
import { useRouter } from "next/navigation";
import useCreate from "@/Utils/Hooks/useCreate";
import { RiLogoutBoxRLine, RiUserLine } from "react-icons/ri";
import ConfirmationModal from "@/Components/Common/ConfirmationModal";
import Avatar from "@/Components/Common/Avatar";
import AccountContext from "@/Helper/AccountContext";

const HeaderProfile = ({ extraClass }) => {
  const router = useRouter();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [modal, setModal] = useState(false);
  const isAuthenticated = Cookies.get("uaf");
  const { t } = useTranslation("common");
  const { mutate, isLoading } = useCreate(LogoutAPI, false, false, "No", () => {
    setAccountData();
    Cookies.remove("uaf");
    Cookies.remove("ue");
    Cookies.remove("account");
    Cookies.remove("CookieAccept");
    localStorage.removeItem("account");
    localStorage.removeItem("role");
    router.push(`/auth/login`);
    setModal(false);
  });

  const handleLogout = () => {
    mutate({});
  };
  return (
    <li className="right-side onhover-dropdown">
      <div className="delivery-login-box">
        <div className={`delivery-icon ${extraClass ? extraClass : ""}`}>
          {accountData?.profile_image?.original_url ? (
            <Avatar
              data={accountData?.profile_image}
              customeClass="user-box me-2"
              customImageClass="img-fluid"
            />
          ) : accountData?.name ? (
            <div className="user-box">
              <h3>{accountData?.name?.charAt(0)?.toString()?.toUpperCase()}</h3>
            </div>
          ) : (
            <RiUserLine />
          )}
        </div>
        <div className="delivery-detail">
          <h6>
            {" "}
            {t("Hi")}, {accountData?.name ?? t("Guest")}
          </h6>
          <h5>{t("MyAccount")}</h5>
        </div>
      </div>

      <div className="onhover-div onhover-div-login">
        <ul className="user-box-name">
          {isAuthenticated ? (
            <>
              <li className="product-box-contain">
                <Link href={`/account/dashboard`}>
                  <RiUserLine className="me-2" /> {t("MyAccount")}
                </Link>
              </li>
              <li
                className="product-box-contain"
                onClick={() => setModal(true)}
              >
                <a>
                  <RiLogoutBoxRLine className="me-2" /> {t("Logout")}
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="product-box-contain">
                <Link href={`/auth/login`}>{t("LogIn")}</Link>
              </li>

              <li className="product-box-contain">
                <Link href={`/auth/register`}>{t("Register")}</Link>
              </li>
            </>
          )}
          <ConfirmationModal
            modal={modal}
            setModal={setModal}
            confirmFunction={handleLogout}
            isLoading={isLoading}
          />
        </ul>
      </div>
    </li>
  );
};

export default HeaderProfile;
