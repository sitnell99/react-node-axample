import { gql } from '@apollo/client';

const LogIn = gql`
    mutation logIn($phone: String!, $password: String!){
        logIn(phone: $phone, password: $password){
            token
        }
    }
`;

export default LogIn;