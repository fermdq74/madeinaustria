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

    const ref = useRef(0);
    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);
    np.setSiteLocation(lp.languaje == 'es' ? 'Fotografos' : 'Photographs');

    useEffect(() => {
        np.setNavStatus(true);
    }, []);

    return (
        <section className={styles.photographerSection}>
            
            <Swiper
                pagination={{type: 'fraction'}}
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
