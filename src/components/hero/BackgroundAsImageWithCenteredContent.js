import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Stack, Box } from "@mui/material";

// import { css } from "styled-components/macro"; //eslint-disable-line
import AnimatedText from "react-animated-text-content";
// import { useDispatch } from "react-redux";

import DefaultHeader from "../headers/CenteredHeader";
// import { logout } from "store/auth.js";
// import TwoColumnWithInput from "./TwoColumnWithInput.js";

// const logoImage = "../../images/bint_logo.png";

// const StyledHeader = styled(Header)`
//   ${tw`pt-8 max-w-none w-full`}
//   ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
//     ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
//   }
//   ${NavToggle}.closed {
//     ${tw`text-gray-100 hover:text-primary-500`}
//   }
// `;

// const PrimaryLink = tw(PrimaryLinkBase)`rounded-full ml-2`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-color: black
`;
// url("https://unsplash.com/photos/yXZ8PKZFrIE/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5MjQ1NDEz&force=true");

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-2xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-0`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;
// const ImageLogo = tw.img`w-12 h-12 rounded-full mr-3`;

const TextAnimated = ({ children, reload }) => {
  React.useEffect(() => {
    console.log(reload);
  }, [reload]);
  return (
    <>
      <br />
      <span style={{ color: "#E1AD01 " }}>Fashion</span>

      <AnimatedText
        type="words" // animate words or chars
        animation={{
          x: "200px",
          y: "20px",
          scale: 1.1,
          ease: "ease-in-out",
        }}
        animationType="lights"
        interval={0.06}
        duration={0.8}
        tag="span"
        className="animated-paragraph"
        includeWhiteSpaces
        threshold={0.1}
        rootMargin="20%"
      >
        {children}
      </AnimatedText>
    </>
  );
};

export default () => {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  let [counter, setCounter] = React.useState(0);

  const handleReload = React.useCallback(() => {
    switch (counter) {
      case 0:
        setCounter(1);
        break;
      case 1:
        setCounter(2);
        break;
      case 2:
        setCounter(0);
        break;
      default:
        return;
    }
  }, [counter]);

  React.useEffect(() => {
    const animationId = setInterval(() => {
      handleReload();
    }, 5000);

    return () => {
      clearInterval(animationId);
    };
  }, [handleReload]);

  const services = [" Academy  ", " House    ", " Accessory"];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        {/* <StyledHeader links={navLinks} /> */}
        <DefaultHeader />
        <Content>
          <Stack display="flex" alignItems={"center"} justifyContent="center">
            <Box sx={{ marginBottom: { xs: "100px", sm: "0px" } }}>
              <img
                boxSize="200px"
                width={"200px"}
                objectFit="cover"
                src={"https://i.postimg.cc/t45cxYc5/bint-logo.png"}
                alt={"company logo"}
              />
            </Box>
            <Heading>
              <TextAnimated reload={counter}>{services[counter]}</TextAnimated>
            </Heading>

            <PrimaryAction onClick={() => console.log("hello")}>
              Contact Us
            </PrimaryAction>
          </Stack>
        </Content>
      </HeroContainer>
    </Container>
  );
};
