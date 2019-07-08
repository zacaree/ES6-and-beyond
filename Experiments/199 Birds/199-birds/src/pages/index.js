import React, { useState, useEffect } from "react"
import "../styles/index.sass"
import { useInView } from "react-intersection-observer"
import { birdData } from "../content/birdData"
import leaves from "../images/leaves.svg"
import Card from "../components/Card"
import SEO from "../components/seo"

const IndexPage = () => {
  const [birdsList, setBirdsList] = useState(birdData)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    searchQuery === ""
      ? setBirdsList(birdData)
      : setBirdsList(
          birdData.filter(data => {
            const birdToLowerCase = data.name.toLowerCase()
            return birdToLowerCase.includes(searchQuery.toLowerCase())
          })
        )
  }, [searchQuery])

  const [ref, atTop] = useInView({
    /* Optional options */
    root: null, // 'null' sets it to default value: viewport
    rootMargin: "0px 0px -99.8%", // I'm adding 600px to the top of the bounds, 0 to sides and 0 to bottom.
    threshold: 0.01, // isIntersecting triggers when 90% of observed object is visible.
  })

  return (
    <>
      <SEO title="Home" />
      <div className="header">
        <h1 className="titleText">199</h1>
        <h2 className="titleText">Birds</h2>
      </div>
      <div
        className="searchBar"
        ref={ref}
        style={{
          backgroundColor: atTop
            ? "hsla(180, 30%, 74%, .97)"
            : "hsla(180, 13%, 30%, 0)",
        }}
      >
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <img className="imgLeaves" src={leaves} alt="" />
      <main className="main">
        <div className="grid">
          {birdsList.map((bird, i) => (
            <Card {...bird} key={i} />
          ))}
        </div>
      </main>
    </>
  )
}

export default IndexPage
