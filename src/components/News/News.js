import {useQuery} from "@apollo/client";
import getPosts from "../../queries/getAllPosts";
import {useModal} from "../../util/useModal";
import {useEffect, useState} from "react";
import {useUserContext} from "../../context/UserContext";
import formClasses from "../../css/FormClasses.module.css";
import AddPostModal from "./AddPostModal";
import SinglePost from "./SinglePost";
import Checkbox from "../Checkbox";

const News = () => {

    const {user, isAuthorized} = useUserContext();
    const {showModal: showPostForm, toggleModal: togglePostForm, modalRef: postFormRef} = useModal();
    const [resultMessage, setResultMessage] = useState('');
    const [pageView, setPageView] = useState('default');
    const [selectedPost, setSelectedPost] = useState(0);
    const [checked, setChecked] = useState(false);
    const [sort, setSort] = useState('newest')

    const { data, loading, refetch: refetchPosts } = useQuery(getPosts, {
        fetchPolicy: "cache-first",
        variables: {
            authorId: user?.id || null
        },
    });


    useEffect(() => {
        setTimeout(() => {
            if (resultMessage) {
                setResultMessage('');
                refetchPosts();
            }
        }, 1500)
    }, [resultMessage, togglePostForm, refetchPosts])

    if (loading) {
        return null;
    }

    const changePageView = (id) => {
        setPageView('single');
        setSelectedPost(id);
    };

    const allPosts = data.getAllPosts;

    const sortedPosts = sort === 'newest'
        ? [...allPosts].sort((a,b) => new Date(b.published) - new Date(a.published)) // ascending (new to old)
        : [...allPosts].sort((a,b) => new Date(a.published) - new Date(b.published)); // descending (old to new)

    const resultPosts = checked
        ? sortedPosts.filter(post => post.authorId === user.id)
        : sortedPosts;

    const singlePost = allPosts.findIndex(post => post.id === selectedPost);

    const Posts = resultPosts.length > 0 ?
        (
            resultPosts.map((post, index) => {
                return (
                    <div className={'relative flex justify-between items-start gap-4 min-h-full'} key={index}>
                        <div className={formClasses.titleContainer}>
                            <button
                                onClick={() => changePageView(post.id)}
                                className={`${formClasses.textOverflow} text-left text-2xl font-bold`}
                            >
                                {post.title}
                            </button>
                        </div>
                        <div>
                            <p className={'text-right'}>{`Published: ${post.published}`}</p>
                            <p className={'text-right'}>{post.authorName ? `By: ${post.authorName}` : null}</p>
                        </div>
                    </div>
                )})
        )
        :
        (
            <h1 className={'text-center text-xl font-bold'}>
                {'No posts found by your requests.'}
            </h1>
        );

    if(pageView === 'default') {
        return (
            <div className={'flex flex-col gap-8'}>
                <h1 className={'text-center text-2xl font-bold'}>Posts</h1>
                <div className={'flex flex-col gap-4'}>
                    <div className={'flex justify-between'}>
                        {isAuthorized ?
                            <button
                                className={formClasses.blackBtn}
                                onClick={togglePostForm}
                            >
                                {'Add Post'}
                            </button>
                            : null
                        }
                        <div className={'flex gap-4'}>
                            <button
                                onClick={() => setSort('newest')}
                                className={formClasses.blackBtn}
                            >
                                {'Newest'}
                            </button>
                            <button
                                onClick={() => setSort('oldest')}
                                className={formClasses.blackBtn}
                            >
                                {'Oldest'}
                            </button>
                        </div>
                    </div>
                    {isAuthorized ?
                        <Checkbox
                            checked={checked}
                            setChecked={setChecked}
                            label={'Show only my posts'}
                        />
                        : null
                    }
                </div>
                {showPostForm &&
                    <AddPostModal
                        togglePostForm={togglePostForm}
                        postFormRef={postFormRef}
                        resultMessage={resultMessage}
                        setResultMessage={setResultMessage}
                    />
                }
                {Posts}
            </div>
        );
    } else {
        return (
            <SinglePost
                setPageView={setPageView}
                postContent={data.getAllPosts[singlePost]}
            />
        );
    }
};

export default News;