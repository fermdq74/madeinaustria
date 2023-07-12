import Image from "next/image";

const Hero = (props) => {

    return(
        <section>
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
        </section>
    );
};

export default Hero;