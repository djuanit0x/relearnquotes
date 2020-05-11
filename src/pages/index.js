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

  // See: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  useEffect(() => {
    if (status !== "loading") return

    let QUERY_URL = ""

    if (category === "FEATURED") {
      QUERY_URL = "get-all-featured-quotes"
    } else if (category === "RECOMMENDED") {
      QUERY_URL = "get-all-recommended-quotes"
    } else {
      QUERY_URL = "get-all-quotes-by-category"
    }

    axios.post(`.netlify/functions/${QUERY_URL}`, { category }).then(result => {
      if (result.status !== 200) {
        console.error("Unable to load the quotes")
        return
      }
      if (result.data) {
        setQuotes(shuffle(result.data.quotes.data))
      }
      setStatus("loaded")
    })

    return () => {}
  }, [status])
  return (
    <div>
      {quotes === null ? (
        <Loading>
          <Line></Line>
          <Line></Line>
          <Line></Line>
          <Line></Line>
        </Loading>
      ) : (
        <Layout>
          <SEO title="Home" />
          <HeroLayout>
            <HeroWrapper>
              <HeroTitle>
                <h1>
                  <span>Re</span>think your favs quotes
                </h1>
                <p>
                  Quotes are powerful references that you can use to reflect
                  back upon your journey in life. We have collected a dozen
                  recommended and popular quotes for each category. All quotes
                  have been <span>verified</span> from their original source.
                  Let's learn together!
                </p>
              </HeroTitle>
              <HeroImageWrapper>
                <Image />
                <div style={{ marginLeft: "2.8rem", marginTop: "3rem" }}>
                  <a
                    href="https://www.producthunt.com/posts/relearn-quotes?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-relearn-quotes"
                    target="_blank"
                  >
                    <img
                      src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=199146&theme=light"
                      alt="Relearn Quotes - A list of verified quotes to help people discover the truth | Product Hunt Embed"
                      style={{ width: "15.625rem", height: "3.375rem" }}
                    />
                  </a>
                </div>
              </HeroImageWrapper>
            </HeroWrapper>
            <h3 style={{ style: "text" }}>Category:</h3>

            <CategoryContainer>
              <div onClick={e => handleClick(e)}>Featured</div>

              <div onClick={e => handleClick(e)}>Meme</div>

              <div onClick={e => handleClick(e)}>Recommended</div>

              <div onClick={e => handleClick(e)}>Life</div>

              <div onClick={e => handleClick(e)}>Dev</div>

              <div onClick={e => handleClick(e)}>Blockchain</div>

              <div onClick={e => handleClick(e)}>Startup</div>

              <div onClick={e => handleClick(e)}>Pandemic</div>
            </CategoryContainer>
          </HeroLayout>
          <MainLayout className="main-layout">
            <TotalQuotesText>{quotes.length} quotes are shown</TotalQuotesText>
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
                        key={quote._id}
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
      )}
    </div>
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

const TotalQuotesText = styled.div`
  color: #000000;
  display: flex;
  font-size: 0.875rem;
  font-weight: bold;
  justify-content: center;
  padding: 1rem 0rem 0rem 1.0875rem;
  text-decoration-line: underline;
`

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 68rem;
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

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 48%;
`

const Line = styled.div`
  animation: expand 1s ease-in-out infinite;
  border-radius: 10px;
  display: inline-block;
  transform-origin: center center;
  margin: 0 3px;
  width: 1px;
  height: 25px;

  &:nth-child(1) {
    background: #27ae60;
  }

  &:nth-child(2) {
    animation-delay: 180ms;
    background: #f1c40f;
  }

  &:nth-child(3) {
    animation-delay: 360ms;
    background: #e67e22;
  }

  &:nth-child(3) {
    animation-delay: 540ms;
    background: #2980b9;
  }

  @keyframes expand {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(2);
    }
  }
`

export default IndexPage
