import Image from "next/image";
import styles from "./styles.module.scss";

const Hero = (props) => {

    return(
        <section class={styles.hero}>
            <div style={{
                backgroundImage: `url("${props.hero_image[0]}")`
                }}
                className={styles.bgImage}
            ></div>

            <figure className={styles.logo}>
                <img 
                    src={props.logo}
                />
            </figure>

            {/*}
            <div style={{height: "500px", width: "100%", position: "relative"}}>
                <Image 
                    src={props.hero_image[0]}
                    layout='fill'
                    alt="Hero image"
                />
                <Image 
                    src={props.logo}
                    width={80}
                    height={50}
                    alt="Logo image"
                />
            </div>
            {*/}


        </section>
    );
};

export default Hero;