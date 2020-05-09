import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import shareBtnImg from "../images/share-btn.png"
import Img from "gatsby-image"
import styled from "styled-components"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      logoImage: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 178, height: 52) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)

  return (
    <HeaderContainer>
      <Img
        style={{ marginLeft: ".375rem" }}
        fixed={data.logoImage.childImageSharp.fixed}
      />
      <HeaderButtonsWrapper>
        <ShareButton>
          <a href="https://twitter.com/intent/tweet">
            <img src={shareBtnImg} alt="shareBtn" />
          </a>
        </ShareButton>

        <FeedbackButton>
          <a href="https://djuanito.typeform.com/to/QfWHH8">feedback</a>
        </FeedbackButton>
        <SubmitButton>
          <a href="https://airtable.com/shr6Oq93At7eoYmuG">submit</a>
        </SubmitButton>
      </HeaderButtonsWrapper>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  margin-bottom: 1.45rem;
  border-bottom: 5px solid #000000;
  padding: 0.1rem;

  @media (max-width: 715px) {
    align-items: center;
    flex-direction: column;
    & img {
      margin-bottom: 0;
    }
  }
`

const HeaderButtonsWrapper = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const ShareButton = styled.div`
  position: relative;
  width: 120px;
  height: 30px;
  & img {
    height: 2rem;
    margin-bottom: 0;
    margin-top: 0.75rem;
    margin-right: 1rem;
  }
`
const FeedbackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 30px;
  padding: 0.1rem;
  border: 1px solid #000000;
  margin-top: 1rem;
  margin-right: 1rem;

  &:active {
    transform: translateY(1px);
  }

  & a {
    color: #000000;
    text-decoration: none;
  }

  & a:visited {
    color: #000000;
  }
`

const SubmitButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 30px;
  text-align: center;
  background: #000000;
  margin-right: 1rem;
  margin-top: 1rem;
  line-height: 17px;

  &:active {
    transform: translateY(1px);
  }

  & a {
    color: #ffffff;
    text-decoration: none;
  }

  & a:visited {
    color: #ffffff;
  }
`
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
