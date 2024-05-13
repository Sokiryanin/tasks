import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 10px;
  border-radius: 4px;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled(Field)`
  padding: 6px;
`;

export const Select = styled(Field)`
  padding: 6px;
`;

export const SubmitBtn = styled.button`
  width: 100%;
  padding: 6px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;

export const ErrorMsg = styled(ErrorMessage)`
  color: red;
`;

export const StyledSelect = styled.select`
  padding: 6px;
`;