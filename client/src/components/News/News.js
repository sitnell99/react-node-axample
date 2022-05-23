import {useQuery} from "@apollo/client";
import getPosts from "../../queries/getAllPosts";
import classes from './News.module.css';

const News = () => {

    const { data, loading } = useQuery(getPosts);

    if (loading) {
        return null;
    }

    const Posts = data.getAllPosts.map((post, index) => {
        return (
            <div className={classes.post} key={index}>
                <h2 className="post_name">{post.name}</h2>
                <p className="post_content">{post.content}</p>
                <p className={classes.post_published}>{post.published}</p>
            </div>
        );
    })

    return (
        <>
            <h1 className={classes.title}>Posts</h1>
            {Posts}
        </>
    )
}
export default News