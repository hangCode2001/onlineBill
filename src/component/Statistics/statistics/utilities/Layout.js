import styled from 'styled-components';
import Nav from "../../../Nav/Nav"
const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  flex-direction: column;
`;
const Main = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const Layout = (props) => {
  return (
    <Wrapper>
      <Main>
        {props.children}
      </Main>
      <Nav></Nav>
    </Wrapper>
  );
};

export default Layout;
