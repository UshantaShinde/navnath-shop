import React from 'react'
import './home.css'
import Products from '../Products/Products'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'



const Home = () => {
  const fadeImages = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/navnath-trader-s-8b8c9.appspot.com/o/secondimg.jpg?alt=media&token=e892ec8b-6d13-4bab-9842-832c2daaa9c3",
      caption: 'First Slide'
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/navnath-trader-s-8b8c9.appspot.com/o/pexels-max-rahubovskiy-6207947%20(2)%20(2).jpg?alt=media&token=1a4e60fe-a127-4bbf-9d18-27d6836633a4",
      caption: 'Second Slide'
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/navnath-trader-s-8b8c9.appspot.com/o/third.jpeg?alt=media&token=7c636aa1-19b0-4c89-9453-a8e6c021fb32",
      caption: 'Third Slide'
    },
  ];
  return (<>
    <div className="slide-container">
      <Fade autoplay={true} infinite={true} indicators={false} pauseOnHover={false} arrows={false}>
        {fadeImages.map((fadeImage, index) => (
          <div className='banner' key={index}>
            <img style={{ width: '100%' }} src={fadeImage.url} />
            <div className="text">
              <h1>Navnath Trader's</h1>
              <h6>The Definition Of Luxury</h6>
            </div>
          </div>
        ))}
      </Fade>
    </div>
    {/* <section className='banner'>
      <div className="text"><h1>Navnath Trader's</h1>
        <h6> the definition of Luxury</h6>
      </div>
    </section> */}
    <section className='brand' id='products'>
      <h1>BRANDS</h1>
      <Products />
    </section>
  </>
  )
}

export default Home