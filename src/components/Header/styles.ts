import styled from "styled-components";

export const Container = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2.4rem 3.2rem 3.2rem;
  box-shadow: 1px 1px 1px 1px #0004;
  width: 100%;

  img {
    filter: drop-shadow(1px 1px 1px #000b);
    width: 14rem;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    margin-top: 0.8rem;
  }

  input {
    font-size: 1.2rem;
    border-radius: 0.8rem;
    padding: 0.8rem 1.6rem;
    box-shadow: 1px 1px 2px 0px #0008;
  }

  button {
    font-size: 1.2rem;
    border-radius: 0.8rem;
    padding: 0.8rem 1.6rem;
    font-weight: 700;
    background: ${({ theme }) => theme.colors.complementary};
    color: ${({ theme }) => theme.colors.light};
    box-shadow: 1px 1px 2px 0px #0008;
  }

  button:hover {
    cursor: pointer;
    filter: brightness(1.05);
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 2.4rem 3.2rem;

    img {
      width: 20rem;
    }

    input {
      font-size: 1.6rem;
    }

    button {
      font-size: 1.6rem;
    }
  }
`;