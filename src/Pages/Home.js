import React from "react";
import styled from "styled-components";
// importing the images used in this screen
import SideBar from "../Components/SideBar";
import chirplogo from "../assets/chrip_logo.png";

//refer for styles
// min-height for a normal screen is 1400 *refer

function Home({ signOut }) {
  return (
    <Container>
      <Main>
        <SideBar signOut={signOut} />
        <div className="logodisplay">
          <img src={chirplogo} alt="" />
        </div>
      </Main>
    </Container>
  );
}


export default Home;


const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
  position: relative;
  @media (max-width: 1366px) {
    justify-content: flex-start;
  }
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 222px !important;
    max-height: 222px;
    background-color: #00bfa5;
    @media (max-width: 1366px) {
      display: none;
    }
  }
`;

const Main = styled.div`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  min-width: 800px;
  max-width: 1400px;
  border: 1px solid red;
  background-color: #fafafa;
  align-self: center;
  @media (max-width: 1368px) {
    position: unset;
  }
  top: 130px;
  .logodisplay {
    width: 250px;
    height: 200px;
    margin: auto;

    img {
      width: 100%;
    }
  }
`;
