import Work from "../Work/Work";

const FeaturedWorks = (props) => {

    return (
        <section>
            {props.works.map((work) => (
                <Work 
                    key={work.id}
                    featured_image={work.featured_image} 
                    work_director={work.work_director}
                    agency={work.agency}
                    brand={work.brand}
                    title_es={work.title_es}
                    video_url={work.video_url}
                    featured={true}
                />  
            ))}
        </section>
    );
};

export default FeaturedWorks;