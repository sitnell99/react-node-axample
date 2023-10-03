import {useQuery} from "@apollo/client";
import getOtherMembers from "../../queries/getOtherMembers";
import { ColorRing } from 'react-loader-spinner';
import {useUserContext} from "../../context/UserContext";
import {useModal} from "../../util/useModal";

const OtherMembers = props => {

    const { classes } = props;

    const { data, loading } = useQuery(getOtherMembers, {
        fetchPolicy: "cache-first",
    });

    const { user } = useUserContext();

    if (loading) {
        return (
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="m-auto"
                colors={['#000']}
            />
        );
    }

    if (!data) {
        return null;
    }

    const Member = ({member}) => {
        const { showModal: showMember, toggleModal: toggleMember, modalRef: memberRef, triggerRef: triggerMemberRef } = useModal();
        const hideMember = !showMember ? classes.hideMember : '';
        return (
            <>
                <li onClick={toggleMember} ref={triggerMemberRef} className={classes.base}>
                    {`${member.firstname} ${member.lastname}`}
                </li>
                <li className={`${hideMember} ${classes.details}`} ref={memberRef}>
                    {member.birthdate
                        ? (
                            <>
                                <div>Birthdate:</div>
                                <span>{member.birthdate}</span>
                            </>
                        ) : null}
                    {member.phone
                        ? (
                            <>
                                <div>Phone:</div>
                                <span>{member.phone}</span>
                            </>
                        ) : null}
                </li>
            </>
        )
    }

    return data.getOtherMembers.filter(member => member.id !== user.id).map((member, index) => <Member member={member} key={index}/>);
}

export default OtherMembers;