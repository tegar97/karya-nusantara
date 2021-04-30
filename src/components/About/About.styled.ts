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
    width: 298px;
    height: 199px;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    transition: all .2s;
    outline-offset: 1rem;
    left: 10%;
    top: -1rem;
    @media(max-width: 56.25em) {
      float: left;
      position: relative;
      width: 168px;
    height: 110px;
      box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
      left: 5%;
     top: -1rem;
            

    }

    
    &:hover{
        outline: .9rem solid var(--color-primary);
        transform: scale(1.05);
        z-index: 19;
    }

`
export const CompositionPhoto2 = styled.img`
       width: 298px;
    height: 199px;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    transition: all .2s;
    outline-offset: 1rem;
    left: 45%;
    top:  1.3rem;

    @media(max-width: 56.25em) {
      float: left;
      position: relative;
      width: 168px;
    height: 110px;
      box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
      left: -25%;
    top:  0.9rem;
    z-index: 10;

    }

    
    &:hover{
        outline: .9rem solid var(--color-primary);
        transform: scale(1.05);
        z-index: 19;
    }

`
export const CompositionPhoto3 = styled.img`
     width: 298px;
    height: 199px;
    box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    transition: all .2s;
    outline-offset: 1rem;
    left: 20%;
    top:  6.2rem;

    @media(max-width: 56.25em) {
      float: left;
      position: relative;
      width: 168px;
    height: 110px;
      box-shadow: 0 1.5rem 4rem rgba(0,0,0,.4);
      left: 50%;
      top: -8rem;
      z-index: 9;


    }

    
    &:hover{
        outline: .9rem solid var(--color-primary);
        transform: scale(1.05);
        z-index: 19;
    }

`