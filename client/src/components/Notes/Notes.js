import AddNoteForm from "./AddNoteForm";
import {useModal} from "../../util/useModal";
import {useQuery} from "@apollo/client";
import getAllNotes from "../../queries/getAllNotes";
import classes from "../News/News.module.css";
import formClasses from "../LoginPage/LoginPage.module.css";
import {useState, useEffect} from "react";

const Notes = () => {

    const {showModal: showNoteForm, toggleModal: toggleNoteForm, modalRef: noteFormRef} = useModal();
    const [resultMessage, setResultMessage] = useState(false);

    const {data, loading} = useQuery(getAllNotes);

    useEffect(() => {
        setTimeout(() => {
            if(resultMessage) {
                setResultMessage(false);
                toggleNoteForm();
            }
        }, 2000)
    }, [resultMessage, toggleNoteForm])

    if (loading) {
        return null;
    }

    const Notes = data.getAllNotes.map((note, index) => {
        return (
            <div className={classes.note} key={index}>
                <h2 className="post_name">{note.theme}</h2>
                <p className="post_content">{note.content}</p>
                <p className={classes.post_published}>{note.category}</p>
            </div>
        );
    });

    return (
        <>
            {resultMessage ? <h1 className={formClasses.resultTitle}>{resultMessage}</h1> :
                <div className={classes.notesRoot}>
                    <h1 className={classes.title}>My notes</h1>
                    <div className={classes.tabs}>
                        <button className={formClasses.blackBtn}>Default</button>
                        <button className={formClasses.blackBtn}>Immediately</button>
                        <button className={formClasses.blackBtn}>Can wait</button>
                    </div>
                    {Notes}
                    {showNoteForm &&
                        <AddNoteForm
                            toggleNoteForm={toggleNoteForm}
                            noteFormRef={noteFormRef}
                            resultMessage={resultMessage}
                            setResultMessage={setResultMessage}
                        />}
                    <div className={formClasses.formContainer}>
                        <div className={`${formClasses.formItem} ${formClasses.formButton}`}>
                            <button className={formClasses.blackBtn} onClick={toggleNoteForm}>Add Note</button>
                        </div>
                    </div>
                </div>}
        </>
    );
}
export default Notes;