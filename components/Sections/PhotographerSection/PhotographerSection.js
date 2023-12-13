import Album from "../Album/Album";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useState, useRef, useEffect } from "react";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from "./styles.module.scss";

const PhotographerSection = (props) => {

    const [showModal, setModal] = useState(null);
    const ref = useRef(0);
    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);
    const fractionS = lp.languaje == 'es' ? ' de ' : ' of ';
    np.setSiteLocation(lp.languaje == 'es' ? 'Fotografos' : 'Photographs');

    useEffect(() => {
        if(showModal) {
            ref.current.classList.add(styles.op);
        }else{
            ref.current.classList.remove(styles.op);
        }
    }, [showModal]);

    useEffect(() => {
        let spanLang = document.getElementById("fracLang");
        spanLang.innerHTML = lp.languaje == 'es' ? ' de ' : ' of ';
    }, [lp.languaje]);

    useEffect(() => {
        np.setNavStatus(true);
    }, []);

    return (
        <section className={styles.photographerSection}>

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

                {props.photographs.map((photo) => (
                    <SwiperSlide>
                        <Album
                            key={photo.id}
                            client={photo.client}
                            agency={photo.agency}
                            campaign={photo.campaign}
                            gallery={photo.image_gallery}
                        />  
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
};

export default PhotographerSection;