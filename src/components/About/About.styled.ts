import styled from 'styled-components'

export const HeadingSecondary = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 600;
  color: #45c1c1;
  letter-spacing: 0.2rem;
  transition: all 0.2s;
  cursor: pointer;
   

  &:hover{
    transform: skewY(1deg) skewX(25deg) scale(1.1);
  text-shadow: 0.5rem 1rem 2rem rgb(0 0 0 / 20%);
  }
`

export const AboutHeading = styled.h3`
    font-size: 1.5rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #45c1c1;
  transition: all 0.2s;
`


export const ReadMore = styled.button`
    font-size: 1rem;
    color: #45c1c1;
    display: inline-block;
    text-decoration: none;
    border-bottom: 1px solid #426EB5;
    padding: 3px;
`

export const Composition = styled.div`
    position: relative;

`

export const CompositionPhoto = styled.img`
    width: 45%;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    transition: all .2s;
    outline-offset: 1rem;
    &:hover{
        outline: .9rem solid var(--color-primary);
        transform: scale(1.05);
        z-index: 19;
    }

`