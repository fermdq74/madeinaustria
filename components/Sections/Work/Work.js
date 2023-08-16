import React from 'react';

import Image from "next/image";
import { useEffect, useState } from "react";
import parse from 'html-react-parser';

import VideoJS from '../../VideoJS/VideoJS';

const Work = (props) => {

    const [showModal, setModal] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoTracks, setVideoTracks] = useState(null);
    const playerRef = React.useRef(null);

    useEffect(() => {
        fetchVideo();
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
    
    const finalUrl = videoUrl ? Array.isArray(videoUrl) && videoUrl.length > 0 ? videoUrl[0].url : "" : "";
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
          src: finalUrl,
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

    return (
        <div style={ (props.featured == true ) ? {height: "500px", width: "100%", position: "relative"} : {height: "250px", width: "50%", position: "relative"} }>
            <Image 
                src={props.featured_image}
                layout='fill'
                alt="Feat image"
            />
            <div style={{position:"relative"}} className="work-box" data-video-id="536511800">
                <p>{props.work_director.director_name}</p>
                <p>{props.agency}</p>
                <p>{props.brand}</p>
                <p>{props.title_es}</p>
                <span style={{cursor:"pointer"}} onClick={openModal}> open video </span>
                    {
                        showModal ? (
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} subs={videoDataReturn} setModal={setModal} />
                        ) : null
                    }
            </div>
        </div>
    );
};


export default Work;