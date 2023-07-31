import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import styles from "./styles.module.scss";

export const VideoJS = (props) => {

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
  const ccRef = React.useRef(null);
  const ccUlRef = React.useRef(null);
  const closeRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    if (!playerRef.current) {

        const playerWrapper = playerWrapperRef.current;
        const sectorVideo = sectorRef.current;
        const playVideo = playRef.current;
        const pauseVideo = pauseRef.current;
        const timelineVideo = timelineRef.current;
        const bufferVideo = bufferRef.current;
        const progressVideo = progressRef.current;
        const fullVideo = fullRef.current;
        const videoCc = ccRef.current;
        const videoccUl = ccUlRef.current;
        const videoClose = closeRef.current;

        const videoElement = document.createElement("video-js");

        videoElement.classList.add('vjs-big-play-centered');
        videoRef.current.appendChild(videoElement);

        const player = playerRef.current = videojs(videoElement, options, () => {
            videojs.log('player is ready');
            onReady && onReady(player);
        });

        //Settings and Listeners
        player.ready(function () {

            let playProgressInterval;

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
                clearInterval(playProgressInterval);
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
                player.pause();
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

            //Subs Settings
            if (props.subs != null) {
                subsSettings();
                let currentLang = document.getElementById("current-lang").getAttribute('data-value');
                //setCurrentLangSub(currentLang, player.textTracks());
            }
    
            function subsSettings() {
                let subTracks = player.textTracks();
    
                for (let i = 0; i < subTracks.length; i++) {
                    player.removeRemoteTextTrack(subTracks[i]);
                }
    
                let submenuAppend = '';
                
                props.subs.forEach(function(sub) {
                    var lang_string = sub.lang;
                    submenuAppend += '<li data-sub-lang="' + lang_string + '" id="dsl-' + lang_string + '">' + lang_string + '</li>';
                    const trackE = player.addRemoteTextTrack({kind: 'subtitles', src: 'https://vimeo.com' + sub.url, srclang: lang_string});
                });
    
                submenuAppend += '<li data-sub-lang="">Off</li>';
    
                videoccUl.innerHTML = '';
                videoccUl.innerHTML = submenuAppend;
                videoccUl.classList.remove('submenu-on');
                videoccUl.childNodes[0].classList.remove('active');
            }
    
            function setCurrentLangSub(currentLang, vSubTracks) {
                if (currentLang == 'en') {
    
                    if(document.getElementById("dsl" + currentLang) != null) {
                        document.getElementById("dsl-" + currentLang).classList.add('active');
                    }
                    for (let i = 0; i < vSubTracks.length; i++) {
                        let track = vSubTracks[i];
                        if (track.language == currentLang) {
                            track.mode = 'showing';
                        } else {
                            track.mode = 'hidden';
                        }
                    }
                }
            }
            //End Subs Settings

            //Listener Subs
            if(videoccUl.childNodes.length > 0) {
                if(videoccUl.childNodes.length == 2){

                    videoccUl.childNodes[0].addEventListener("click", () => {
                        videoccUl.classList.remove(styles.show);
                        if (!playerWrapper.classList.contains('loading')) {

                            if(!videoccUl.childNodes[0].classList.contains('active')) {
                                if(videoccUl.childNodes[1].classList.contains("active")) {
                                    videoccUl.childNodes[1].classList.remove("active");
                                }
                                videoccUl.childNodes[0].classList.add('active');
                                let esteLang = videoccUl.childNodes[0].getAttribute('data-sub-lang');
                                for (let i = 0; i < player.textTracks().length; i++) {
                                    let track = player.textTracks()[i];
                                    if (track.language == esteLang) {
                                        track.mode = 'showing';
                                    } else {
                                        track.mode = 'hidden';
                                    }
                                }
                            }
                        }
                    });

                    videoccUl.childNodes[1].addEventListener("click", () => {
                        videoccUl.classList.remove(styles.show);
                        if (!playerWrapper.classList.contains('loading')) {

                            if(!videoccUl.childNodes[1].classList.contains('active')) {
                                if(videoccUl.childNodes[0].classList.contains("active")) {
                                    videoccUl.childNodes[0].classList.remove("active");
                                }
                                videoccUl.childNodes[1].classList.add('active');
                                let esteLang = videoccUl.childNodes[1].getAttribute('data-sub-lang');
                                for (let i = 0; i < player.textTracks().length; i++) {
                                    let track = player.textTracks()[i];
                                    if (track.language == esteLang) {
                                        track.mode = 'showing';
                                    } else {
                                        track.mode = 'hidden';
                                    }
                                }
                            }
                        }
                    });
                }
                if(videoccUl.childNodes.length == 1) {
                    videoccUl.classList.remove(styles.show);
                }
                if(videoccUl.childNodes.length > 2) {
                    for(let i=0; i < videoccUl.childNodes.length; i++ ) {
                    
                        videoccUl.childNodes[i].addEventListener("click", () => {
                            if (!playerWrapper.classList.contains('loading')) {
                                
                                
                                if(!videoccUl.childNodes[i].classList.contains('active')) {
                                    for(let j=0; j < videoccUl.childNodes.length; j++) {
                                        if(videoccUl.childNodes[j].classList.contains('active')){
                                            videoccUl.childNodes[j].classList.remove('active');
                                        }
                                    }
                                    
                                    videoccUl.childNodes[i].classList.add('active');
                                    let esteLang = videoccUl.childNodes[i].getAttribute('data-sub-lang');
                                    for (i = 0; i < player.textTracks().length; i++) {
                                        let track = player.textTracks()[i];
                                        if (track.language == esteLang) {
                                            track.mode = 'showing';
                                        } else {
                                            track.mode = 'hidden';
                                        }
                                    }
                                    ccUlRef.current.classList.add(styles.hidde);
                                    videoccUl.classList.remove(styles.show);
                                }
        
                            }
                        });
                        
                    }
                }
            }
            //End Listener Subs

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
                stopTrackingPlayProgress();
                //player.dispose();
                //playerRef.current = null;
                props.setModal(false);
            });

            var timeoutMouseMove = null;

            sectorVideo.addEventListener("mousemove", function () {
                if (timeoutMouseMove !== null) {
                    playerWrapper.classList.remove(`${styles.hideElements}`);
                    clearTimeout(timeoutMouseMove);
                }

                timeoutMouseMove = setTimeout(function () {
                    playerWrapper.classList.add(`${styles.hideElements}`);
                }, 3000);
            });

            console.log("PLAYER: ", player);

        });
        //End Settings and Listeners


    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);


  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  
  const openCC = () => {
        ccUlRef.current.classList.add(styles.show);
  };

  return (
    <div className={styles.popupContainer}>
        <div data-vjs-player className={`${styles.player} ${styles.paused}`} ref={playerWrapperRef}>
            <div ref={videoRef} />

            <div className={styles.sector} ref={sectorRef}></div>
            <div className={styles.closePlayer} ref={closeRef}></div>
            <div className={styles.playerInfo}>
                <p className="player-text-doble"><span className="player-video-agencia">Agencia</span> | <span className="player-video-marca">Marca</span></p>
                <p className="player-video-director">Director</p>
                <p className="player-video-titulo">Titulo</p>
            </div>
            <div className={styles.playerControls}>
                <div className={styles.timeline} ref={timelineRef}>
                    <div className={styles.buffer} ref={bufferRef}></div>
                    <div className={styles.progress} ref={progressRef}></div>
                    <div></div>
                </div>
                <div className={`${styles.btn} ${styles.play} ${styles.hidden}`} ref={playRef}></div>
                <div className={`${styles.btn} ${styles.pause} ${styles.hidden}`} ref={pauseRef}></div>
                <div className={`${styles.btn} ${styles.full}`} ref={fullRef}></div>
                <div className={`${styles.btn} ${styles.subs}`} ref={ccRef}>
                    <span onClick={openCC}>CC</span>
                    <ul className={styles.hidde} ref={ccUlRef}></ul>
                </div>
            </div>

        </div>
    </div>
  );
}

export default VideoJS;