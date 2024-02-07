import { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import LanguajeSelector from "../LanguageSelector/LanguajeSelector";
import {NavContextProvider, useNavContext} from "../../../context/NavContextProvider";
import {LangContextProvider, useLangContext } from "../../../context/LangContextProvider";

const Hero = (props) => {

    const [mouseXDebounce, setMouseXDebounce] = useState(null);
    const [mouseYDebounce, setMouseYDebounce] = useState(null);
    const [throttlePause, setThrottlePause] = useState(null);

    const [isClosed, setIsClosed] = useState(null);

    const np = useNavContext(NavContextProvider);
    const lp = useLangContext(LangContextProvider);
    
    const bgAnimationRef = useRef(null);
    const introRef = useRef(null);

    //const randomIndex = Math.floor(Math.random() * props.hero_image.length);

    Number.prototype.map = function (in_min, in_max, out_min, out_max) {
        return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    useEffect(() => {
        setIsClosed(sessionStorage.getItem('heroIsClosed') ? true : null);
    }, [])
    
    useEffect(() => {

        if(isClosed == null) {
            
            document.body.classList.add("noScroll");

            const throttle = (time, callback) => {
                if (throttlePause) return;
                setThrottlePause(true);
                setTimeout(() => {
                callback();
                setThrottlePause(false);
                }, time);
            };

            introRef.current.addEventListener('mousewheel', (event) => {
                let scrollDirection = get_scroll_direction(event);
                if (scrollDirection < 0) {
                    //console.log('Scroll up');
                } else {
                    //console.log('Scroll down');
                    if (document.body.classList.contains('noScroll')) {
                        intro_leave();
                    }
                }
            });

            introRef.current.addEventListener('DOMMouseScroll', (event) => {
                let scrollDirection = get_scroll_direction(event);
                if (scrollDirection < 0) {
                    //console.log('Scroll up');
                } else {
                    //console.log('Scroll down');
                    if (document.body.classList.contains('noScroll')) {
                        intro_leave();
                    }
                }
            });

            introRef.current.addEventListener('click', () => {
                if (document.body.classList.contains('noScroll')) {
                    intro_leave();
                }
            });

            const intro_leave = () => {
                document.body.classList.remove('noScroll');
                introRef.current.classList.add(`${styles.hidden}`);
                setTimeout(() => {
                        np.setNavStatus(true);
                        sessionStorage.setItem('heroIsClosed', true);
                        setIsClosed(sessionStorage.getItem('heroIsClosed'));
                    }, 1000
                )
            }

            if (!document.body.classList.contains('mobile')) {
                if (document.body.classList.contains('firefox')) {
                    introRef.current.addEventListener('mousemove', (e) => {
                        setMouseXDebounce(e.pageX);
                        setMouseYDebounce(e.pageY)
                    });
                    introRef.current.mousemove(throttle(250, bg_anim_function_debounce));
                } else {
                    introRef.current.addEventListener('mousemove', (e) => {
                        let mouseX = e.pageX;
                        let mouseY = e.pageY;
                        bg_anim_function(mouseX, mouseY, bgAnimationRef.current, 'mousemove');
                    });
                }
            }

            const bg_anim_function_debounce = () => {
                let elem = bgAnimationRef;
                let delta = 20;
                let vent_w = window.screen.width;
                let vent_h = window.screen.height;
                let mouseX_perc = (mouseXDebounce * 100) / vent_w;
                let mouseY_perc = (mouseYDebounce * 100) / vent_h;
        
                elem.setAttribute('data-last-mouseXPerc', mouseX_perc);
                elem.setAttribute('data-last-mouseYPerc', mouseY_perc);
        
                let bg_img_w = elem.offsetWidth;
                let bg_img_h = elem.offsetHeight;
        
                let bg_img_left = ((bg_img_w - vent_w) / 2) - delta;
                let bg_img_top = ((bg_img_h - vent_h) / 2) - delta;
        
                let mouseX_map = mouseXDebounce.map(0, vent_w, bg_img_left, (bg_img_left * -1));
                var mouseY_map = mouseYDebounce.map(0, vent_h, bg_img_top, (bg_img_top * -1));
        
                elem.style.msTransform = "translate(" + mouseX_map + "px, " + mouseY_map + "px)";
                elem.style.mozTransform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
                elem.style.webkitTransform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
                elem.style.transform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
            }

            const bg_anim_function = (mouseX, mouseY, elem, mode) => {
                if (mode == 'resize') {
                    elem.classList.add('noEasing');
                }

                let delta = 20;
        
                let vent_w = window.screen.width;
                let vent_h = window.screen.height;
        
                if (mode == 'mousemove') {
                    let mouseX_perc = (mouseX * 100) / vent_w;
                    let mouseY_perc = (mouseY * 100) / vent_h;
                    elem.setAttribute('data-last-mouseXPerc', mouseX_perc);
                    elem.setAttribute('data-last-mouseYPerc', mouseY_perc);
                } else {
                    mouseX = (mouseX * vent_w) / 100;
                    mouseY = (mouseY * vent_h) / 100;
                }
        
                let bg_img_w = elem.offsetWidth;
                let bg_img_h = elem.offsetHeight;
        
                let bg_img_left = ((bg_img_w - vent_w) / 2) - delta;
                let bg_img_top = ((bg_img_h - vent_h) / 2) - delta;
                
                let mouseX_map = mouseX.map(0, vent_w, bg_img_left, (bg_img_left * -1));
                let mouseY_map = mouseY.map(0, vent_h, bg_img_top, (bg_img_top * -1));
                
                elem.style.msTransform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
                elem.style.mozTransform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
                elem.style.webkitTransform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
                elem.style.transform = "translate(" + mouseX_map + "px," + mouseY_map + "px)";
        
                if (mode == 'resize') {
                    setTimeout(() => {
                        elem.classList.remove('noEasing')
                    }, 50);
                }
        
            }

            const get_scroll_direction = (event_) => {
                let scrollDirection = 0;
                if (event_.type == 'wheel') {
                    scrollDirection = (event_.wheelDelta * -1);
                } else if (event_.type == 'DOMMouseScroll') {
                    scrollDirection = 40 * event_.originalEvent.detail;
                }
                return scrollDirection;
            }

            bg_anim_function((window.screen.width / 2), (window.screen.height / 2), bgAnimationRef.current, 'mousemove');

        }

    },[]);

    

    return(
        isClosed == null ?
        (
            <section 
                className={styles.hero}
                ref={introRef}
            >
                    <div className={styles.bgImgAnimationWrapper}>
                        <div 
                            className={styles.bgImgAnimation} 
                            //style={{backgroundImage: `url("${props.hero_image[0]}")`}}
                            style={{backgroundImage: `url("${props.hero_image}")`}}
                            ref={bgAnimationRef}
                        />
                    </div>
                    <figure className={styles.logo}>
                        <img 
                            src={props.logo}
                        />
                    </figure>
                    <LanguajeSelector 
                        tc={"black"} 
                        from={"hero"}
                    />
            </section>
        ) : null
        
    );
};

export default Hero;