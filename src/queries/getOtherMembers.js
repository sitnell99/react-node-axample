import { gql } from '@apollo/client';

const getOtherMembers = gql`
    query getOtherMembers {
        getOtherMembers {
            firstname
            lastname
            birthdate
            phone
            id
        }
    }
`;

export default getOtherMembers;