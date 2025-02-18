
import "./Banner.css";

const Banner = () => {
  return (
    <div className="sub-container">
      <div className="banner">
        <div className="banner-text">
          <h1>
            Grab upto 50% off on <br></br>selected Cosmetics
          </h1>
          <span className="is-buy-now">
            <a href="#products">
              <button className="btn-rounded buy-now">Buy Now</button>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Banner;
