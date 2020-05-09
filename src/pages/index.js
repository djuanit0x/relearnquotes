import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import axios from "axios"
import styled from "styled-components"
import Layout from "../components/layout"
import Image from "../components/image"
import Card from "../components/card"
import SEO from "../components/seo"
import TweetEmbed from "react-tweet-embed"

const IndexPage = () => {
  const [quotes, setQuotes] = useState(null)
  const [category, setCategory] = useState("FEATURED")
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    if (status !== "loading") return

    axios
      .post(`/.netlify/functions/get-all-quotes-by-category`, { category })
      .then(result => {
        if (result.status !== 200) {
          console.error("Unable to load the quotes")
          return
        }

        setQuotes(result.data.quotes.data)
        setStatus("loaded")
      })

    return () => {
      setStatus(false)
    }
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
          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Featured
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Random
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Recommended
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Life
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Dev
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Blockchain
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Startup
          </div>

          <div onClick={e => setCategory(e.target.innerText.toUpperCase())}>
            Pandemic
          </div>
        </CategoryContainer>
      </HeroLayout>
      <MainLayout>
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
          <p>loading quotes...</p>
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
