import { gql } from '@apollo/client';

const getAllNotes = gql`
    query getAllNotes {
        getAllNotes {
            theme
            content
            category
        }
    }
`;

export default getAllNotes;