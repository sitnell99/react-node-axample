import classes from "../LoginPage/LoginPage.module.css";
import {Form, Input, TextArea, Select} from "informed";
import {useMutation} from "@apollo/client";
import AddNote from "../../mutations/addNote";

const AddNoteForm = props => {

    const { toggleNoteForm, noteFormRef, setResultMessage } = props;
    const [addNote] = useMutation(AddNote);

    const handleAddNewUser = formValues => {

        try {
            addNote({variables: formValues.values});
            setResultMessage('New note was successfully added');
        } catch (error) {
            console.log(error)
            setResultMessage('error happends')
        }
    };

    return (
        <div className={classes.modalWindow}>
            <div className={classes.formContainer} ref={noteFormRef}>
                <button className={classes.closeBtn} onClick={toggleNoteForm}>x</button>
                <h1>Add Note</h1>
                <Form onSubmit={handleAddNewUser}>
                    <div className={classes.formItem}>
                        <label>{'Theme'}</label>
                        <Input
                            required
                            type="text"
                            name="theme"
                            placeholder='Note Theme'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label>{'Content'}</label>
                        <TextArea
                            required
                            type="text"
                            name="content"
                            placeholder='Note Content'
                        />
                    </div>
                    <div className={classes.formItem}>
                        <label>{'Category'}</label>
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