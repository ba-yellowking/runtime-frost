import "./Banner.css"
import mainBanner from "../../images/mainBanner.png"

function Banner() {
  return (
    <div className="banner-component">
      <img className="main-banner" src={mainBanner} alt="main-banner" />
    </div>
  )
}

export default Banner
