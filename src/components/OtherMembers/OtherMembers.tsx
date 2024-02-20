import {useQuery} from "@apollo/client";
import getOtherMembers from "../../queries/getOtherMembers";
import {FC, ReactElement, ReactNode, useState} from "react";
import {ColorRing} from 'react-loader-spinner';
import {useUserContext} from "../../context/UserContext";

type membersProps = {
    classes: {
        hideMember: string
        base: string
        details: string
    }
}

const OtherMembers = (props: membersProps) => {

    const {classes} = props;

    const {data, loading} = useQuery(getOtherMembers, {
        fetchPolicy: "cache-first",
    });

    const {user} = useUserContext();

    if (loading) {
        return (
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="m-auto"
                colors={['#000', '#000', '#000', '#000', '#000']}
            />
        );
    }

    if (!data) {
        return null;
    }

    type memberProps = {
        firstname: string
        lastname: string
        birthdate: ReactNode
        phone: string
    }

    const Member: FC = (member: memberProps) => {
        const [showMember, setShowMember] = useState<boolean>(false);
        const toggleMember = (): void => setShowMember(!showMember);
        const hideMember: string = !showMember ? classes.hideMember : '';
        return (
            <>
                <li onClick={toggleMember} className={classes.base}>
                    {`${member.firstname} ${member.lastname}`}
                </li>
                <li className={`${hideMember} ${classes.details}`}>
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

    return data.getOtherMembers.filter(member => member.id !== user.id).map((member, index) => <Member {...member} key={index}/>);
}

export default OtherMembers;
