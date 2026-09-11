import { useState, useEffect } from "react";
import sanityClient from "../sanity/sanityconfig";
import imageUrlBuilder from "@sanity/image-url";
import Carousel from "react-bootstrap/Carousel";
import { motion } from "framer-motion";
import "./Gallery.css";
import EventCard from "../components/Eventcard";
import ViewMoreContent from "../components/ViewMoreContent";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source).url();

const Gallery = () => {

  const manualSliderImages = [
    "https://i.postimg.cc/2zqGs36h/IMG-6225-JPG.jpg",
    "https://i.postimg.cc/ChkNKtbn/IMG-6209.avif",
    "https://i.postimg.cc/W2D8Bt3r/IMG-6121-JPG.jpg",
    "https://i.postimg.cc/KZdfxFkw/IMG-6255.avif"
  ];

  const [sliderImages] = useState(manualSliderImages);
  const [events, setEvents] = useState([]);

  const manualEvents = [
    {
      title: "Research Paper Writing Seminar",
      date: "2025-26",
      description:
        "A seminar conducted to guide students on how to write and publish research papers effectively.",
      images: [
        "https://i.postimg.cc/MzMWhdDG/IMG-6797.avif",
        "https://i.postimg.cc/CMTPxLTg/IMG-6795.avif"
      ]
    },
    {
      title: "Mosaic 2k25",
      date: "2025-26",
      description:
        "Mosaic 2k25 was a creative technical fest involving coding, design, and innovation competitions.",
      images: [
        "https://i.postimg.cc/HdmvGx9k/PXL-20251017-045139692-MP-jpg.jpg",
        "https://i.postimg.cc/0xDXHmDR/IMG-20251017-122836-jpg.jpg",
        "https://i.postimg.cc/Bv0Gt6f8/IMG_20251017_122237.jpg",
        "https://i.postimg.cc/GpC192nv/IMG_20251017_122440.jpg",
        "https://i.postimg.cc/nLGfmJnX/IMG_20251017_171502.jpg", 
        "https://i.postimg.cc/WpkLmgpT/IMG-7157.avif"

      ]
    },
    {
      title: "MimoVerse",
      date: "2025-26",
      description:
        "An event where students explored metaverse concepts and digital interaction technologies.",
      images: [
        "https://i.postimg.cc/mTfm3rts/Screenshot-%28133%29.png",
        "https://i.postimg.cc/6BJMVQyt/Screenshot-%28134%29.png"
      ]
    },
    {
      title: "IOT/IIOT",
      date: "2025-26",
      description:
        "An event where students explored metaverse concepts and digital interaction technologies.",
      images: [
        "https://i.postimg.cc/6qVJNRL9/IMG_6219.avif",
        "https://i.postimg.cc/g05PyG2c/IMG_20251001_WA0089.jpg",
        "https://i.postimg.cc/SK5pLmxS/IMG_20251001_WA0119.jpg",
        "https://i.postimg.cc/nrKbt7Yn/IMG_6244.avif",
        "https://i.postimg.cc/5tGM5f2x/IMG_20251001_WA0081.jpg",
      ]
    },
  ];

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "event"]{
          title,
          date,
          description,
          images[]{asset->{_id,url}}
        }`
      )
      .then((data) => setEvents([...manualEvents, ...data]))
      .catch(console.error);
  }, []);

  return (
    <div className="gallery-container">

      <motion.h2
        className="gallery-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Gallery
      </motion.h2>

      {/* Main Slider */}
      <div className="slider-container">
        <Carousel>
          {sliderImages.map((img, index) => (
            <Carousel.Item key={index}>
              <img
                src={img}
                className="d-block w-100 slider-img"
                alt="slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Event Cards */}
      <motion.div
        className="event-gallery"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {events.map((event, index) => (
          <EventCard
            key={index}
            event={event}
            index={index}
            urlFor={urlFor}
          />
        ))}
      </motion.div>

    </div>
  );
};

export default Gallery;