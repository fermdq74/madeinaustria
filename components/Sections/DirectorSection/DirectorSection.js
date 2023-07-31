import Work from "../Work/Work";

const DirectorSection = (props) => {

    return (
        <section>
            <h1>{props.director}</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {props.works.map((work) => (
                    <Work 
                        key={work.id}
                        featured_image={work.featured_image} 
                        work_director={work.work_director}
                        agency={work.agency}
                        brand={work.brand}
                        title_es={work.title_es}
                        video_url={work.video_url}
                        featured={false}
                    />  
                ))}
            </div>
        </section>
    );
};

export default DirectorSection;