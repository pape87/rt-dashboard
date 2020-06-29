import styled from 'styled-components';

export const StatsList = styled.ul`
  counter-reset: index;  
  padding: 0;
  max-width: 300px;
`

export const StatsListElement = styled.li`
  counter-increment: index; 
  display: flex;
  align-items: center;
  padding: 3px 0;
  box-sizing: border-box;

  color: #ffffff; 
  font-family: 'Lucida Sans', Arial, sans-serif; 
  font-size: 16px; 
  line-height: 26px; 
  text-indent: 30px; 

  &:before {
  content: counters(index, ".", decimal-leading-zero);
  font-size: 1.5rem;
  text-align: right;
  font-weight: bold;
  min-width: 50px;
  padding-right: 12px;
  font-variant-numeric: tabular-nums;
  align-self: flex-start;
  background-image: linear-gradient(to bottom, aquamarine, orangered);
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  }
`