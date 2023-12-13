import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import { useState, useRef, useEffect } from "react";
import Work from "../Work/Work";
import styles from "./styles.module.scss";

const DirectorGrid = (props) => {

    const [showModal, setModal] = useState(null);

    const [workSelectedIndex, setWorkSelectedIndex] = useState(null);
    const [workPrev, setWorkPrev] = useState(null);
    const [workNext, setWorkNext] = useState(null);
    
    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);

    useEffect(() => {
        np.setNavStatus(true);
    }, []);

    useEffect(() => {
        setWorkPrev(props.works[workSelectedIndex - 1]);
        setWorkNext(props.works[workSelectedIndex + 1]);
    }, [workSelectedIndex]);

    return (
        <section className={styles.directorGrid}>
            {props.works.map((work, index, array) => {
                  
                return(
                    index == 0 ? (
                    
                        <div 
                            className={styles.mainWork}
                            key={work.id}
                        >
                            
                            <Work 
                                key={work.id}
                                featured_image={work.featured_image} 
                                work_director={work.work_director}
                                agency={work.agency}
                                brand={work.brand}
                                title_es={work.title_es}
                                video_url={work.video_url}
                                featured={true}
                                from={"directorGrid"}
                                showModal={showModal}
                                setModal={setModal}
                                info={work.info_work.children}
                                fromSlider={false}
                                setWorkSelectedIndex={setWorkSelectedIndex}
                                workSelectedIndex={workSelectedIndex}
                                index={index}
                                workPrev={workPrev}
                                workNext={workNext}
                            />  
                        </div>
                    ) : (
                        <div className={styles.secondaryWork}>
                            <Work 
                                key={work.id}
                                featured_image={work.featured_image} 
                                work_director={work.work_director}
                                agency={work.agency}
                                brand={work.brand}
                                title_es={work.title_es}
                                video_url={work.video_url}
                                featured={true}
                                from={"directorGrid"}
                                showModal={showModal}
                                setModal={setModal}
                                info={work.info_work.children}
                                fromSlider={false}
                                setWorkSelectedIndex={setWorkSelectedIndex}
                                workSelectedIndex={workSelectedIndex}
                                index={index}
                                workPrev={workPrev}
                                workNext={workNext}
                            />
                        </div>

                    )
                )
            })}
            
        </section>
    );

};

export default DirectorGrid;