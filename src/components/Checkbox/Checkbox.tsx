import formClasses from "../../css/FormClasses.module.css";

type checkBoxProps = {
    checked: boolean
    setChecked: Function
    label: string
}

const Checkbox = (props: checkBoxProps) => {

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

export default Checkbox;
