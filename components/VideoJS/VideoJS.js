import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import styles from "./styles.module.scss";
import { LangContextProvider, useLangContext } from "../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../context/NavContextProvider";

export const VideoJS = (props) => {

    const [wInfo, setWInfo] = React.useState(props.workInfo);
    const [wInfoEn, setWInfoEn] = React.useState(props.workInfoEn);

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);
    const playerWrapperRef = React.useRef(null);
    const sectorRef = React.useRef(null);
    const playRef = React.useRef(null);
    const pauseRef = React.useRef(null);
    const timelineRef = React.useRef(null);
    const bufferRef = React.useRef(null);
    const progressRef = React.useRef(null);
    const fullRef = React.useRef(null);
    const closeRef = React.useRef(null);
    const moreInfoRef = React.useRef(null);
    const playerInfoRef = React.useRef(null);
    const volumeRef = React.useRef(null);
    const volumeLevelRef = React.useRef(null);
    const volumeWrapperRef = React.useRef(null);
    const {options, onReady} = props;

    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);

    React.useEffect(() => {

        if(props.from == 'directorSection' || props.from == 'featuredWorks') {
            document.body.classList.add('sd');
        }
        
        if (!playerRef.current) {

            const playerWrapper = playerWrapperRef.current;
            const sectorVideo = sectorRef.current;
            const playVideo = playRef.current;
            const pauseVideo = pauseRef.current;
            const timelineVideo = timelineRef.current;
            const bufferVideo = bufferRef.current;
            const progressVideo = progressRef.current;
            const fullVideo = fullRef.current;
            const videoClose = closeRef.current;
            const moreInfo = moreInfoRef.current;
            const playerInfo = playerInfoRef.current;
            const volumeWrapper = volumeWrapperRef.current;
            const volume = volumeRef.current;
            const volumeLevel = volumeLevelRef.current;

            let playProgressInterval;

            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });

            //Settings and Listeners
            player.ready(function () {

                //Buffer settings
                player.on("progress", () => {
                    let bufferPorc = ((player.buffered().end(0) - player.buffered().start(0)) * 100 ) / player.duration();
                    bufferVideo.style.width = bufferPorc + "%";
                });

                //Play settings
                player.on('play', () => {
                    trackPlayProgress();
                    playerWrapper.classList.remove(`${styles.paused}`);
                    playVideo.classList.add(`${styles.hidden}`);
                    pauseVideo.classList.remove(`${styles.hidden}`);
                });

                const trackPlayProgress = () => {
                    playProgressInterval = setInterval(updatePlayProgress, 33);
                }

                const updatePlayProgress = () => {
                    let timePorc = (player.currentTime() * 100) / player.duration();
                    progressVideo.style.width = timePorc + "%";
                }
                
                //Pause settings
                player.on('pause', () => {
                    stopTrackingPlayProgress();
                    playerWrapper.classList.add(`${styles.paused}`);
                    playVideo.classList.remove(`${styles.hidden}`);
                    pauseVideo.classList.add(`${styles.hidden}`);
                });

                function stopTrackingPlayProgress() {
                    if(playProgressInterval) {
                        clearInterval(playProgressInterval);
                    }
                }
        
                //Full screen settings
                player.on('fullscreenchange', function () {
                    if (player.isFullscreen()) {
                        playerWrapper.classList.add('isFullScreen');
                    } else {
                        playerWrapper.classList.remove('isFullScreen');
                    }
                });
        
                //End video settings
                player.on('ended', function () {
                    if(props.from == 'directorSection' || props.from == 'featuredWorks') {
                        document.body.classList.remove('sd');
                    }
                    player.src(options.sources);
                    setWInfo(props.workInfo);
                    setWInfoEn(props.workInfoEn);
                    stopTrackingPlayProgress();
                    player.pause();
                    player.dispose();
                    playerRef.current = null;
                    props.setModal(false);
                    np.setVideoOpen(false);
                });

                //Play button listener
                playVideo.addEventListener("click", () => {
                    if (!playerWrapper.classList.contains('loading')) {
                        if (player.paused()) {
                            player.play();
                        }
                    }
                });
                
                //Pause button listener
                pauseVideo.addEventListener("click", () => {
                    if (!playerWrapper.classList.contains('loading')) {
                        if (player.play()) {
                            player.pause();
                        }
                    }
                }); 
        
                //Area player listener
                sectorVideo.addEventListener("click", () => {
                    if (!playerWrapper.classList.contains('loading')) {
                        if (player.paused()) {
                            player.play();
                        } else {
                            player.pause();
                        }
                    }
                });
        
                //Full screen button listener
                fullVideo.addEventListener("click", () => {
                    if (!playerWrapper.classList.contains('loading')) {
                        if (!player.isFullscreen()) {
                            player.requestFullscreen();
                        } else {
                            player.exitFullscreen();
                        }
                    }
                });

                timelineVideo.addEventListener("click", (event) => {
                    if (!playerWrapper.classList.contains('loading')) {
                        let posPorc = ( ((event.pageX) - (parseInt(timelineVideo.getBoundingClientRect().left))) * 100 ) / timelineVideo.getBoundingClientRect().width;
                        let currentTime = ((posPorc * (player.duration())) / 100);
                        player.currentTime(currentTime);
                        let timePorc = (player.currentTime() * 100) / player.duration();
                        progressVideo.style.width = timePorc + "%";
                    }
                });

                videoClose.addEventListener("click", () => {
                    if(props.from == 'directorSection' || props.from == 'featuredWorks') {
                        document.body.classList.remove('sd');
                    }
                    player.src(options.sources);
                    setWInfo(props.workInfo);
                    setWInfoEn(props.workInfoEn);
                    stopTrackingPlayProgress();
                    player.pause();
                    player.dispose();
                    playerRef.current = null;
                    props.setModal(false);
                    np.setVideoOpen(false);
                });

                volume.addEventListener("click", () => {
                    console.log("ASD");
                    volumeWrapper.classList.toggle(`${styles.open}`);
                });

                volumeLevel.addEventListener('input', (event) => {
                    const volumeValue = parseFloat(event.target.value) / 100;
                    player.volume(volumeValue);
                });

                moreInfo.addEventListener("click", () => {
                    playerInfo.classList.toggle(`${styles.open}`);
                    videoClose.classList.toggle(`${styles.hidden}`);
                });

                let timeoutMouseMove = null;

                sectorVideo.addEventListener("mousemove", function () {
                    if (timeoutMouseMove !== null) {
                        playerWrapper.classList.remove(`${styles.hideElements}`);
                        clearTimeout(timeoutMouseMove);
                    }

                    timeoutMouseMove = setTimeout(function () {
                        playerWrapper.classList.add(`${styles.hideElements}`);
                    }, 3000);
                });

            });
            //End Settings and Listeners


        } else {
            const player = playerRef.current;
            player.autoplay(false);
            player.src(options.sources);
        }
    }, [videoRef]);


    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
        if (player && !player.isDisposed()) {
            player.dispose();
            playerRef.current = null;
        }
        };
    }, [playerRef]);

    React.useEffect(() => {
        
        closeRef.current.innerHTML = lp.languaje == 'es' ? '← volver' : '← return';
        
    }, [lp.languaje]);

    React.useEffect(() => {
        if(props.fromSlider == false) {
            props.setWorkSelectedIndex(props.index);
        }
    }, []);

    React.useEffect(() => {
        np.setVideoOpen(true);
    }, []);

    const changePrev = () => {
        const player = playerRef.current;
        if (!playerWrapperRef.current.classList.contains('loading')) {
            if (player.play()) {
                player.pause();
            }
        }
        setWInfo(props.workPrev.info_work.children);
        setWInfoEn(props.workPrev.info_work_eng.children);
        player.autoplay(true);
        player.src(props.workPrev.video_url);
        props.setWorkSelectedIndex(props.workSelectedIndex - 1);
    }

    const changeNext = () => {
        const player = playerRef.current;
        if (!playerWrapperRef.current.classList.contains('loading')) {
            if (player.play()) {
                player.pause();
            }
        }
        setWInfo(props.workNext.info_work.children);
        setWInfoEn(props.workNext.info_work_eng.children);
        player.autoplay(true);
        player.src(props.workNext.video_url);
        props.setWorkSelectedIndex(props.workSelectedIndex + 1);
    }

    return (
        <div className={`${styles.popupContainer} popupContainer`}>
            <div data-vjs-player className={`${styles.player} ${styles.paused}`} ref={playerWrapperRef}>
                <div ref={videoRef} />

                <div className={styles.sector} ref={sectorRef}></div>
                <div className={styles.closePlayer} ref={closeRef}>← volver</div>
                
                <div className={styles.playerInfo} ref={playerInfoRef}>
                    <div className={styles.moreInfo} ref={moreInfoRef}>info</div>
                    <div className={styles.overlay}></div>
                    {
                        lp.languaje == 'es' ?
                            wInfo.map((info, idx) => (
                                <p key={idx}>
                                    {info.children[0].text ? info.children[0].text : ""}
                                </p>
                            ))
                        :
                            wInfoEn.map((info, idx) => (
                                <p key={idx}>
                                    {info.children[0].text ? info.children[0].text : ""}
                                </p>
                            ))
                    }
                </div>
                <div className={styles.playerControls}>
                    <div className={styles.timeline} ref={timelineRef}>
                        <div className={styles.buffer} ref={bufferRef}></div>
                        <div className={styles.progress} ref={progressRef}></div>
                    </div>
                    <div className={`${styles.btn} ${styles.play} ${styles.hidden}`} ref={playRef}></div>
                    <div className={`${styles.btn} ${styles.pause} ${styles.hidden}`} ref={pauseRef}></div>
                    <div className={`${styles.btn} ${styles.full}`} ref={fullRef}></div>
                    <div className={styles.volumeControl}>
                        <div 
                            className={styles.volumeRegulator} 
                            ref={volumeWrapperRef}
                        >
                            <input
                                type="range"
                                min="0"
                                max="100"
                                className={styles.volumeLevel}
                                ref={volumeLevelRef} 
                            />
                        </div>
                        
                        <button 
                            className={`${styles.btn} ${styles.volumeButton}`} 
                            ref={volumeRef}
                        />
                    </div>
                    {
                        props.fromSlider == false ? 
                        <div className={styles.navWrapper}>
                            <button 
                                onClick={props.workPrev ? changePrev : null}
                                className={props.workPrev ? null : styles.disabled}
                            >
                                {
                                    lp.languaje == 'es' ? `${window.innerWidth >= 768 ? '←': ''}video anterior` : `${window.innerWidth >= 768 ? '←': ''}previous video`
                                }
                            </button>

                            <button 
                                onClick={props.workNext ? changeNext : null}
                                className={props.workNext ? null : styles.disabled}
                            >
                                
                                {
                                    lp.languaje == 'es' ? `video siguiente ${window.innerWidth >= 768 ? '→': ''}` : `next video ${window.innerWidth >= 768 ? '→' : ''}`
                                }
                            </button>
                        </div>
                        :
                        null

                    }
                    
                </div>

            </div>
        </div>
    );
}

export default VideoJS;