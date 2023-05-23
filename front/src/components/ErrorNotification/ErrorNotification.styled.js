import styled from "styled-components";

const ErrorWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 10px;
  margin-top: -10px;
`;

const ErrorLeft = styled.div`
  background-color: red;
  border-radius: 4px 0 0 4px;
  height: 100%;
  padding: 5px;
  display: flex;
  svg {
    fill: #fff;
  }
`;

const ErrorRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  color: red;
`;

const ErrorDescription = styled.div`
  font-size: 12px;
`;

export { ErrorWrapper, ErrorLeft, ErrorRight, ErrorDescription };
