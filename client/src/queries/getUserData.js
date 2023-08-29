import {gql} from '@apollo/client';

const getUserData = gql`
    query getUserData {
        getUserData {
            id
            firstname
            lastname
            birthdate
            phone
        }
    }
`;

export default getUserData;