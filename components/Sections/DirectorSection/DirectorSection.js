import Work from "../Work/Work";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState, useRef, useEffect } from "react";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import Link from "next/link";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "./styles.module.scss";

const DirectorSection = (props) => {

    const [showModal, setModal] = useState(null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);
    const fractionS = lp.languaje == 'es' ? ' de ' : ' of ';

    useEffect(() => {
        if(showModal) {
            ref.current.classList.add(styles.op);
            if (sectionRef) {
                sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        }else{
            ref.current.classList.remove(styles.op);
        }
    }, [showModal]);

    useEffect(() => {
        let spanLang = document.getElementsByClassName("fracLang");
        for(let i=0; i<spanLang.length; i++) {
            spanLang[i].innerHTML = lp.languaje == 'es' ? ' de ' : ' of ';
        }
    }, [lp.languaje]);

    useEffect(() => {
        np.setSiteLocation(lp.languaje == 'es' ? 'Directores' : 'Directors');
        np.setNavStatus(true);
    }, []);

    const handleSlideChange = (swiper) => {
        const newIndex = swiper.activeIndex;
        console.log(`Slider cambió a slide ${newIndex}`);
        setActiveSlideIndex(newIndex);
    };

    return (
        <section 
            className={`wa ${styles.directorsSection}`} 
            ref={sectionRef}
        >

            <Swiper
                pagination={{
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                                '<span class="fracLang">' + fractionS + "</span>"
                                + '<span class="' + totalClass + '"></span>';
                    }
                }}
                loop={true}
                simulateTouch={false}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={styles.slider}
                ref={ref}
                onSlideChange={handleSlideChange}
            >

                <div className={styles.title}>
                    <Link href={`/directors/${props.director.director_slug}`}>
                        <a>{props.director.director_name}</a>
                    </Link>
                </div>

                {props.works.map((work, idx) => (
                    work.hidde_reel != true ?
                    <SwiperSlide key={idx}>
                        <Work 
                            key={work.id}
                            featured_image={work.featured_image}
                            agency={work.agency}
                            brand={work.brand}
                            title_es={work.title_es}
                            title_en={work.title_en}
                            video_url={work.video_url}
                            featured={true}
                            from={"directorSection"}
                            showModal={showModal}
                            setModal={setModal}
                            info={work.info}
                            info_en={work.info_en}
                            fromSlider={true}
                            activeSlide={activeSlideIndex}
                            slideIndex={idx}
                        />  
                    </SwiperSlide>
                    : null
                ))}

            </Swiper>
        </section>
    );
};

export default DirectorSection;