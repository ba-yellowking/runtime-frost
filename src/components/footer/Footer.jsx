import "./Footer.css"
import instagramLogo from "../../images/instagram.png"
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
          <svg className="footer__icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12v1.45q0 1.475-1.012 2.513T18.5 17q-.875 0-1.65-.375t-1.3-1.075q-.725.725-1.638 1.088T12 17q-2.075 0-3.537-1.463T7 12t1.463-3.537T12 7t3.538 1.463T17 12v1.45q0 .65.425 1.1T18.5 15t1.075-.45t.425-1.1V12q0-3.35-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20h5v2zm0-7q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15"/></svg>
          <span className="max-lg:hidden">ba.temirgali@gmail.com</span>
        </div>

        <div className="footer__item--whatsapp dark:bg-[#222222]">
          <svg className="footer__icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3M6.025 9l1.65-1.65L7.25 5H5.025q.125 1.025.35 2.025T6.025 9m8.95 8.95q.975.425 1.988.675T19 18.95v-2.2l-2.35-.475zm0 0"/>
          </svg>
          <span className="max-lg:hidden">{t("footerContacts")}</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
