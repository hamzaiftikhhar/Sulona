import "./HomePhotoShoot.css"

function HomePhotoShoot() {
  return (
    <div className="photoshoot-container parallax" data-speed="0.4">
      <div className="model-grid">
        <div className="model-photo_wrapper top">
          <div className="photo-overlay"></div>
          <img src="/images/banner-image3.jpg" className="model-photo" alt="Fashion model" />
          <div className="photo-caption">
            <span>New Collection</span>
            <span className="caption-line"></span>
          </div>
        </div>

        <div className="model-photo_wrapper middle">
          <div className="photo-overlay"></div>
          <img src="/images/card-image6.jpg" className="model-photo" alt="Fashion model" />
          <div className="photo-caption">
            <span>Premium Style</span>
            <span className="caption-line"></span>
          </div>
        </div>

        <div className="model-photo_wrapper main">
          <div className="photo-overlay"></div>
          <img src="/images/card-large-item5.jpg" className="model-photo" alt="Fashion model" />
          <div className="photo-caption">
            <span>Luxury Design</span>
            <span className="caption-line"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePhotoShoot

