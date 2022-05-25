import { gql } from '@apollo/client';

const AddNewUser = gql`
    mutation ($firstname: String, $lastname: String, $birthdate: Date, $phone: String!, $password: String!){
        addNewUser(firstname: $firstname, lastname: $lastname, birthdate: $birthdate, phone: $phone, password: $password){
            firstname
        }
    }
`;

export default AddNewUser;