import "./App.css";
import React, { useState } from "react";
import { ImageData } from "./data";
import GalleryCross from "./assets/gallery-cross.svg";
import GalleryLeft from "./assets/gallery-left.svg";
import GalleryRight from "./assets/gallery-right.svg";

import { AnimatePresence, motion } from "framer-motion";
function App() {
  const template = ImageData;
  const [selectedId, setSelectedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const controlGalleryImage = (controltype) => {
    if (controltype === "prev") {
      if (currentIndex !== 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedImage(template[currentIndex - 1].url);
        setSelectedId(template[currentIndex - 1].id);
      } else {
        setCurrentIndex(currentIndex);
      }
    } else if (controltype === "next") {
      if (currentIndex !== template.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedImage(template[currentIndex + 1].url);
        setSelectedId(template[currentIndex + 1].id);
      } else {
        setCurrentIndex(currentIndex);
      }
    }
  };
  return (
    <div className="">
      {selectedId === null && (
        <section className="section col-12 py-5">
          <div className="row justify-content-center">
            <div className="col-md-10 col-12 my-5">
              <div className="row no-gutters justify-content-center">
                {Array.isArray(template) && template.length > 0
                  ? template.map((item, index) => (
                      <motion.div
                        style={{ cursor: "pointer" }}
                        className="col-md-4 col-12"
                        key={index}
                        layoutId={item.id}
                        onClick={() => {
                          setSelectedId(item.id);
                          setSelectedImage(item.url);
                          setCurrentIndex(index);
                        }}
                      >
                        <img
                          src={item.url}
                          className="img-fluid"
                          alt={template.title}
                        />
                      </motion.div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </section>
      )}
      {selectedId !== null && (
        <section className="section gallery-section col-12 py-5">
          <div className=" col-12">
            <div className="row justify-content-center">
              <div className="col-md-11 col-12 motion-image-container">
                <button
                  className="btn btn-transparent gallery-control-btn"
                  onClick={() => {
                    controlGalleryImage("prev");
                  }}
                >
                  <img
                    src={GalleryLeft}
                    alt="Prev Indicator"
                    className="img-fluid"
                  />
                </button>
                <AnimatePresence>
                  {selectedId && (
                    <motion.div layoutId={selectedId} className="motion-image">
                      <img
                        src={selectedImage}
                        className="img-fluid"
                        alt="name"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  className="closebtn-motion  gallery-cross-icon"
                  onClick={() => setSelectedId(null)}
                >
                  <img
                    src={GalleryCross}
                    alt="Gallery Close"
                    className="img-fluid"
                  />
                </button>

                <button
                  className="btn btn-transparent gallery-control-btn"
                  onClick={() => {
                    controlGalleryImage("next");
                  }}
                  style={{ right: 0 }}
                >
                  <img
                    src={GalleryRight}
                    alt="next Indicator"
                    className="img-fluid"
                  />
                </button>
                <span className="gallery-control-number">
                  <span className="gallery-control-current-number">
                    {currentIndex + 1}
                  </span>
                  <span className="gallery-total-number">
                    /{template.length}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
