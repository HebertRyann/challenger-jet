import styled from 'styled-components'

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  padding: 2em;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  label {
    margin-top: 0.5rem;
    padding: 1rem;
    color: #fff;
    background: #888;

    cursor: pointer;
    transition: background-color 0.4s;

    &:hover {
      background: #444;
    }
    span {
      margin-left: 0.5em;
    }
  }
`