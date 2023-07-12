import Image from "next/image";

const Work = (props) => {
    return (
        <div style={ (props.featured == true ) ? {height: "500px", width: "100%", position: "relative"} : {height: "250px", width: "50%", position: "relative"} }>
            <Image 
                src={props.featured_image}
                layout='fill'
                alt="Feat image"
            />
            <div style={{position:"relative"}}>
                <p>{props.work_director.director_name}</p>
                <p>{props.agency}</p>
                <p>{props.brand}</p>
                <p>{props.title_es}</p>
            </div>
        </div>
    );
};

export default Work;