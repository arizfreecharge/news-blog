import Wrapper from "../components/Wrapper";
import Card from '../components/Card';
import styles from "../styles/Home.module.scss"
import { getAllContent } from "../lib/getBlogsAndNews";
import Link from "next/link"
import Pagination from "../components/Pagination";
import { useState } from "react";

export async function getServerSideProps() {
  
  const blogs = await getAllContent();
  return {
      props: {
        blogs
      }
  }
}

export default function Home({ blogs }) {

  const [currentPage,setCurrentPage] = useState(1);
  const [contentPerPage,] = useState(10);
  

  const lastIndexOfContent = currentPage * contentPerPage;
  const firstIndexOfContent = lastIndexOfContent - contentPerPage;

  const paginatedBlogs = blogs.slice(firstIndexOfContent,lastIndexOfContent);

  //Pagination Page Switcher
  const pageSwitcher = (pageNumber) => setCurrentPage(pageNumber);


  return (
      <Wrapper>
        
        <h1>Blogs</h1>
       
        <ul className={styles.cardContainer}>
        
                {paginatedBlogs && paginatedBlogs.map(blog => {
                    return <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>
                          <a>
                            <Card postImg={blog.postImg} title={blog.title} excerpt={blog.excerpt} timestamp={blog.timestamp}/>
                          </a>
                            
                        </Link>
                    </li>
                })}
        </ul>
        <Pagination contentPerPage={contentPerPage} totalContent={blogs.length} currentPage={currentPage} paginate={pageSwitcher}/>
      </Wrapper>
  )
}
