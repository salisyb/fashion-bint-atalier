import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import Header, {
  NavLink,
  NavLinks,
  PrimaryLink as PrimaryLinkBase,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "store/auth.js";

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

export default function CenteredHeader({ text = "white" }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOutUser = () => {
    dispatch(logout());
  };

  const navLinks = [
    <NavLinks key={1}>
      <NavLink style={{ color: text }} href="/about">
        About
      </NavLink>
      <NavLink style={{ color: text }} href="/contact">
        Contact
      </NavLink>
      {/* <NavLink href="#">Locations</NavLink> */}
      <NavLink style={{ color: text }} href="pricing">
        Pricing
      </NavLink>
    </NavLinks>,
    <NavLinks key={2}>
      {isAuthenticated ? (
        <>
          <PrimaryLink href="/dashboard">Dashboard</PrimaryLink>
          <PrimaryLink onClick={handleLogOutUser} href="#">
            Log out
          </PrimaryLink>
        </>
      ) : (
        <PrimaryLink href="/login">Login</PrimaryLink>
      )}
    </NavLinks>,
  ];

  return <StyledHeader links={navLinks} />;
}
