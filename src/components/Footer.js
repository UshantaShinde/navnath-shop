import React from 'react'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <h2>NavNath Traders</h2>
        <div className="footer-content">
          <div className="footer-column">
          <h3>Address</h3>
          <p>N-43-C/A-1/15-4, Navnath Trader's,<br />
                    trimurti chowk, cidco, Nashik <br />
                    Phone: +91 91587 44445 / 22-42644344 <br />
                    Timings: 9.00 am to 9.00 pm (Mon-Sat) <br />
                    Email : navnathhardware@gmail.com</p>
          </div>
          {/* <div className="footer-column">
            <h3>About us</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos quasi quo harum animi necessitatibus omnis voluptatem suscipit quas dolores, eaque illo asperiores quis laborum cum perferendis dolorem maiores cumque natus?</p>
          </div> */}
      
          <div className="footer-column">
            <h3>Connect With us</h3>
            <ul className="social-icons">
              <div className="row">
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
              </div>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 NavNath-Traders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer