import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState, useRef, useEffect } from "react";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "./styles.module.scss";

const AlbumSlider = (props) => {

    const swiperRef = useRef(null);
    const closeRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);
    const lp = useLangContext(LangContextProvider);
    const fractionS = lp.languaje == 'es' ? ' de ' : ' of ';

    useEffect(() => {
        let spanLang = document.getElementById("fracLang");
        spanLang.innerHTML = lp.languaje == 'es' ? ' de ' : ' of ';
    }, [lp.languaje]);

    useEffect(() => {
        closeRef.current.addEventListener("click", () => {
            props.setModal(-1);
        });
    }, []);

    const changePrevAlbum = () => {
        if(props.albumPrev != -1) {
            props.setAlbumIndex(props.albumPrev);
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideTo(0);
            }
        }
    }

    const changeNextAlbum = () => {
        if((props.albumNext + 1) <= props.albumLength) {
            props.setAlbumIndex(props.albumNext);
            if (swiperRef.current && swiperRef.current.swiper) {
                swiperRef.current.swiper.slideTo(0);
            }
        }
    }



    return (
        <section className={styles.albumSlider}>

            <div 
                className={styles.closeSlider} 
                ref={closeRef}
            >
                ← volver
            </div>

            <Swiper
                key={props.albumIndex}
                pagination={{
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                                '<span id="fracLang">' + fractionS + "</span>"
                                + '<span class="' + totalClass + '"></span>';
                    }
                }}
                loop={true}
                simulateTouch={false}
                navigation={true}
                //navigation={{ prevEl: prevButtonRef.current, nextEl: nextButtonRef.current }}
                modules={[Pagination, Navigation]}
                className={`albumS ${styles.slider}`}
                ref={swiperRef}
            >

                {props.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className={styles.albumSlide}>
                            <img src={image} alt='slide image' />
                        </div> 
                    </SwiperSlide>
                ))}

            </Swiper>

            <div className={styles.albumSliderNav}>
                <button 
                    className={`${styles.prevButton} ${props.albumPrev == -1 ? styles.disabled : null}`} 
                    ref={prevButtonRef}
                    onClick={changePrevAlbum}
                >
                    {window.innerWidth >= 768 ? '←' : null} ALBÚM ANTERIOR
                </button>
                <button 
                    className={`${styles.nextButton} ${(props.albumNext + 1) > props.albumLength ? styles.disabled : null}`} 
                    ref={nextButtonRef}
                    onClick={changeNextAlbum}
                >
                    ALBÚM SIGUIENTE {window.innerWidth >= 768 ? '→' : null}
                </button>
            </div>

        </section>
    );
};

export default AlbumSlider;