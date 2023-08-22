import AddNoteForm from "./AddNoteForm";
import {useModal} from "../../util/useModal";
import {useQuery} from "@apollo/client";
import getAllNotes from "../../queries/getAllNotes";
import classes from "../News/News.module.css";
import formClasses from "../LoginPage/LoginPage.module.css";
import {useState, useEffect} from "react";
import {useUserContext} from "../../context/UserContext";

const Notes = () => {

    const {showModal: showNoteForm, toggleModal: toggleNoteForm, modalRef: noteFormRef} = useModal();
    const [resultMessage, setResultMessage] = useState(false);
    const [sort, setSort] = useState('');
    const {user} = useUserContext();
    const {data, loading, refetch: refetchNotes} = useQuery(getAllNotes, {
        variables: {
            authorId: user?.id
        },
        skip: !user?.id
    });
    console.log('noteData', data)

    useEffect(() => {
        setTimeout(() => {
            if(resultMessage) {
                setResultMessage(false);
                refetchNotes();
                toggleNoteForm();
            }
        }, 2000)
    }, [resultMessage, toggleNoteForm, refetchNotes])

    if (loading || !data) {
        return null;
    }

    if (!data.getAllNotes) {
        return <AddNoteForm
            toggleNoteForm={toggleNoteForm}
            noteFormRef={noteFormRef}
            resultMessage={resultMessage}
            setResultMessage={setResultMessage}
        />
    }

    const sortNotes = !sort
        ? data.getAllNotes
        : data.getAllNotes.filter(note => note.category === sort);

    const Notes = sortNotes.map((note, index) => {
        return (
            <div className={classes.note} key={index}>
                <h2 className="post_name">{note.theme}</h2>
                <p className="post_content">{note.content}</p>
                <p className={classes.post_published}>{note.category}</p>
                <button className={formClasses.blackBtnSmall}>Remove note</button>
            </div>
        );
    });

    return (
        <>
            {resultMessage ? <h1 className={formClasses.resultTitle}>{resultMessage}</h1> :
                <div className={classes.notesRoot}>
                    <h1 className={classes.title}>My notes</h1>
                    <div className={classes.tabs}>
                        <div className={classes.sortButtons}>
                            <button
                                onClick={() => setSort('default')}
                                className={formClasses.blackBtn}
                            >
                                Default
                            </button>
                            <button
                                onClick={() => setSort('immediately')}
                                className={formClasses.blackBtn}
                            >
                                Immediately
                            </button>
                            <button
                                onClick={() => setSort('can_wait')}
                                className={formClasses.blackBtn}
                            >
                                Can wait
                            </button>
                        </div>
                        <button
                            onClick={() => setSort('')}
                            className={formClasses.blackBtn}
                        >
                            Show All
                        </button>
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