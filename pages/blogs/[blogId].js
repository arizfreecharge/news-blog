import Wrapper from "../../components/Wrapper";
import { getAllContent, getContentById } from "../../lib/getBlogsAndNews";
import styles from "../../styles/Home.module.scss";

export async function getStaticPaths() {

    const blogs = await getAllContent();

    return {
        paths: 
            blogs.map(blog => {
                return {
                    params: {
                        blogId: blog.id.toString()
                    }
                }
            }),
        fallback: "blocking"
    }
}
export async function getStaticProps({ params : { blogId }}) {

    console.log(blogId);
    
    try {
        const blog = await getContentById(blogId);
        console.log("hell,",blog);
        
        return {
            props: {
                blog,
            },
            revalidate: 300
        }
    }
    catch (err) {
        
        return {
            notFound: true
        };
    }
}

function singleBlog({ blog }) {

    console.log(blog.body);
    return (
        
        <Wrapper> 
            <div className={styles.individualBlog}>
                <h1>{blog.title}</h1>
                {blog.body.map(para => {
                    return <p key={blog.id}>{para}</p>
                })}
            </div>

        </Wrapper>
    )
}
export default singleBlog;