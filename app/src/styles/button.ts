import styled from "styled-components";

export const Button = styled.button`
  background-color: ${props => props.color || "grey"};
  border: 2px solid ${props => props.color || "grey"};
  border-radius: 3px;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
`
export const HoverButton = styled(Button)`
  &:hover {
    background-color: white;
    border: 2px solid ${props => props.color || "grey"};
    color: ${props => props.color || "grey"};
  }
`
