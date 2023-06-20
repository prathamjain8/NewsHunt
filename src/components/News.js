import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner'

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState('true');
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    document.title = `${props.category} - NewsHunt`;
    
     const updateNews = async() => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);   //it will return a promise
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(50);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title =`${props.category} - NewsHunt`;
        updateNews();
    },[])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
        setPage(page+1)
        let data = await fetch(url);   //it will return a promise
        let parsedData = await data.json();
        console.log(parsedData)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
        return (
            <>
                <h1 className='text-center' style={{marginTop: '10vh', marginBottom:'5vh'}}><span style={{color:'red'}}>NewsHunt</span> - Top {props.category} headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                <hr />
            </>
        )
    }
News.defaultProps =
        {
            country: 'in',
            pageSize: 8,
            category: 'general'
        }
News.propTypes =
        {
            country: PropTypes.string,
            pageSize: PropTypes.number,
            category: PropTypes.string
        }
export default News
