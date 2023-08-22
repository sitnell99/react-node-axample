import { gql } from '@apollo/client';

const getAllNotes = gql`
    query getAllNotes($authorId: ID!) {
        getAllNotes(authorId: $authorId) {
            theme
            content
            category
        }
    }
`;

export default getAllNotes;