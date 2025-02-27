import "./Footer.css"
import instagramLogo from "../../images/instagram.png"
import gmailLogo from "../../images/gmail.png"
import phoneCallLogo from "../../images/phone-call.png"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function Footer() {
  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="footer dark:border-[#222222] dark:bg-[#222222]">
      <div className="footer__wrapper">
        <div className="footer__item--instagram dark:bg-[#222222]">
          <img className="footer__icon" src={instagramLogo} alt="Instagram logo" />
          <a href="http://instagram.com" className="instagram-text dark:text-white max-lg:hidden" target="_blank">
            <span>bakytdreamer</span>
          </a>
        </div>

        <div className="footer__item--gmail dark:bg-[#222222]">
          <img className="footer__icon" src={gmailLogo} alt="Gmail logo" />
          <span className="max-lg:hidden">ba.temirgali@gmail.com</span>
        </div>

        <div className="footer__item--whatsapp dark:bg-[#222222]">
          <img className="footer__icon" src={phoneCallLogo} alt="Phone logo" />
          <span className="max-lg:hidden">{t("footerContacts")}</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
