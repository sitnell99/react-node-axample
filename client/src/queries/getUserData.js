import {gql} from '@apollo/client';

const getUserData = gql`
    query getUserData {
        getUserData {
            firstname
            lastname
            birthdate
            phone
        }
    }
`;

export default getUserData;