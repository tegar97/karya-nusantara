import styled from 'styled-components'

export const LeftCategory = styled.div`
    padding: 2rem;

`

export const CategoryProductText = styled.h3`
    font-size: 1.2rem;
    color: #ffff;
    font-weight: 600;
`

export const CategoryProductListContainer = styled.div`
    margin-top: 1rem;    

`

export const CategoryProductList = styled.li`
    background-color: #a7cf54;
    color: #fff;
    padding: .5rem;
    border-radius: .5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: .5s all;

    &:hover{
        transform: translateY(-4px);
        box-shadow: 9px 10px 16px -9px rgba(0,0,0,0.61);
-webkit-box-shadow: 9px 10px 16px -9px rgba(0,0,0,0.61);
-moz-box-shadow: 9px 10px 16px -9px rgba(0,0,0,0.61);
    }

`


// export const CategoryList = styled.ul`
//     margin-top: 1rem;
// `