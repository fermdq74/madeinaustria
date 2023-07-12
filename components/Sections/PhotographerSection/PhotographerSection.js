import Photography from "../Photography/Photography";

const PhotographerSection = (props) => {

    return (
        <section>
            <h1>{props.photographer}</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {props.photographs.map((photography) => (
                    <Photography 
                        key={photography.id}
                        image_gallery={photography.image_gallery[0]}
                        client={photography.client}
                        campaign={photography.campaign}
                        year={photography.year}
                    />  
                ))}
            </div>
        </section>
    );
};

export default PhotographerSection;