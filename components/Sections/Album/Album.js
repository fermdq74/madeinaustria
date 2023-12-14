import styles from "./styles.module.scss";

const Album = (props) => {

    console.log("test");

    return (
        <div className={styles.album}>
            <p>{props.client}</p>
            <p>{props.agency}</p>
            <p>{props.campaign}</p>
        </div>
    );
};

export default Album;