import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
// import { Box, SimpleGrid } from "@chakra-ui/react";

// import { css } from "styled-components/macro"; //eslint-disable-line

import { useSelector, useDispatch } from "react-redux";

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink as PrimaryLinkBase,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";
import { logout } from "store/auth.js";
import CardOption from "components/cards/CardOption.js";
// import Cards from "components/cards/TabCardGrid.js";

// import TwoColumnWithInput from "./TwoColumnWithInput.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full ml-2`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 py-5 flex flex-1 flex-row`;

// const Heading = styled.h1`
//   ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
//   span {
//     ${tw`inline-block mt-2`}
//   }
// `;

// const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

export default () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOutUser = () => {
    dispatch(logout());
  };

  const navLinks = [
    <NavLinks key={1}>
      {/* <NavLink href="#">Home</NavLink>
      <NavLink href="#">About</NavLink>
      <NavLink href="#">Contact</NavLink>
      <NavLink href="#">Locations</NavLink>
      <NavLink href="#">Pricing</NavLink> */}
    </NavLinks>,
    <NavLinks key={2}>
      {isAuthenticated ? (
        <>
          {/* <PrimaryLink href="/dashboard">Dashboard</PrimaryLink> */}
          <NavLink href="/">Home Page</NavLink>

          <PrimaryLink onClick={handleLogOutUser} href="#">
            Log out
          </PrimaryLink>
        </>
      ) : (
        <PrimaryLink href="/login">Login</PrimaryLink>
      )}
    </NavLinks>,
  ];

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <Content>
          <CardOption />
        </Content>
      </HeroContainer>
    </Container>
  );
};
