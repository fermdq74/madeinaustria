import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import { useState, useEffect } from "react";
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
        np.setSiteLocation(lp.languaje == 'es' ? 'Director' : 'Director');
        np.setSubpageLocation(props.director.director_name);
        np.setNavStatus(true);
    }, []);

    useEffect(() => {
        setWorkPrev(props.works[workSelectedIndex - 1]);
        setWorkNext(props.works[workSelectedIndex + 1]);
    }, [workSelectedIndex]);

    const closePersonInfo = () => {
        np.setPersonDescription(false);
    }

    return (
        <section className={styles.directorGrid}>

            <div className={`${styles.directorDescription} ${np.personDescription ? styles.open : null}`}>
                
                {
                    lp.languaje == 'es' ?
                    props.director.director_description.children.map((description, idx) => (
                        <p key={idx}>
                            {description.children[0].text}
                        </p>                        
                    ))
                    :
                    props.director.director_description_eng.children.map((description, idx) => (
                        <p key={idx}>
                            {description.children[0].text}
                        </p>                        
                    ))
                }
                <button onClick={closePersonInfo}>
                    {lp.languaje == 'es' ? 'Cerrar' : 'Close'}
                </button>
            </div>

            {props.works.map((work, index) => {
                  
                return(
                    index == 0 ? (
                    
                        <div 
                            className={styles.mainWork}
                            key={index}
                        >
                            
                            <Work 
                                key={work.id}
                                featured_image={work.featured_image} 
                                work_director={work.work_director}
                                agency={work.agency}
                                brand={work.brand}
                                title_es={work.title_es}
                                title_en={work.title_eng}
                                video_url={work.video_url}
                                featured={true}
                                from={"directorGrid"}
                                showModal={showModal}
                                setModal={setModal}
                                info={work.info_work.children}
                                info_en={work.info_work_eng.children}
                                fromSlider={false}
                                setWorkSelectedIndex={setWorkSelectedIndex}
                                workSelectedIndex={workSelectedIndex}
                                index={index}
                                workPrev={workPrev}
                                workNext={workNext}
                            />  
                        </div>
                    ) : (
                        <div 
                            className={styles.secondaryWork} 
                            key={index}
                        >
                            <Work 
                                key={work.id}
                                featured_image={work.featured_image} 
                                work_director={work.work_director}
                                agency={work.agency}
                                brand={work.brand}
                                title_es={work.title_es}
                                title_en={work.title_eng}
                                video_url={work.video_url}
                                featured={true}
                                from={"directorGrid"}
                                showModal={showModal}
                                setModal={setModal}
                                info={work.info_work.children}
                                info_en={work.info_work_eng.children}
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