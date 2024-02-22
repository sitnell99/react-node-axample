import {useQuery} from "@apollo/client";
import getPosts from "../../api/queries/getAllPosts";
import {useModal} from "../../util/useModal";
import React, {FC, useEffect, useState} from "react";
import {useUserContext} from "../../context/UserContext";
import formClasses from "../../css/FormClasses.module.css";
import AddPostModal from "./AddPostModal";
import SinglePost from "./SinglePost";
import Checkbox from "../Checkbox";
import {resultMessages} from "../../types/resultMessages";
import {useSelector} from "react-redux";
import {isUserAuthorized} from "../../store/selectors/user";

const News: FC = () => {

    const {user} = useUserContext();
    const isAuthorized = useSelector(isUserAuthorized);

    const {showModal: showPostForm, toggleModal: togglePostForm, modalRef: postFormRef} = useModal();
    const [resultMessage, setResultMessage] = useState<resultMessages>(resultMessages.empty);

    type pageViewStatus = "default" | "single";

    const [pageView, setPageView] = useState<pageViewStatus>('default');
    const [selectedPost, setSelectedPost] = useState<string>('no-id');
    const [checked, setChecked] = useState<boolean>(false);

    type sortStatus = "newest" | "oldest";

    const [sort, setSort] = useState<sortStatus>('newest')

    const { data, loading, refetch: refetchPosts } = useQuery(getPosts, {
        fetchPolicy: "cache-first",
        variables: {
            authorId: user?.id || null
        },
    });


    useEffect(() => {
        setTimeout((): void => {
            if (resultMessage) {
                setResultMessage(resultMessages.empty);
                refetchPosts();
            }
        }, 1500)
    }, [resultMessage, togglePostForm, refetchPosts])

    if (loading) {
        return null;
    }

    const changePageView = (id: string): void => {
        setPageView('single');
        setSelectedPost(id);
    };

    type postType = {
        authorId: string
        authorName: string
        content: string
        id: string
        published: string
        title: string
    }

    const allPosts: Array<postType> = data.getAllPosts;

    const sortedPosts = sort === 'newest'
        // @ts-ignore
        ? [...allPosts].sort((a: postType,b: postType) => new Date(b.published) - new Date(a.published)) // ascending (new to old)
        // @ts-ignore
        : [...allPosts].sort((a: postType,b: postType) => new Date(a.published) - new Date(b.published)); // descending (old to new)

    const resultPosts: Array<postType> = checked
        ? sortedPosts.filter((post: postType): boolean => post.authorId === user.id)
        : sortedPosts;

    const singlePost = allPosts.findIndex((post: postType): boolean => post.id === selectedPost);

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
            <div className={'flex flex-col gap-8 pb-10'}>
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
                        // @ts-ignore
                        postFormRef={postFormRef}
                        setResultMessage={setResultMessage}
                        togglePostForm={togglePostForm}
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
