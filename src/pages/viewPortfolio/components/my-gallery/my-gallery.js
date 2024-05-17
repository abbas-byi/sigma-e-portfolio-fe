import { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Styles from "./my-gallery.module.scss";
import { useGetPortfolioDetails } from "../../../portfolio/useGetPortfolioDetails";
import { usePhotos } from "./usePhotos";

const MyGallery = () => {
  const [index, setIndex] = useState(-1);
  const { photos } = usePhotos();


  return (
    <div className={Styles.grid}>
      <PhotoAlbum photos={photos} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} />

      <Lightbox
          slides={photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          // enable optional lightbox plugins
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
}

export default MyGallery