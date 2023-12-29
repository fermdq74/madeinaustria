import styles from "./styles.module.scss";

const Album = (props) => {

    const openModal = () => {
        props.setModal(props.index);
        props.setAlbumIndex(props.index);
    }

    return (

        
            props.fromGrid ? 
            (
                <div 
                    className={styles.albumGrid}
                    onClick={openModal} 
                >
                        <img 
                            src={props.gallery[0]}
                        />
                        <div className={styles.albumData}>
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
                                props.campaign ?
                                    <>
                                        <h3>{props.campaign}</h3>
                                        <div className={styles.separator}></div>    
                                    </>
                                :
                                    null
                            }
                            <h3>{props.client}</h3>
                        </div>    
                </div>
            )
            :
            (
                <div 
                    className={styles.album}
                    onClick={openModal} 
                >
                        <img src={props.gallery[0]} className={props.full ? styles.full : null} />
                        <div className={styles.albumData}>
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
                                props.campaign ?
                                    <>
                                        <h3>{props.campaign}</h3>
                                        <div className={styles.separator}></div>    
                                    </>
                                :
                                    null
                            }
                            <h3>{props.client}</h3>
                        </div>    
                </div>
            )
            
        
        
    );
};

export default Album;