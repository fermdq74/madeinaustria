import Image from "next/image";

const Photography = (props) => {

    return (
        <div style={{height: "500px", width: "33.333%", position: "relative"}}>
            <Image 
                src={props.image_gallery}
                layout='fill'
                alt="gallery image"
            />
            <div style={{position:"relative"}}>
                <p>{props.client}</p>
                <p>{props.campaign}</p>
                <p>{props.year}</p>
            </div>
        </div>
    );
};

export default Photography;