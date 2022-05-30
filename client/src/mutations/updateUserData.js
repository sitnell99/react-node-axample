import { gql } from '@apollo/client';

const UpdateUserData = gql`
    mutation updateUserData($id: ID!, $firstname: String, $lastname: String, $birthdate: Date, $phone: String, $password: String){
        updateUserData(id: $id, firstname: $firstname, lastname: $lastname, birthdate: $birthdate, phone: $phone, password: $password){
            id
            firstname
            lastname
            birthdate
            phone
            password
        }
    }
`;

export default UpdateUserData;