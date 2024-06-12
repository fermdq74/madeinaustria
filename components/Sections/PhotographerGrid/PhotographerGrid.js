import { LangContextProvider, useLangContext } from "../../../context/LangContextProvider";
import { NavContextProvider, useNavContext } from "../../../context/NavContextProvider";
import { useState, useRef, useEffect } from "react";
import Album from "../Album/Album";
import AlbumSlider from "../AlbumSlider/AlbumSlider";
import styles from "./styles.module.scss";

const PhotographerGrid = (props) => {

    const [showModal, setModal] = useState(-1);
    const [albumIndex, setAlbumIndex] = useState(null);
    
    const lp = useLangContext(LangContextProvider);
    const np = useNavContext(NavContextProvider);
    
    useEffect(() => {
        np.setSiteLocation(lp.languaje == 'es' ? 'Fotografos' : 'Photographers');
        np.setSubpageLocation(props.photographer.photographer_name);
        np.setNavStatus(true);
    });

    useEffect(() => {
        np.setSiteLocation(lp.languaje == 'es' ? 'Fotografo' : 'Photographer');    
    }, [lp.languaje]);

    const closePersonInfo = () => {
        np.setPersonDescription(false);
    }

    return (
        <section className={styles.photographerGrid}>

            <div className={`${styles.directorDescription} ${np.personDescription ? styles.open : null}`}>
                
                {
                    lp.languaje == 'es' ?
                        props.photographer.photographer_description.children.map((description, idx) => (
                            <p key={idx}>
                                {description.children[0].text}
                            </p>
                        ))
                    :
                        props.photographer.photographer_description_eng.children.map((description, idx) => (
                            <p key={idx}>
                                {description.children[0].text}
                            </p>
                        ))
                }
                <button onClick={closePersonInfo}>
                    {lp.languaje == 'es' ? 'Cerrar' : 'Close'}
                </button>
            </div>

            {props.photographs?.map((photo, index) => {
                  
                return(
                    index == 0 ? (
                    
                        <div 
                            className={styles.mainPhoto}
                            key={index}
                        >
                            
                            <Album 
                                key={photo.id}
                                client={photo.client}
                                agency={photo.agency}
                                campaign={photo.campaign}
                                gallery={photo.image_gallery}
                                fromGrid={true}
                                setModal={setModal}
                                setAlbumIndex={setAlbumIndex}
                                index={index}
                            />
                        </div>
                    ) : (
                        <div 
                            className={styles.secondaryPhoto}
                            key={index}
                        >
                            <Album 
                                key={photo.id}
                                client={photo.client}
                                agency={photo.agency}
                                campaign={photo.campaign}
                                gallery={photo.image_gallery}
                                fromGrid={true}
                                setModal={setModal}
                                setAlbumIndex={setAlbumIndex}
                                index={index}
                            />
                        </div>

                    )
                )
            })}

            {
                showModal != -1 ? (
                    <AlbumSlider 
                        images={props.photographs[albumIndex].image_gallery} 
                        setModal={setModal} 
                        setAlbumIndex={setAlbumIndex}
                        albumPrev={albumIndex - 1} 
                        albumNext={albumIndex + 1} 
                        albumLength={props.photographs.length}
                    />
                ) : null
            }
            
        </section>
    );

};

export default PhotographerGrid;