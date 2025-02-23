import "./HomePhotoShoot.css"

function HomePhotoShoot() {
  return (
    <div className="photoshoot-container parallax" data-speed="0.4">
      <div className="model-grid">
        <div className="model-photo_wrapper top">
          <div className="photo-overlay"></div>
          <img src="/images/home-photo-1.webp" className="model-photo" alt="Fashion model" />
          <div className="photo-caption">
            <span>New Collection</span>
            <span className="caption-line"></span>
          </div>
        </div>

        <div className="model-photo_wrapper middle">
          <div className="photo-overlay"></div>
          <img src="/images/home-photo-2.webp" className="model-photo" alt="Fashion model" />
          <div className="photo-caption">
            <span>Premium Style</span>
            <span className="caption-line"></span>
          </div>
        </div>

        <div className="model-photo_wrapper main">
          <div className="photo-overlay"></div>
          <img src="/images/home-photo-3.webp" className="model-photo" alt="Fashion model" />
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

