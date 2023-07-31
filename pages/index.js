import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout/Layout";

import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

import Hero from "../components/Sections/Hero/Hero";
import FeaturedWorks from "../components/Sections/FeaturedWorks/FeaturedWorks";
import About from "../components/Sections/About/About";
import DirectorSection from "../components/Sections/DirectorSection/DirectorSection";
import PhotographerSection from "../components/Sections/PhotographerSection/PhotographerSection";

export default function Home(props) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  /*
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  */

  return (
    <Layout title={props.gs_data.name} logo={props.gs_data.logo} menu={props.gs_data.menu}>
      
      <Hero logo={props.gs_data.logo} hero_image={props.hh_data} />
      {/*}<FeaturedWorks works={featuredWorks(props.works_data)} />{*/}
      <About title={props.about_data.title} image={props.about_data.image} body={props.about_data.body} />
      {props.directors_data.map((director) => (
        <DirectorSection key={director.id} director={director.director_name} works={directorWorks(director.id, props.works_data)} />
      ))}
      {props.photographers_data.map((photographer) => (
        <PhotographerSection key={photographer.id} photographer={photographer.photographer_name} photographs={photographerPhotos(photographer.id, props.photographs_data)} />
      ))}


    </Layout>
  );
}

export const getStaticProps = async () => {

  const { data, query, variables } = await client.queries.page({
    relativePath: "home.md",
  });

  const works = await client.queries.worksConnection();

  const works_data = getWorkDataArray(works);

  const gs = await client.queries.global_settings({
    relativePath: "global-settings.md",
  });

  const gs_data = gs.data.global_settings;

  const hh = await client.queries.homepage_hero({
    relativePath: "homepage_hero.md",
  });

  const hh_data = hh.data.homepage_hero.homepage_hero_gallery;

  const about = await client.queries.page({
    relativePath: "about_us.md",
  });

  const about_data = about.data.page;

  const directors = await client.queries.directorsConnection();

  const directors_data = getDirectorDataArray(directors);

  const photographers = await client.queries.photographersConnection();

  const photographers_data = getPhotographerDataArray(photographers);

  const photographs = await client.queries.photographsConnection();

  const photographs_data = getPhotographyDataArray(photographs);

  return {
    props: {
      data,
      query,
      variables,
      works_data,
      gs_data,
      hh_data,
      about_data,
      directors_data,
      photographers_data,
      photographs_data,
    },
  };
};

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

const getPhotographerDataArray = (photographers) => {
  const photographersData = photographers.data.photographersConnection.edges.map((photographer) => {
    return { 
      id: photographer.node.id,
      photographer_name: photographer.node.photographer_name,
      photographer_description: photographer.node.photographer_description,
      photographer_order: photographer.node.photographer_order,
    }
  });

  return photographersData;
};

const getPhotographyDataArray = (photographs) => {
  const photographsData = photographs.data.photographsConnection.edges.map((photography) => {
    return { 
      id: photography.node.id,
      client: photography.node.client,
      photographer: photography.node.photographer,
      p_agency: photography.node.p_agency,
      campaign: photography.node.campaign,
      year: photography.node.year,
      image_gallery: photography.node.image_gallery,
    }
  });

  return photographsData;
};

const featuredWorks = (works) => {
  
  const fw = [];
  works.map((work) => {
    if(work.featured_work == true) {
      fw.push(work);
    }
  });

  return fw;
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

const photographerPhotos = (id, photographs) => {
  
  const pp = [];
  photographs.map((photography) => {
    if(photography.photographer.id == id) {
      pp.push(photography);
    }
  });

  return pp;
};