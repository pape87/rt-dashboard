import styled from "styled-components";

export const Container = styled.div`
  background-color: #1c2329;
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: stretch;

  @media (min-width: 400px) {
    width: 85%;
    /* padding: 0;  */
  }

  @media (min-width: 550px) {
    width: 80%;
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

export const ContainerVertical = styled(Container)`
  flex-direction: column;
`

export const StatsContainer = styled.div`
  padding: 10px;
  background-color: #3e4858;
  flex: 1;
  margin: 10px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.4);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.4);
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.4);
  border-radius: 7px 7px 7px 7px;
  -moz-border-radius: 7px 7px 7px 7px;
  -webkit-border-radius: 7px 7px 7px 7px;
  border: 0px solid #ffffff;
`