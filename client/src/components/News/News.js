import {useQuery} from "@apollo/client";
import getPosts from "../../queries/getAllPosts";

const News = () => {

    const { data, loading } = useQuery(getPosts);

    if (loading) {
        return null;
    }

    const Posts = data.getAllPosts.map((post, index) => {
        return (
            <div className={'relative flex flex-col gap-4 min-h-full'} key={index}>
                <h2 className={'text-center'}>{post.name}</h2>
                <p className={'text-left'}>{post.content}</p>
                <p className={'absolute right-0 -bottom-6'}>{post.published}</p>
            </div>
        );
    })

    return (
        <div className={'flex flex-col gap-8'}>
            <h1 className={'text-center text-2xl font-bold'}>Posts</h1>
            {Posts}
        </div>
    )
}
export default News