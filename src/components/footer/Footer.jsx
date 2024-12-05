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
          <a href="http://instagram.com" className="instagram-text" target="_blank">
            <p className="footer-text">bakytdreamer</p>
          </a>
        </div>

        <div className="footer-gmail">
          <img className="gmail" src={gmailLogo} alt="gmail"/>
          <p className="footer-text">ba.temirgali@gmail.com</p>
        </div>

        <div className="footer-whatsapp">
          <img className="phone-call" src={phoneCallLogo} alt="phone-call"/>
          <p className="footer-text">Astana: +7 775 000 77 49</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;