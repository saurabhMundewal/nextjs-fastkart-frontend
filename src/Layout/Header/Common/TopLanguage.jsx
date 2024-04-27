'use client';
import i18next from "i18next";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import English from '../../../../public/assets/images/country/English.png';
import French from '../../../../public/assets/images/country/French.png';
import Spanish from '../../../../public/assets/images/country/Spanish.png';
import Arabic from '../../../../public/assets/images/country/arabic.png';
import { useRouter } from "next/navigation";

const TopLanguage = () => {  
  const { i18n } = useTranslation('common');
  const currentLanguage = i18n.resolvedLanguage;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({});
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const language = [
    { id: 1, title: 'English', icon: 'en', image: English, isLang: '/en/' },
    { id: 2, title: 'Arabic', icon: 'ar', image: Arabic, isLang: '/ar/' },
    { id: 3, title: 'French', icon: 'fr', image: French, isLang: '/fr/' },
    { id: 4, title: 'Spanish', icon: 'es', image: Spanish, isLang: '/es/' },
  ];
  useEffect(()=>{
    const defaultLanguage =language.find(data =>data.icon == currentLanguage )
    setSelectedLang(defaultLanguage)
  },[])
  const  router =useRouter()
  // To change Language
  const handleChangeLang = (value) => {
    setSelectedLang(value);
    i18next.changeLanguage(value.icon);
    router.refresh();
  };
  return (
    <Dropdown className='theme-form-select' isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className='select-dropdown' type='button' id='select-language'>
        {selectedLang?.image && <Image src={selectedLang?.image} className='img-fluid' alt='Language Name' height={20} width={20} />}
        <span>{selectedLang?.title}</span>
      </DropdownToggle>
      <DropdownMenu className='dropdown-menu-end'>
        {language.map((elem, i) => {
          if (elem.icon === currentLanguage) {
            return null;
          }
          return(
            <a onClick={() => handleChangeLang(elem)} key={i}>
              <DropdownItem id={elem.title}>
               {elem?.image && <Image src={elem?.image} className='img-fluid' alt={elem.title} height={20} width={20} priority />}
                <span>{elem.title}</span>
              </DropdownItem>
            </a>
          )
        }
        
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default TopLanguage;
