import "./Footer.css";
import instagramLogo from '../../images/instagram.png';
import gmailLogo from '../../images/gmail.png';
import phoneCallLogo from '../../images/phone-call.png';

function Footer() {

  return (
    <div className="footer-container">
      <div className="footer-wrap">
        <div className="footer-instagram">
          <img className="instagram" src={instagramLogo} alt="instagram"/>
          <p>bakytdreamer</p>
        </div>

        <div className="footer-gmail">
          <img className="gmail" src={gmailLogo} alt="gmail"/>
          <p>ba.temirgali@gmail.com</p>
        </div>

        <div className="footer-whatsapp">
          <img className="phone-call" src={phoneCallLogo} alt="phone-call"/>
          <p>Astana: +7 775 000 77 49</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;