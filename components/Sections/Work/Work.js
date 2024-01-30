import { useEffect, useState, useRef } from "react";
import VideoJS from '../../VideoJS/VideoJS';
import { LangContextProvider, useLangContext } from '../../../context/LangContextProvider';

import styles from './styles.module.scss';

const Work = (props) => {

    const [showModal, setModal] = useState(null);
    const [showNav, setShowNav] = useState(null);

    const [showContent, setShowContent] = useState(false);

    const playerRef = useRef(null);
    const workRef = useRef(null);
    const lp = useLangContext(LangContextProvider);

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
          src: props.video_url,
          type: "video/mp4"
        }],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    };
    
    const openModal = () => {
        setModal(true);
    }

    useEffect(() => {
        props.setModal(showModal);
    }, [showModal]);

    useEffect(() => {
        if(props.from === 'directorSection') {
            if(workRef.current.parentNode.classList.contains("swiper-slide-active")) {
                setShowContent(true);
            }else{
                setShowContent(false);
            }
        }
    }, [props.activeSlide]);

    return (
        <div 
            style={ (props.featured_image ) ? {backgroundImage: `url( "${props.featured_image}" )`} : {backgroundColor: "#000"} } 
            className={styles.workWrapper}   
            onClick={openModal} 
            ref={workRef}
        >

            {
                props.from === "featuredWorks" ? (

                <div className={styles.featWorkBox}>
                    <h3 className={styles.agency}>{props.agency}</h3>
                    <h3 className={styles.brand}>{props.brand}</h3>
                    <h3>{props.work_director.director_name}</h3>
                    {
                        showModal ? (
                            <VideoJS 
                                options={videoJsOptions} 
                                onReady={handlePlayerReady} 
                                setModal={setModal} 
                                workInfo={props.info} 
                                workInfoEn={props.info_en} 
                                fromSlider={props.fromSlider} 
                                from={props.from}
                            />
                        ) : null
                    }
                </div>

                ) : props.from === "directorGrid" ? (
                    <div className={styles.DgWorkBox}>
                        <div className={styles.workData}>
                            
                            {
                                props.agency ? 
                                    <>
                                        <h3>{props.agency}</h3>
                                        <div className={styles.separator}></div>
                                    </>
                                :
                                    null
                            }
                            {
                                props.brand ?
                                    <>
                                        <h3>{props.brand}</h3>
                                        <div className={styles.separator}></div>    
                                    </>
                                :
                                    null
                            }
                            
                            <h3>{lp.languaje == 'es' ? props.title_es : props.title_en}</h3>
                        </div>
                        {
                            showModal ? (
                                <VideoJS 
                                    options={videoJsOptions} 
                                    onReady={handlePlayerReady} 
                                    setModal={setModal} 
                                    workInfo={props.info} 
                                    workInfoEn={props.info_en}
                                    fromSlider={props.fromSlider} 
                                    workSelectedIndex={props.workSelectedIndex} 
                                    setWorkSelectedIndex={props.setWorkSelectedIndex} 
                                    video_url={props.video_url} 
                                    index={props.index} 
                                    workPrev={props.workPrev} 
                                    workNext={props.workNext} 
                                    from={props.from}
                                />
                            ) : null
                        }
                    </div>
                ) : (

                <div className={styles.DsWorkBox}>
                    <div className={`${styles.workData} ${showContent ? styles.oc : null}`}>
                        
                        {
                            props.agency ? 
                                <>
                                    <h3>{props.agency}</h3>
                                    <div className={styles.separator}></div>
                                </>
                            :
                                null
                        }
                        {
                            props.brand ?
                                <>
                                    <h3>{props.brand}</h3>
                                    <div className={styles.separator}></div>    
                                </>
                            :
                                null
                        }
                        
                        <h3>{lp.languaje == 'es' ? props.title_es : props.title_en}</h3>
                    </div>
                    {
                        showModal ? (
                            <VideoJS 
                                options={videoJsOptions} 
                                onReady={handlePlayerReady} 
                                setModal={setModal} 
                                workInfo={props.info} 
                                workInfoEn={props.info_en}
                                fromSlider={props.fromSlider} 
                                from={props.from}
                            />
                        ) : null
                    }
                </div>
                )
            }
            
            

        </div>
    );
};


export default Work;