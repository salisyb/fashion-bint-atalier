import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
// import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
// import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
// import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
// const CardImage = styled.div((props) => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`w-full h-full sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
// ]);

// const CardImage = styled.div((props) => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
// ]);

// const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
// const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
// const Title = tw.h5`text-2xl font-bold`;

// const RatingsInfo = styled.div`
//   ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
//   svg {
//     ${tw`w-6 h-6 text-yellow-500 fill-current`}
//   }
// `;
// const Rating = tw.span`ml-2 font-bold`;

// const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;

// const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
// const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
// const IconContainer = styled.div`
//   ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
//   svg {
//     ${tw`w-3 h-3`}
//   }
// `;
// const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

// const PrimaryButton = tw(
//   PrimaryButtonBase
// )`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default () => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  /* Change this according to your needs */
  const cards = [
    {
      imageSrc:
        "https://i.postimg.cc/d3sjZkS2/Whats-App-Image-2022-07-30-at-4-52-30-AM-1.jpg",
      title: "Wyatt Residency",
      description:
        "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Rome, Italy",
      pricingText: "USD 39/Day",
      rating: "4.8",
    },
    {
      imageSrc:
        "https://i.postimg.cc/WzzJPMHH/Whats-App-Image-2022-07-30-at-4-50-36-AM.jpg",
      title: "Soho Paradise",
      description:
        "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
      locationText: "Ibiza, Spain",
      pricingText: "USD 50/Day",
      rating: 4.9,
    },
    {
      imageSrc:
        "https://i.postimg.cc/DzQGQfGB/Whats-App-Image-2022-07-30-at-4-50-37-AM-1.jpg",
      title: "Hotel Baja",
      description: "",
      locationText: "Palo Alto, CA",
      pricingText: "USD 19/Day",
      rating: "5.0",
    },
    {
      imageSrc:
        "https://i.postimg.cc/B6qKmWcs/Whats-App-Image-2022-07-30-at-4-50-37-AM-2.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/RV8w4D9Q/Whats-App-Image-2022-07-30-at-4-50-38-AM-1.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc: "",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/y6LFrNbG/Whats-App-Image-2022-07-30-at-4-50-39-AM-2.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/Hkc4MC3h/Whats-App-Image-2022-07-30-at-4-50-40-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },

    {
      imageSrc:
        "https://i.postimg.cc/vTZ5ZRcX/Whats-App-Image-2022-07-30-at-4-50-41-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/q72smXPc/Whats-App-Image-2022-07-30-at-4-50-42-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/sgkP90ND/Whats-App-Image-2022-07-30-at-4-50-42-AM-1.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/k4cxCMXB/Whats-App-Image-2022-07-30-at-4-50-43-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/DZFqR4h9/Whats-App-Image-2022-07-30-at-4-50-43-AM-1.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/dtSjD0RC/Whats-App-Image-2022-07-30-at-4-50-44-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/MZ5D25vd/Whats-App-Image-2022-07-30-at-4-50-44-AM-1.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/YqSxpFFk/Whats-App-Image-2022-07-30-at-4-52-29-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
    {
      imageSrc:
        "https://i.postimg.cc/vT0LrYpp/Whats-App-Image-2022-07-30-at-4-52-30-AM.jpg",
      title: "Hudak Homes",
      description: "",
      locationText: "Arizona, RAK",
      pricingText: "USD 99/Day",
      rating: 4.5,
    },
  ];

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>Work Showcase</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}>
              <ChevronLeftIcon />
            </PrevButton>
            <NextButton onClick={sliderRef?.slickNext}>
              <ChevronRightIcon />
            </NextButton>
          </Controls>
        </HeadingWithControl>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <Card key={index}>
              {/* <CardImage position={"absolute"} imageSrc={card.imageSrc} /> */}

              <div
                style={{
                  // backgroundColor: "red",
                  position: "relative",

                  height: "500px",
                  width: "400px",
                }}
              ></div>
              <div
                style={{
                  height: "500px",
                  width: "380px",
                  position: "absolute",
                  borderTopStartRadius: 40,
                  borderBottomEndRadius: 40,
                  overflow: "hidden",
                }}
              >
                <img
                  src={card.imageSrc}
                  width="100%"
                  height="100%"
                  alt={"display logo"}
                  borderTopStartRadius={40}
                  borderBottomEndRadius={40}
                />
              </div>
              {/* <TextInfo>
                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                  <RatingsInfo>
                    <StarIcon />
                    <Rating>{card.rating}</Rating>
                  </RatingsInfo>
                </TitleReviewContainer>
               
                <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.locationText}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>{card.pricingText}</Text>
                  </IconWithText>
                </SecondaryInfoContainer>
                <Description>{card.description}</Description>
              </TextInfo> */}

              {/* <PrimaryButton>View</PrimaryButton> */}
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
