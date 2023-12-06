import React from 'react';
import Image from "next/image";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';
import VideoJS from '../../VideoJS/VideoJS';

import styles from './styles.module.scss';

const Work = (props) => {

    const [showModal, setModal] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoTracks, setVideoTracks] = useState(null);
    const playerRef = React.useRef(null);

    useEffect(() => {
        //fetchVideo();
    }, []);
    
    const fetchVideo = () => {

        const videoData = async () => {
            const response = await fetch(`/api/video/${props.video_url.substring(18)}`);
            return response.json();
        };

        videoData().then((data) => {
            setVideoUrl(data.files.progressive);
            setVideoTracks(data.text_tracks);
        });
    };
    
    //const finalUrl = videoUrl ? Array.isArray(videoUrl) && videoUrl.length > 0 ? videoUrl[0].url : "" : "";
    const finalTextTracks = videoTracks;
    
    let videoDataReturn = [];
    if((finalTextTracks != null) && (finalTextTracks.length > 0)) {
        for(let i=0; i < finalTextTracks.length; i++) {
            videoDataReturn.push({
                "lang": finalTextTracks[i].lang,
                "url": finalTextTracks[i].url,
            });
        }
    }

    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        fluid: true,
        sources: [{
          //src: finalUrl,
          src: props.video_url,
          type: "video/mp4"
        }],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        /*player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });*/
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
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} subs={videoDataReturn} setModal={setModal} workInfo={props.info} />
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
                        <h3>{props.agency}</h3>
                        <div className={styles.separator}></div>
                        <h3>{props.brand}</h3>
                        <div className={styles.separator}></div>
                        <h3>{props.title_es}</h3>
                    </div>
                    {
                        showModal ? (
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} subs={videoDataReturn} setModal={setModal} />
                        ) : null
                    }
                </div>
            }
            
            

        </div>
    );
};


export default Work;