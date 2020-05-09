import React, { useEffect, useState } from "react"
import axios from "axios"
import styled from "styled-components"
import Layout from "../components/layout"
import Image from "../components/image"
import Card from "../components/card"
import SEO from "../components/seo"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import TweetEmbed from "react-tweet-embed"

const IndexPage = () => {
  const [quotes, setQuotes] = useState(null)
  const [category, setCategory] = useState("FEATURED")
  const [status, setStatus] = useState("loading")

  const handleClick = e => {
    setQuotes([])
    setStatus("loading")

    setCategory(e.target.innerText.toUpperCase())
    const elmntToView = window.document.getElementsByClassName("main-layout")[0]
    elmntToView.scrollIntoView()
  }
  useEffect(() => {
    if (status !== "loading") return
    axios
      .post(`.netlify/functions/get-all-quotes-by-category`, { category })
      .then(result => {
        if (result.status !== 200) {
          console.error("Unable to load the quotes")
          return
        }

        setQuotes(result.data.quotes.data)
        setStatus("loaded")
      })

    return () => {}
  }, [status])
  return (
    <Layout>
      <SEO title="Home" />
      <HeroLayout>
        <HeroWrapper>
          <HeroTitle>
            <h1>
              <span>Re</span>think your favs quotes
            </h1>
            <p>
              Quotes are powerful references that you can use to reflect back
              upon your journey in life. We have collected a dozen recommended
              and popular quotes for each category. All quotes have been{" "}
              <span>verified</span> from their original source. Let's learn
              together!
            </p>
          </HeroTitle>
          <HeroImageWrapper>
            <Image />
          </HeroImageWrapper>
        </HeroWrapper>
        <h3 style={{ style: "text" }}>Category:</h3>

        <CategoryContainer>
          <div onClick={e => handleClick(e)}>Featured</div>

          <div onClick={e => handleClick(e)}>Random</div>

          <div onClick={e => handleClick(e)}>Recommended</div>

          <div onClick={e => handleClick(e)}>Life</div>

          <div onClick={e => handleClick(e)}>Dev</div>

          <div onClick={e => handleClick(e)}>Blockchain</div>

          <div onClick={e => handleClick(e)}>Startup</div>

          <div onClick={e => handleClick(e)}>Pandemic</div>
        </CategoryContainer>
      </HeroLayout>
      <MainLayout className="main-layout">
        {quotes && quotes.length > 0 ? (
          <MainContainer>
            {quotes.map(quote => {
              if (quote.type === "tweet") {
                return (
                  <TweetEmbedWrapper key={quote._id}>
                    <TweetEmbed id={quote.content} />
                  </TweetEmbedWrapper>
                )
              } else if (quote.type === "text") {
                return (
                  <Card
                    name={quote.author}
                    sourceLink={quote.source}
                    content={quote.content}
                  />
                )
              } else {
                return ""
              }
            })}
          </MainContainer>
        ) : (
          <MainContainer>
            <Loader
              type="ThreeDots"
              color="#000000"
              height={20}
              width={40}
              timeout={3000}
            />
          </MainContainer>
        )}
      </MainLayout>
    </Layout>
  )
}

const HeroLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 57rem;
  padding: 0 1.0875rem 1.45rem;
`

const MainLayout = styled.div`
  width: 100%;
  background: #fdf9f3;
`
const HeroWrapper = styled.div`
  display: flex;
  @media (max-width: 715px) {
    flex-direction: column;
  }
`
const HeroImageWrapper = styled.div`
  width: 50%;
  @media (max-width: 715px) {
    width: 100%;
  }
`
const HeroTitle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  & h1 {
    font-weight: bold;
    font-size: 4rem;
    text-transform: capitalize;
    line-height: 5rem;

    & span {
      text-decoration: underline;
    }
  }
  & p {
    line-height: 165%;
    font-size: 1.5rem;
    & span {
      text-decoration: underline;
      font-weight: bold;
    }
  }
`

const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  font-size: 1.125rem;
  flex-wrap: wrap;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    margin-top 1rem;
    padding: 0.7rem;
    margin-left: 1rem;
    border: 3px solid #000000;
  }


  & div:hover {
    text-decoration: underline;
  }

  & div:active {
    transform: translateY(1px);
  }


  @media (max-width: 715px) {
    flex-direction: column;
    & div {
      width: 100%;
      margin-left: 0rem;
    }
  }
`
const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  max-width: 57rem;
  padding: 0 1.0875rem 1.45rem;

  @media (max-width: 715px) {
    flex-direction: column;
    & div {
      width: 100%;
      margin-left: 0rem;
    }
  }
`

const TweetEmbedWrapper = styled.div`
  margin: 1rem;
  width: 25rem;
`

export default IndexPage
