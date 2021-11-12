import axios from "axios";

function filterBlog(data) {
    let paragraphs = data.body.split('\n');
    return {
        id: data.id,
        title: data.title,
        body: paragraphs
    };
}
export async function getAllContent() {

    const response = await axios.get("https://jsonkeeper.com/b/PFVP");
    const blogs = await response.data;
    return blogs;
}

export async function getContentById(id) {
   
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
    if(response.status !== 200) {
        console.log('hello')
        throw new Error(`request failed with statusCode ${response.status}`);

    }
    const data = await response.data;
    const [blog] = data.map(filterBlog);
    return blog;
    
}