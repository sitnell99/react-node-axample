import classes from "../LoginPage/LoginPage.module.css";
import {Form, Input, TextArea} from "informed";
import {Select} from "@mui/material";

const Notes = () => {

    return (
        <div className={classes.formContainer}>
            <h1>My notes</h1>
            <Form onSubmit={() => console.log('submit')}>
                <div className={classes.formItem}>
                    <label>{'Theme'}</label>
                    <Input
                        type="text"
                        name="theme"
                        placeholder='Note Theme'
                    />
                </div>
                <div className={classes.formItem}>
                    <label>{'Content'}</label>
                    <TextArea
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
                        <option value="ms">Default</option>
                        <option value="m3">Model 3</option>
                        <option value="mx">Model X</option>
                    </Select>
                </div>
                <div className={`${classes.formItem} ${classes.formButton}`}>
                    <button className={classes.blackBtn} type="submit">Add Note</button>
                </div>
            </Form>
        </div>
    );
}
export default Notes;