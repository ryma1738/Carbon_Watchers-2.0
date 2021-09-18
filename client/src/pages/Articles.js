import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { newsApiCall } from '../utils/Api';

function publishDate(date) {
    date = date.split('T');
    return date[0];
}

function Articles() {
    const [News, setNews] = useState((
        <Col sm={12} className='d-flex justify-content-center align-items-center' style={{"minHeight": "20vh"}}>
            <Spinner animation="border" role="status" size="lg">
                <span className="visually-hidden">Loading News...</span>
            </Spinner>
        </Col>
    ));


    async function getNews() {
        const response = await newsApiCall();

        if (!response.ok) {
            alert("An error has occurred while trying to load news articles! Please reload the page to try again.");
            throw new Error("An error has occurred while trying to load news articles! Please reload the page to try again.")
        }

        const newsData = await response.json();
        const news = newsData.map((article) => (
            <Col as="article" sm={12} md={6} className="article-border" key={article.title}>
                <div className="m-2">
                    <div>
                        <h3 className=" fs-4 text-center">{article.title}</h3>
                        
                    </div>
                    <div>
                        <a href={article.url} target="_blank" rel="noreferrer">
                            <img src={article.urlToImage} alt={article.author} 
                            className="img-fluid" style={{"border": "3px solid var(--green)"}} />
                        </a>
                    </div>
                    <div>
                        <p>{article.description}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <p className="me-auto">Source: {article.source.name}</p>
                        <p className="text-right">Published on: {publishDate(article.publishedAt)}</p>
                    </div>
                </div>
            </Col>
        ));
        setNews(news);
    }

    useEffect(() => {
        getNews()
    },// eslint-disable-next-line react-hooks/exhaustive-deps
        []);
 
    return (
        <Container as="section" fluid="xxl">
            <Row>
                <h2 className="ffv article-border fs-1 pt-3 ms-3 ms-md-4">Climate News</h2>
                {News}
            </Row>
            <Row>
                <h2 className="ffv article-border fs-1 pt-3 ms-3 ms-md-4">Climate Articles / Videos</h2>
                <Col sm={12} md={6} className="article-border">
                    <div className="m-2">
                        <div>
                            <h3 className="fs-4 text-center">Kurzgesagt: Is It Too Late To Stop Climate Change?</h3>
                        </div>
                        <div>
                        <iframe width="100%" className="video-heights"
                        src="https://www.youtube.com/embed/wbR-5mHI6bo" 
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen style={{"border": "3px solid var(--green)"}}>    
                        </iframe>
                        </div>
                    </div>
                </Col>
                <Col sm={12} md={6} className="article-border">
                    <div className="m-2">
                        <div> 
                            <h3 className="fs-4 text-center">NBC news Film 2020: The Year Of Climate Extremes</h3>
                        </div>
                        <div>
                            <iframe width="100%" className="video-heights"
                            src="https://www.youtube.com/embed/g6H9Q8wB4h8" 
                            title="YouTube video player" frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen style={{ "border": "3px solid var(--green)" }}>
                            </iframe>
                        </div>
                    </div>
                </Col>
                
                <Col sm={12} md={6} className="article-border">
                    <div className="m-2">
                        <div>
                            <h3 className="fs-4 text-center">David Attenborugh: A Life On Our Planet</h3>
                        </div>
                        <div>
                            <iframe width="100%" className="video-heights"
                                src="https://www.youtube.com/embed/64R2MYUt394"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen style={{ "border": "3px solid var(--green)" }}>
                            </iframe>
                        </div>
                    </div>
                </Col>
                <Col sm={12} md={6} className="article-border">
                    <div className="m-2">
                        <div className="m-2">
                            <h3 className="fs-4 text-center">Breaking Boundaries: The Science of Our Planet</h3>
                        </div>
                        <div>
                            <iframe width="100%" className="video-heights"
                                src="https://www.youtube.com/embed/Gb6wQtNjblk"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen style={{ "border": "3px solid var(--green)" }}>
                                </iframe>
                        </div>
                    </div>
                </Col>
                <div className="d-flex justify-content-center">
                    <Col as="article" sm={12} md={6}>
                        <div className="m-2">
                            <div>
                                <h3 className=" fs-4 text-center">United Nations Warns of 'Catastrophic Pathway' With Current Climate Pledges</h3>

                            </div>
                            <div>
                                <a href='https://www.nytimes.com/2021/09/17/climate/climate-change-united-nations.html' target="_blank" rel="noreferrer">
                                    <img src='https://static01.nyt.com/images/2021/09/17/climate/17CLI-PLEDGES1/17CLI-PLEDGES1-superJumbo.jpg?quality=90&auto=webp'
                                        alt='A coal fired power station in Boxberg, Germany, which is scheduled to switch off in 2038.'
                                        className="img-fluid" style={{ "border": "3px solid var(--green)" }} />
                                </a>
                            </div>
                            <div>
                                <p>An accounting of promises made by countries in the years since the Paris accord found that they are not enough to avoid drastic impacts from climate change.</p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <p className="me-auto">Source: The New York Times</p>
                                <p className="text-right">Published on: 09-17-2021</p>
                            </div>
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    );
}

export default Articles;