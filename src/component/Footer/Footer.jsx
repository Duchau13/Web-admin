import './footer.css';


const Footer = () => {
    return (
        <div className="container">
            <div className="header-logo">
                <div className="container-logo">
                    <div className="logo">
                    <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/logo_footer.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="container-content">
                <div className="content">
                    <div className="content-itiem">
                        <h2 className="header-content-itiem">ADDRESS</h2>
                        <p>570 8th Ave</p>
                        <p>
                            "New York,NY1018"
                        </p>
                        <p>United States</p>
                    </div>
                    <div className="content-itiem">
                        <h2 className="header-content-itiem">BOOK A TABLE</h2>
                        <p>Dogfood och Sliders foodtruck.</p>
                        <p>Under Om oss kan ni läsa</p>
                        <h3>(850) 435-4155</h3>
                    </div>
                    <div className="content-itiem">
                        <h2 className="header-content-itiem">OPENING HOURS</h2>
                        <p>Monday – Friday: 8am – 4pm</p>
                        <p>Saturday: 9am – 5pm</p>
                    </div>
                    <div className="content-itiem">
                        <h2 className="header-content-itiem">NEWLETTER</h2>
                        <p>Subscribe to the weekly newsletter for all the latest updates</p>
                        <div className="submit-gmail">
                        <input className='input-email' type="email" id="email" name="email" placeholder='enter your email'></input>
                        <button>SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="introduce-itiem">
                <div className="introduce-itiem1">
                    <p>Copyright © 2022<a  href="">pocofood.</a>All Rights Reserved.</p>
                </div>
                <div className="introduce-itiem2">
                    <img className="introduce-img" src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/footer_img1.png" alt="" />
                </div>
            </div>
        </div>
    )
}
export default Footer;