import React, { useState, useEffect } from "react";
import "./News.css";
import { Card } from "react-bootstrap";

export default function News() {
  const  apikey = "0edd1cdec288d3587627f6838f4f3dea";
  const category = "general";
 const  url =
    "https://gnews.io/api/v4/top-headlines?category=" +
    category +
    "&lang=en&country=us&max=10&apikey=" +
    apikey;

  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const apikey = "0edd1cdec288d3587627f6838f4f3dea";
    const category = "general";
    const url =
      "https://gnews.io/api/v4/top-headlines?category=" +
      category +
      "&lang=en&country=us&max=10&apikey=" +
      apikey;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchArticles(); 
    const intervalId = setInterval(() => {
      fetchArticles();
    }, 3600000 );

    return () => clearInterval(intervalId);
  }, []); 
  return (
    <>
      <Card className="news">
        <Card.Body>
          <p className="heading">Top News</p>
          <ul  className="article-list">
            {articles.map((article, index) => (
              <li key={index}>
                <h3>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                {/* <p>{article.description}</p> */}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
}
