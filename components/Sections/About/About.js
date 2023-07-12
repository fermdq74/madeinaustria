import Image from "next/image";
import { TinaMarkdown } from 'tinacms/dist/rich-text';

const About = (props) => {

    return (
        <section style={{display: "flex"}}>
            <div style={{height: "500px", width: "50%", position: "relative"}}>
                <Image 
                    src={props.image}
                    layout='fill'
                    alt="About image"
                />
                <h1>{props.title}</h1>
            </div>
            <div style={{height: "500px", width: "50%", position: "relative"}}>
                <TinaMarkdown content={props.body} />
            </div>
        </section>
    );
};

export default About;