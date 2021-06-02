import styled from 'styled-components'

export const HeadingSecondary = styled.h2`
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: 600;
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
  transition: all 0.2s;
`


export const ReadMore = styled.button`
    font-size: 1rem;
    display: inline-block;
    text-decoration: none;
    border-bottom: 1px solid #5996ab;
    padding: 3px;
    transition: all .5s;

    &:focus{
      border: none;
      outline: none;
      transform: translateY(-2px);
    }
`

export const Composition = styled.div`
    position: relative;

`

export const CompositionPhoto1 = styled.img`
   
    width: 45%;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 8;
    transition: all .2s;
    outline-offset: 2rem;
    border-radius: 10px;
    left: 4rem;
    top: -2rem;
    
    @media(max-width: 56.25em) {
      float: left;
      position: relative;
      width: 33.33333333%;
      box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
      top: 0;
      left: 0;

      transform: scale(1.2);
    }

    
    &:hover{
        transform: scale(1.05);
        z-index: 19;
    }

`
export const CompositionPhoto2 = styled.img`
    width: 45%;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    transition: all .2s;
    outline-offset: 2rem;
    border-radius: 10px;

    right: 4rem;
            top: 4remrem;
    /* @media(max-width: 56.25em) {
      right: 0;
            top: 2rem;

    } */
  
    @media(max-width: 56.25em) {
      float: left;
      position: relative;
      width: 33.33333333%;
      box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
      top: -1rem;
      right: 0;

                transform: scale(1.3);
                z-index: 100;
    }
    
    &:hover{
        transform: scale(1.05);
        z-index: 19;
    }

`
export const CompositionPhoto3 = styled.img`
    width: 45%;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    border-radius: 10px;

    transition: all .2s;
    outline-offset: 2rem;

    left: 20%;
            top: 6rem;
    /* @media(max-width: 56.25em) {
      left: 20%;
      top: 10rem;


    } */
    @media(max-width: 56.25em) {
      float: left;
      position: relative;
      width: 33.33333333%;
      box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
      top: 1rem;
      left: 0;
      transform: scale(1.1);
    }
    
    
    &:hover{
        transform: scale(1.05);
        z-index: 19;
    }

`