import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import { useState, useRef, useEffect } from "react";
import Work from "../Work/Work";
import styles from "./styles.module.scss";

const DirectorGrid = (props) => {

    const [showModal, setModal] = useState(null);
    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);

    useEffect(() => {
        np.setNavStatus(true);
    }, []);

    console.log("PROPS: ", props);

    return (
        <section className={styles.directorGrid}>
            {props.works.map((work, index) => {
                  
                return(
                    index == 0 ? (
                    
                        <div className={styles.mainWork}>
                            {console.log("WWWW: ", work)}
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
                            />
                        </div>

                    )
                )
            })}
            
        </section>
    );

};

export default DirectorGrid;