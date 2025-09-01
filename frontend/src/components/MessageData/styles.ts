import { styled } from "@mui/material";

type MessageDataProps = {
  orientation?: "vertical" | "horizontal";
};

export const Container = styled("div")<MessageDataProps>`
  display: flex;
  flex-direction: ${({ orientation }) =>
    orientation === "horizontal" ? "column" : "row"};
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 60%;

  margin: 0 auto;

  &.cc-message-contained {
    max-width: 100%;

    padding: 2rem;
    border-radius: 0.75rem;

    background-color: ${({ theme }) => theme.messageBox.background};
    border: ${({ theme }) => theme.messageBox.border};
  }

  & .cc-message-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    max-height: 200px;
    max-width: ${({ orientation }) =>
      orientation === "horizontal" ? "240px" : "170px"};

    padding: 0 1.5rem;

    margin-bottom: 0.5rem;
    opacity: 0.5;

    > svg {
      width: 100%;
      height: 100%;
    }
  }

  & .cc-message-wrapper {
    font-size: 0.8125rem;
    text-align: ${({ orientation }) =>
      orientation === "horizontal" ? "center" : "left"};
    color: ${({ theme }) => theme.palette.text.third};
  }

  & .cc-message-text {
    color: inherit;
    opacity: 0.75;
    font-size: inherit;
    line-height: normal;
  }
`;
