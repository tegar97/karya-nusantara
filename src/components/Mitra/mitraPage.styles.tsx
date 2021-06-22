import styled from "styled-components";

export const ImageArticle = styled.img`
  width: 100%;

  @media (min-width: 640px) {
    height: 400px;
  }
  @media (min-width: 768px) {
    height: 400px;
  }
  @media (min-width: 1024px) {
    height: 632px;
  }
`;

export const Thumbnail = styled.img`
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 1024px) {
    width: 232px;

    height: 142px;
  }
`;

export const ImageContainer = styled.img`
  filter: grayscale(100%);
  transition: filter 0.5s;

  &:hover {
    filter: grayscale(0%);
  }
`;
