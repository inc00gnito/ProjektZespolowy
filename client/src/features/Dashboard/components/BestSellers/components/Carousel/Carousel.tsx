import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Carousel.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";

interface IProps {
  photos: any[];
  desktopView: number;
  mobileView: number;
}

const Carousel: React.FC<IProps> = ({ photos, desktopView, mobileView }) => {
  const photosLength = photos.length;
  const [elements, setElements] = useState(desktopView);
  const [sliderElements, setSliderElements] = useState(desktopView + 4);
  const [width, setWidth] = useState(0);
  const [elementWidth, setElementWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [indexPhoto, setIndexPhoto] = useState(0);

  const [cards, setCards] = useState<any[]>([]);
  const [posArr, setPosArr] = useState<number[]>([]);
  const container = useRef<HTMLDivElement>(null);
  const [isPortrait, setPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const isPageTransition = useRef(false);

  const onRightClick = () => {
    if (isPageTransition.current) return;
    isPageTransition.current = true;
    setTimeout(() => {
      isPageTransition.current = false;
    }, 500);

    let newPhotoIndex = indexPhoto + 1;
    if (newPhotoIndex === photosLength) newPhotoIndex = 0;
    setIndexPhoto(newPhotoIndex);

    let newIndex = index + 1;
    if (newIndex >= sliderElements) {
      newIndex = 0;
    }
    setIndex(newIndex);
  };

  const onLeftClick = () => {
    if (isPageTransition.current) return;
    isPageTransition.current = true;
    setTimeout(() => {
      isPageTransition.current = false;
    }, 500);

    let newPhotoIndex = indexPhoto - 1;
    if (newPhotoIndex < 0) newPhotoIndex = photosLength - 1;
    setIndexPhoto(newPhotoIndex);

    let newIndex = index - 1;
    if (newIndex < 0) {
      newIndex = sliderElements - 1;
    }
    setIndex(newIndex);
  };

  useEffect(() => {
    if (container.current) {
      const width = container.current.offsetWidth;
      setWidth(width);
    }
  }, []);

  const onWindowResize = useCallback(() => {
    if (window.innerWidth < 1024) {
      setElements(mobileView);
      setSliderElements(mobileView + 4);
    } else if (window.innerWidth >= 1024) {
      setElements(desktopView);
      setSliderElements(desktopView + 4);
    }
    if (container.current) {
      const width = container.current.offsetWidth;
      setWidth(width);
    }
    if (window.innerHeight > window.innerWidth) setPortrait(true);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setElements(mobileView);
      setSliderElements(mobileView + 4);
    } else if (window.innerWidth >= 1024) {
      setElements(desktopView);
      setSliderElements(desktopView + 4);
    }
  }, []);

  useEffect(() => {
    if (width === 0) return;
    setIndex(0);
    setIndexPhoto(0);
    const elementWidth = width / elements;
    setElementWidth(elementWidth);
  }, [elements, width]);

  const setCardPos = () => {
    let tempPhotoIndex = indexPhoto;
    let tempIndex = index;
    const indexArr = new Array(sliderElements);
    for (let i = 0; i < 2; i++) {
      tempPhotoIndex -= 1;
      tempIndex -= 1;
      if (tempPhotoIndex < 0) tempPhotoIndex = photosLength - 1;
      if (tempIndex < 0) tempIndex = sliderElements - 1;
      indexArr[tempIndex] = tempPhotoIndex;
    }

    tempPhotoIndex = indexPhoto;
    tempIndex = index;
    for (let i = 0; i < sliderElements - 2; i++) {
      indexArr[tempIndex] = tempPhotoIndex;
      tempPhotoIndex += 1;
      tempIndex += 1;
      if (tempPhotoIndex === photosLength) tempPhotoIndex = 0;
      if (tempIndex === sliderElements) tempIndex = 0;
    }
    setCards(indexArr);
  };

  const setBoxPos = () => {
    let tempIndex = index;
    let startPos = 0;
    const posArr = new Array(sliderElements);
    for (let i = 0; i < 2; i++) {
      tempIndex -= 1;
      if (tempIndex < 0) tempIndex = sliderElements - 1;
      startPos -= 1;
      posArr[tempIndex] = startPos;
    }
    tempIndex = index;
    startPos = 0;
    for (let i = 0; i < sliderElements - 2; i++) {
      posArr[tempIndex] = startPos;
      tempIndex += 1;
      startPos++;
      if (tempIndex === sliderElements) tempIndex = 0;
    }
    setPosArr(posArr);
  };

  useEffect(() => {
    setBoxPos();
    setCardPos();
  }, [index]);

  useEffect(() => {
    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  });

  return (
    <div className={styles.container}>
      <div
        style={{
          height: (width / elements) * (isPortrait ? 0.66 : 0.88) + "px",
        }}
        className={styles.arrowContainer}
      >
        <div className={styles.leftArrow} onClick={onLeftClick}>
          <BsChevronLeft className={styles.icon} />
        </div>
        <div className={styles.rightArrow} onClick={onRightClick}>
          <BsChevronRight className={styles.icon} />
        </div>
      </div>
      <div className={styles.carousel} ref={container}>
        {Array.from(Array(sliderElements).keys()).map((item) => {
          const lastCardIndex = posArr.indexOf(Math.max(...posArr));
          const firstCardIndex = posArr.indexOf(Math.min(...posArr));
          const isFirstOrLast =
            item === lastCardIndex || item === firstCardIndex;
          return (
            <div
              key={item}
              className={styles.box}
              style={
                {
                  "--elements": elements,
                  transform: `translate(${posArr[item] * elementWidth}px)`,
                  opacity: isFirstOrLast ? 0 : 1,
                } as any
              }
              data-id={item}
            >
              <div className={styles.item}>
                <div className={styles.content}>
                  <img
                    src={photos[cards[item]]?.photo}
                    alt="track"
                    className={styles.image}
                  />
                </div>
                <div className={styles.action}>
                  <p className={styles.name}>Lorem ipsum</p>
                  <p className={styles.price}>5,00 zł</p>
                  <button className={styles.button}>
                    <span className={styles.text}>Dodaj do koszyka</span>
                  </button>
                </div>
                <div className={styles.download}>
                  <HiDownload className={styles.icon} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
