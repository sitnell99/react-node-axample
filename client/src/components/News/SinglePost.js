import formClasses from "../../css/FormClasses.module.css";
import {func, object} from "prop-types";

const SinglePost = props => {

    const { setPageView, postContent } = props;

    return (
        <>
            <div className={'flex flex-col gap-4'}>
                <h2 className={'text-left text-4xl font-bold'}>
                    {postContent.title}
                </h2>
                <p className={'text-left break-all'}>{postContent.content}</p>
                <p className={'text-right break-all'}>{`Published: ${postContent.published}`}</p>
                <p className={'text-right'}>{postContent.authorName ? `By: ${postContent.authorName}` : null}</p>
                <div className={formClasses.formItem}>
                    <button className={formClasses.blackBtn} onClick={() => setPageView('default')}>
                        {'Return to all posts'}
                    </button>
                </div>
            </div>
        </>
    );
};

SinglePost.propTypes = {
    setPageView: func,
    postContent: object
}

export default SinglePost;