import footerImg from '../assets/footer.png'
import download from '../assets/descargar.png'
import './Footer.css'

const Footer = () => {

    return(
        <footer>
            <div className="footer-content">
                <div className="footer-download">
                    <p>Descarga nuestra app:</p>
                    <img src={download} alt="" />
                </div>
                <div className="footer-rights">
                    Copyright © Cookapp Inc.
                </div>
                <div className="footer-img">
                    <img src={footerImg} alt="" />
                </div>
            
            </div>
        </footer>
        
    )

}

export default Footer