/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Header from "./header"
import instagramBtnImg from "../images/instagram-icon.png"
import twitterBtnImg from "../images/twitter-icon.png"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <FooterLayout>
        <FooterWrapper>
          <div></div>
          <FooterMetaDataInfo>
            <p>
              Copyright © {new Date().getFullYear()} | Made with ❤ by @
              <a href="https://github.com/djuanit0x">djuanit0x</a>{" "}
            </p>
          </FooterMetaDataInfo>

          <SocialMedia>
            <a href="https://www.instagram.com/relearnquotes/">
              <div>
                <img src={instagramBtnImg} />
              </div>
            </a>
            <a href="https://twitter.com/relearnquotes">
              <div>
                <img src={twitterBtnImg} />
              </div>
            </a>
          </SocialMedia>
        </FooterWrapper>
      </FooterLayout>
    </>
  )
}
const FooterLayout = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 57rem;
  padding: 1rem 1.0875rem 1.45rem;
`
const FooterWrapper = styled.footer`
  display: flex;
  color: #000000;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  font-size: 0.825rem;
`

const FooterMetaDataInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & * > a:visited {
    color: black;
  }
`

const SocialMedia = styled.div`
  display: flex;
  text-transform: uppercase;
  font-weight: bold;
  width: 4.5rem;

  & a {
    & div {
      margin-right: 0.4rem;
    }
  }
`
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
