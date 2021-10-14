import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { MovieState } from "../movieState"; //aducem fila js care contine intreg arrayul de filme
//Animations
import { motion } from "framer-motion";
import { pageAnimation } from "../animation";
import ScrollTop from "../components/ScrollTop";

const MovieDetail = () => {
  const history = useHistory(); //creem o const history in care apelam useHistory pentru a obtine toate detaliile locatiei unde ne aflam pe pagina
  const url = history.location.pathname; //salvam calea istoricului in constanta url
  const [movies, setMovies] = useState(MovieState); //creem state pentru movies si setam arrayul initial ca fiind cel din fila movieState.js
  //urmatorul lucru este sa extragem filmul bazat pe url-ul unde ne aflam
  const [movie, setMovie] = useState(null); //creem un nou state unde movie este null din start
  //cand componenta se incarca in pagina vrem sa vedem
  //UseEffect
  useEffect(() => {
    const currentMovie = movies.filter((stateMovie) => stateMovie.url === url);
    //comparam url-ul din lista MovieDetail cu cel in care ne aflam noi
    setMovie(currentMovie[0]); //in lista de sus setata null vom introduce arrayul filmului
  }, [movies, url]); //punem astea aici ca o dependenta adica vreau sa verific ce film este ales atunci cand url-ul sau filmele se schimba
  return (
    <>
      {movie && (
        <Details
          variants={pageAnimation}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <HeadLine>
            <h2> {movie.title} </h2>
            <img src={movie.mainImg} alt="movie" />
          </HeadLine>
          <Awards>
            {movie.awards.map((award) => (
              <Award
                title={award.title}
                description={award.description}
                key={award.title}
              />
            ))}
          </Awards>
          <ImageDisplay>
            <img src={movie.secondaryImg} alt="secimg" />
          </ImageDisplay>
          <ScrollTop />
        </Details>
      )}
    </>
  );
};
const Details = styled(motion.div)`
  color: white;
`;

const HeadLine = styled.div`
  min-height: 90vh;
  padding-top: 20vh;
  position: relative;
  h2 {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -10%);
  }
  img {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }
`;
const Awards = styled.div`
  min-height: 80vh;
  display: flex;
  margin: 5rem 10rem;
  align-items: center;
  justify-content: space-around;
`;

const AwardStyle = styled.div`
  padding: 5rem;
  h3 {
    font-size: 2rem;
  }
  .line {
    width: 100%;
    background: #23d997;
    height: 0.5rem;
    margin: 1rem 0rem;
  }
  p {
    padding: 2rem 0rem;
  }
`;
const ImageDisplay = styled.div`
  min-height: 50vh;
  img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
`;
const Award = ({ title, description }) => {
  return (
    <AwardStyle>
      <h3>{title}</h3>
      <div className="line"></div>
      <p>{description}</p>
    </AwardStyle>
  );
};
export default MovieDetail;
