import styled from 'styled-components'

export const ImageFilter = styled.img`
    width: 100%;
    &:hover{
        filter: invert(0.31) sepia(1) saturate(11.4) hue-rotate(36deg) brightness(1.2);
    }
`