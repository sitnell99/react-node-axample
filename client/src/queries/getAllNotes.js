import { gql } from '@apollo/client';

const getAllNotes = gql`
    query getAllNotes($authorId: ID!) {
        getAllNotes(authorId: $authorId) {
            id
            theme
            content
            category
        }
    }
`;

export default getAllNotes;