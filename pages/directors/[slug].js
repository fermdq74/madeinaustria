import NavContextProvider from "../../context/NavContextProvider";
import { Layout } from "../../components/Layout/Layout";
import DirectorSection from "../../components/Sections/DirectorSection/DirectorSection";
import { client } from "../../tina/__generated__/client";

export default function DirectorsSlug(props) {



    return (
      <p>qwe</p>        
    );
}

export const getStaticPaths = async () => {

  const directors = await client.queries.directorsConnection();

  const paths = directors.data.directorsConnection.edges.map((director) => (
    {
      params: {slug: director.node.director_slug},
    }
  ));

  return {
      paths,
      fallback: 'blocking'
  }
}

  export const getStaticProps = async ({params}) => {

    const director = await fetchDirectorBySlug(params.slug);

    if (!director) {
      return {
        notFound: true, // Redirige a la página 404
      };
    }

    const works = await fetchWorksByDirector(director);

    return {
      props: {
        director,
      },
    };
    
  };

  export async function fetchDirectorBySlug(slug) {
    try {
      const response = await client.queries.directors({
        relativePath: `${slug}.md`,
      });
  
      const director = response.data;
  
      if (!director) {
        return null;
      }
  
      return director;
    } catch (error) {
      console.error('Error fetching director:', error);
      return null;
    }
  }

  export async function fetchWorksByDirector(director) {
    try {

      const response = await client.queries.worksConnection();

      const works = response.data.worksConnection.edges.map((edge) => {
        const work = edge.node; // Ajusta esto según la estructura real de tus datos
        const directorSlug = director.directors.director_slug;
  
        // Verifica si work_director está definido y contiene director_slug
        if (work.work_director && work.work_director.director_slug && work.work_director.director_slug.includes(directorSlug)) {
          return work;
        } else {
          return null;
        }
      }).filter(Boolean);

      console.log("works filtrados: ", works);
  
      return works;
    } catch (error) {
      console.error('Error fetching works:', error);
      return null;
    }
  }
  
  const getWorkDataArray = (works) => {
    const worksData = works.data.worksConnection.edges.map((work) => {
      return { 
        title_eng: work.node.title_eng,
        title_es: work.node.title_es,
        agency: work.node.agency,
        brand: work.node.brand,
        featured_image: work.node.featured_image,
        featured_work: work.node.featured_work,
        hidde_reel: work.node.hidde_reel,
        pemalink: work.node.permalink,
        video_thumbnail: work.node.video_thumbnail,
        video_url: work.node.video_url,
        work_director: work.node.work_director,
        id: work.node.id,
      }
    });
  
    return worksData;
  };
  
  const getDirectorDataArray = (directors) => {
    const directorsData = directors.data.directorsConnection.edges.map((director) => {
      return { 
        id: director.node.id,
        director_name: director.node.director_name,
        director_description: director.node.director_description,
        director_order: director.node.director_order,
      }
    });
    return directorsData;
  };
  
  const directorWorks = (id, works) => {
    
    const dw = [];
    works.map((work) => {
      if(work.work_director.id == id) {
        dw.push(work);
      }
    });
  
    return dw;
  };