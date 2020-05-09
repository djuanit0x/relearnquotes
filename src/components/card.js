import React, { useEffect } from "react"
import TweetEmbed from "react-tweet-embed"
import styled from "styled-components"
import PropTypes from "prop-types"

const Card = ({ name, sourceLink, content }) => {
  return (
    <CardWrapper>
      <CardHeader>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <a href={sourceLink}>Source</a>
        </div>
      </CardHeader>
      <p>{content}</p>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  margin: 2rem;
  height: auto;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  /* On mouse-over, add a deeper shadow */
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  & p {
    font-style: italic;
    line-height: 130.5%;
    padding: 1rem;
  }
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  & div {
    display: flex;

    > p {
      margin-top: 0.6rem;
      background-color: #000000;
      color: white;
      padding: 0.3rem 1.4rem;
      font-size: 0.75rem;
      line-height: 0.875rem;
    }
  }

  & div:nth-child(2) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > a {
      padding: 0.4rem 1rem 1rem 1rem;
      color: #1da1f2;
      font-size: 0.75rem;
      text-decoration-line: underline;
    }
  }
`

export default Card
