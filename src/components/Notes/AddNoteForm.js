import classes from "../../css/FormClasses.module.css";
import {Form, Input, TextArea, Select} from "informed";
import {useMutation} from "@apollo/client";
import AddNote from "../../mutations/addNote";
import {useUserContext} from "../../context/UserContext";

const AddNoteForm = props => {

    const { toggleNoteForm, noteFormRef, setResultMessage } = props;
    const [addNote] = useMutation(AddNote);
    const {user} = useUserContext();

    const handleAddNewNote = formValues => {
        if(user?.id) {
            try {
                const {
                    category,
                    content,
                    theme
                } = formValues.values;
                addNote({variables: {
                    category: category || 'default',
                    content,
                    theme,
                    authorId: user.id
                }});
                toggleNoteForm();
                setResultMessage('New note was successfully added');
            } catch (error) {
                console.log(error)
                setResultMessage('error happens')
            }
        }
    };

    return (
        <div className={classes.modalWindow}>
            <div className={classes.formContainer} ref={noteFormRef}>
                <button className={classes.closeBtn} onClick={toggleNoteForm}>x</button>
                <h1 className={'text-center text-2xl font-bold'}>
                    {'Add Note'}
                </h1>
                <Form onSubmit={handleAddNewNote}>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Theme'}</label>
                        <Input
                            required
                            type="text"
                            name="theme"
                            placeholder='Note Theme'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Content'}</label>
                        <TextArea
                            required
                            type="text"
                            name="content"
                            placeholder='Note Content'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label className={'text-lg font-bold'}>{'Category'}</label>
                        <Select
                            type="text"
                            name="category"
                            placeholder='Note Category'
                        >
                            <option value="default">Default</option>
                            <option value="immediately">Immediately</option>
                            <option value="can_wait">Can wait</option>
                        </Select>
                    </div>
                    <div className={`${classes.formItem} ${classes.formButton}`}>
                        <button className={classes.blackBtn} type="submit">Add Note</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
export default AddNoteForm;