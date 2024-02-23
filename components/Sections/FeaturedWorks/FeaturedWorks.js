import Work from "../Work/Work";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState, useRef, useEffect } from "react";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "./styles.module.scss";

const FeaturedWorks = (props) => {

    const [showModal, setModal] = useState(null);
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
        let spanLang = document.getElementById("fracLang");
        spanLang.innerHTML = lp.languaje == 'es' ? ' de ' : ' of ';
        np.setSiteLocation(lp.languaje == 'es' ? 'Trabajos destacados' : 'Featured Works');
    }, [lp.languaje]);

    useEffect(() => {
        if(sessionStorage.getItem('heroIsClosed')) {
            np.setNavStatus(true);
        }
    }, []);


    return (
        <section 
            className={`wa ${styles.featuredWorks}`} 
            ref={sectionRef}
        >

            <Swiper
                pagination={{
                    type: 'fraction',
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                                '<span id="fracLang">' + fractionS + "</span>"
                                + '<span class="' + totalClass + '"></span>';
                    }
                }}
                simulateTouch={false}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={styles.slider}
                ref={ref}
            >

                {props.works.map((work) => (
                    
                    <SwiperSlide key={work.id}>
                        
                        <Work 
                            key={work.id}
                            featured_image={work.featured_image} 
                            work_director={work.work_director}
                            agency={work.agency}
                            brand={work.brand}
                            title_es={work.title_es}
                            video_url={work.video_url}
                            featured={true}
                            from={"featuredWorks"}
                            showModal={showModal}
                            setModal={setModal}
                            info={work.info}
                            info_en={work.info_en}
                            fromSlider={true}
                        />  
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
};

export default FeaturedWorks;