import classes from "../../css/FormClasses.module.css";
import {Form, Input, TextArea} from "informed";
import {useMutation} from "@apollo/client";
import AddPost from "../../mutations/addPost";
import {useUserContext} from "../../context/UserContext";

const AddPostForm = props => {

    const { togglePostForm, postFormRef, setResultMessage } = props;
    const [addPost] = useMutation(AddPost);
    const {user} = useUserContext();

    const handleAddNewPost = formValues => {
        if(user?.id) {
            try {
                const {
                    content,
                    title
                } = formValues.values;
                addPost({variables: {
                    content,
                    title,
                    authorId: user.id,
                    authorName: `${user.firstname} ${user.lastname}`
                }});
                togglePostForm();
                setResultMessage('New Post was successfully added');
            } catch (error) {
                console.log(error)
                setResultMessage('error happens')
            }
        }
    };

    return (
        <div className={classes.modalWindow}>
            <div className={classes.formContainer} ref={postFormRef}>
                <button className={classes.closeBtn} onClick={togglePostForm}>x</button>
                <h1 className={'text-center text-2xl font-bold'}>
                    {'Add Post'}
                </h1>
                <Form onSubmit={handleAddNewPost}>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Title'}</label>
                        <Input
                            required
                            type="text"
                            name="title"
                            placeholder='Post Title'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Content'}</label>
                        <TextArea
                            required
                            type="text"
                            name="content"
                            placeholder='Post Content'
                        />
                    </div>
                    <div className={`${classes.formItem} ${classes.formButton}`}>
                        <button className={classes.blackBtn} type="submit">Add Post</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
export default AddPostForm;