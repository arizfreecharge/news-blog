import Wrapper from "../components/Wrapper";
import Card from '../components/Card';
import styles from "../styles/Home.module.scss";
import { getAllContent,getContentById } from "../lib/getBlogsAndNews";
import Image from "next/image";
import { useState,useEffect } from "react";
import Pagination from "../components/Pagination";

export async function getServerSideProps() {
  
    //Grabbing all the News Articles

    const news = await getAllContent();
    
    return {
        props: {
            news
        }
    }
}

export default function News({ news }) {
    
    // For Switching between All News Details and Individual News Info
    const [isActive,setIsActive] = useState(false);
    const [singleNews, setSingleNews] = useState({});


    //Pagination
    const [currentPage,setCurrentPage] = useState(1);
    const [contentPerPage,] = useState(10);
    const lastIndexOfContent = currentPage * contentPerPage;
    const firstIndexOfContent = lastIndexOfContent - contentPerPage;
  
    const paginatedNews = news.slice(firstIndexOfContent,lastIndexOfContent);

    //Pagination Page Switcher
    const pageSwitcher = (pageNumber) => setCurrentPage(pageNumber);


    // Individual News Card Click Handler

    const onClickHandler = async (e) => {
        const newsId = e.target.closest('li').id;
        const newsWithIdPassed = await getContentById(newsId);
        setIsActive(true);
        setSingleNews(newsWithIdPassed);

        // For keeping the content in ViewPort

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // Back Button Click Handler
    const backButtonClickHandler = (e) => {
        setIsActive(false);
    }

    return (

        <Wrapper>
            
            { 
                isActive === false 
                ? (
                    <>
                        <h1>news </h1>
                        <ul className={styles.cardContainer}>
                            {paginatedNews && paginatedNews.map(eachNews => {
                                return (
                                    <li onClick={(e) => onClickHandler(e)} id={eachNews.id} key={eachNews.id}>
                                        <Card postImg={eachNews.postImg} title={eachNews.title} excerpt={eachNews.excerpt} timestamp={eachNews.timestamp}/>
                                    </li>
                                )
                            })}
                        </ul>

                        <Pagination contentPerPage={contentPerPage} totalContent={news.length} currentPage={currentPage} paginate={pageSwitcher}/>
                    </>
                    )
                : (
                    <>
                        
                        <div className={styles.individualBlog}>
                            <div onClick={backButtonClickHandler} className={styles.backButton}>
                                <Image width={30} height={30} objectFit="contain" src='/BackBtn.png' alt="" />
                            </div>
                            <h1>{singleNews.title}</h1>
                            {singleNews.body?.map(para => {
                                return <p key={Math.random()}>{para}</p>
                            })}
                            
                        </div>
                    </>
                )
        
            }
            
            
        </Wrapper>
    )
}
