import { gql } from '@apollo/client';

const AddNewUser = gql`
    mutation ($name: String!, $surname: String!, $birthdate: Date!, $phone: String!, $password: String!){
        addNewUser(name: $name, surname: $surname, birthdate: $birthdate, phone: $phone, password: $password){
            name
        }
    }
`;

export default AddNewUser;