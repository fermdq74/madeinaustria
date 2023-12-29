import Album from "../Album/Album";
import AlbumSlider from "../AlbumSlider/AlbumSlider";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import { useState, useRef, useEffect } from "react";
import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

import styles from "./styles.module.scss";

const PhotographerSection = (props) => {

    const [showModal, setModal] = useState(-1);
    const [albumIndex, setAlbumIndex] = useState(null);

    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);

    useEffect(() => {
        np.setNavStatus(true);
    }, []);

    useEffect(() => {
        np.setSiteLocation(lp.languaje == 'es' ? 'Fotografos' : 'Photographs');
    }, [lp.languaje]);

    return (
        <section className={styles.photographerSection}>
            
            <Swiper
                freeMode={true}
                slidesPerView={'auto'}
                navigation={true}
                modules={[FreeMode, Navigation]}
                className={styles.slider}
            >
                <div className={styles.title}>
                    <h3>{lp.languaje == 'es' ? 'Fotografo' : 'Photographer'}</h3>
                    <h2>{props.photographer.name}</h2>
                </div>

                {props.photographs.map((photo, index) => (
                    <SwiperSlide 
                        className={styles.slide}
                        key={index}
                    >
                        <Album
                            key={photo.id}
                            client={photo.client}
                            agency={photo.agency}
                            campaign={photo.campaign}
                            gallery={photo.image_gallery}
                            fromGrid={false}
                            setModal={setModal}
                            setAlbumIndex={setAlbumIndex}
                            index={index}
                            full={props.photographs.length == 1 ? true : false}
                        />  
                    </SwiperSlide>
                ))}

            </Swiper>
            {
                showModal != -1 ? (
                    <AlbumSlider 
                        images={props.photographs[albumIndex].image_gallery} 
                        setModal={setModal} 
                        setAlbumIndex={setAlbumIndex}
                        albumPrev={albumIndex - 1} 
                        albumNext={albumIndex + 1} 
                        albumLength={props.photographs.length}
                    />
                ) : null
            }
            
        </section>
    );
};

export default PhotographerSection;
