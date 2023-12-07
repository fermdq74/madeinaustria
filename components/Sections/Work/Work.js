import React from 'react';
import Image from "next/image";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import VideoJS from '../../VideoJS/VideoJS';

import styles from './styles.module.scss';

const Work = (props) => {

    const [showModal, setModal] = useState(null);
    const playerRef = React.useRef(null);

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

    return (
        <div 
            style={ (props.featured_image ) ? {backgroundImage: `url( "${props.featured_image}" )`} : {backgroundColor: "#000"} } 
            className={styles.workWrapper}   
            onClick={openModal} 
        >

            {
                props.from == "featuredWorks" ?

                <div className={styles.featWorkBox}>
                    <h3>{props.agency}</h3>
                    <h3>{props.brand}</h3>
                    <h3>{props.work_director.director_name}</h3>
                    {
                        showModal ? (
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} setModal={setModal} workInfo={props.info} />
                        ) : null
                    }
                </div>

                :

                <div className={styles.DsWorkBox}>
                    <div className={styles.title}>
                        <h5>Director</h5>
                        <h2>{props.work_director.director_name}</h2>
                    </div>
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
                        
                        <h3>{props.title_es}</h3>
                    </div>
                    {
                        showModal ? (
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} setModal={setModal} workInfo={props.info} />
                        ) : null
                    }
                </div>
            }
            
            

        </div>
    );
};


export default Work;