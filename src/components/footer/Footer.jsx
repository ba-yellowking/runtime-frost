import "./Footer.css";
import instagramLogo from '../../images/instagram.png';
import gmailLogo from '../../images/gmail.png';
import phoneCallLogo from '../../images/phone-call.png';

function Footer() {

  return (
    <div className="footer-container">
      <div className="footer-wrap">
        <div className="footer-left">
          <img className="instagram" src={instagramLogo} alt="instagram"/>
          <p>Instagram</p>
        </div>

        <div className="footer-middle">
          <img className="gmail" src={gmailLogo} alt="gmail"/>
          <p>company@gmail.com</p>
        </div>

        <div className="footer-right">
          <img className="phone-call" src={phoneCallLogo} alt="phone-call"/>
          <div className="footer-right-left">
            <p>Astana:</p>
            <p>+7 775 000 77 49</p>
          </div>

          <img className="phone-call" src={phoneCallLogo} alt="phone-call"/>
          <div className="footer-right-right">
            <p>Almaty:</p>
            <p>+7 775 000 77 49</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;