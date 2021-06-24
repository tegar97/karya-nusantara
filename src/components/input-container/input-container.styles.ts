import styled from 'styled-components'

export const Input = styled.input`
    width: 100%;
    border: 1px solid #c2c2c2;
    background: '#ffff';
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    transition: border .9s;

    &:focus {
        border: 2px solid #5996ab
        
    }

    &::placeholder {
  color:  ${props => props.defaultPlaceHolder ? '#000' : '#5996ab'};
  font-weight: 'bold';
  opacity: 1; /* Firefox */
}

&:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:  ${props => props.defaultPlaceHolder ? '#000' : '#5996ab'}; font-weight: 'bold';

}

&::-ms-input-placeholder { /* Microsoft Edge */
  color:  ${props => props.defaultPlaceHolder ? '#000' : '#5996ab'};
   font-weight: 'bold';

}
`

export const TextArea = styled.textarea`
    width: 100%;
    border: 1px solid #c2c2c2;
    background: '#ffff';
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    transition: border .9s;

    &:focus {
        border: 2px solid #5996ab
        
    }

    &::placeholder {
  color:  ${props => props.defaultPlaceHolder ? '#000' : '#5996ab'};
  font-weight: 'bold';
  opacity: 1; /* Firefox */
}

&:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color:  ${props => props.defaultPlaceHolder ? '#000' : '#5996ab'}; font-weight: 'bold';

}

&::-ms-input-placeholder { /* Microsoft Edge */
  color:  ${props => props.defaultPlaceHolder ? '#000' : '#5996ab'};
   font-weight: 'bold';

}
`