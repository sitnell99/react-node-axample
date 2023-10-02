import formClasses from "../../css/FormClasses.module.css";
import {func, bool, string} from "prop-types";

const Checkbox = props => {

    const {checked, setChecked, label} = props;

    return (
        <div className={'inline-flex'}>
            <label className={'flex items-start gap-2 cursor-pointer'}>
                <input
                    className={`${formClasses.checkbox} ${checked ? formClasses.checked : ''}`}
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    type="checkbox"
                />
                {label}
            </label>
        </div>
    );
};

Checkbox.propTypes = {
    checked: bool,
    setChecked: func,
    label: string
}

export default Checkbox;