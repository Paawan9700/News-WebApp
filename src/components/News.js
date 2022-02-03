import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // paawan
  document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     articles: [],
  //     loading: true,
  //     page: 1,
  //     totalresults: 0,
  //   };
  //   document.title = `NewsMonkey - ${this.capitalizeFirstLetter(
  //     props.category
  //   )}`;
  // }

  const updatenews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${props.page}&PageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    // this.setState({
    //   articles: parsedData.articles,
    //   totalresults: parsedData.totalResults,
    //   loading: false,
    // });

    setarticles(parsedData.articles);
    settotalResults(parsedData.totalReasults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    // react-hooks/exhaustive-deps
    updatenews();
  }, []);

  // const handlenextPage = async () => {
  //   setpage(page + 1)

  //   updatenews();
  // };

  // const handleprevPage = async () => {
  //  setpage(page - 1);

  //   updatenews();
  // };

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0364ec79379147979eadfdc8ef0f5b59&page=${page + 1}&PageSize=${props.pageSize}`;
    setpage(page + 1);
    // this.setState({ loading: true });
    setloading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    // this.setState({
    //   articles: this.state.articles.concat(parsedData.articles),
    //   totalresults: parsedData.totalResults,
    //   loading: false,
    // });

    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalReasults);
    setloading(false);
  };

  return (
    <>
      <h1 className="text-center" style={{ margin: "21px 2px", marginTop : '90px' }}>
        NewsMoney - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Loader />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loader />}
      >
        {
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={
                        element.description
                          ? element.description.slice(0, 80)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      publishedDate={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        }
      </InfiniteScroll>

      {/* 
        there are the next and the previous buttons --- 
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprevPage}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page >
              Math.ceil(this.state.totalresults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handlenextPage}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
