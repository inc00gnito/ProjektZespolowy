import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Carousel.module.scss";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { ITrack } from "app/model/Track";
import { createCloudinaryDownLink } from "app/utils/Link";
import { useCartStore } from "app/provider/Provider";

interface IProps {
  items: ITrack[];
  desktopView: number;
  mobileView: number;
}

const Carousel: React.FC<IProps> = ({ items, desktopView, mobileView }) => {
  const { addCartItem } = useCartStore();
  const photosLength = items.length;
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
    const isPortrait = window.innerHeight > window.innerWidth;
    if (isPortrait) {
      setElements(mobileView);
      setSliderElements(mobileView + 4);
    } else {
      setElements(desktopView);
      setSliderElements(desktopView + 4);
    }
    if (container.current) {
      const width = container.current.offsetWidth;
      setWidth(width);
    }
    if (isPortrait) setPortrait(true);
  }, []);

  useEffect(() => {
    if (isPortrait) {
      setElements(mobileView);
      setSliderElements(mobileView + 4);
    } else {
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

  const handleAddProduct = (item: ITrack) => {
    addCartItem(item);
  };

  useEffect(() => {
    setBoxPos();
    setCardPos();
  }, [index, items]);

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
          const downloadLink = createCloudinaryDownLink(
            items[cards[item]]?.audioFile
          );
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
                    src={items[cards[item]]?.imgFile}
                    alt="track"
                    className={styles.image}
                  />
                </div>
                <div className={styles.action}>
                  <p className={styles.name}>Lorem ipsum</p>
                  <p className={styles.price}>5,00 zł</p>
                  <button
                    className={styles.button}
                    onClick={() => handleAddProduct(items[cards[item]])}
                  >
                    <span className={styles.text}>Dodaj do koszyka</span>
                  </button>
                </div>
                <div className={styles.download}>
                  <a href={downloadLink} className={styles.link} download>
                    <HiDownload className={styles.icon} />
                  </a>
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
