import { gql } from '@apollo/client';

const AddNote = gql`
    mutation ($authorId: ID!, $theme: String!, $content: String!, $category: String!){
        addNote(theme: $theme, content: $content, category: $category, authorId: $authorId){
            theme
            content
            category
        }
    }
`;

export default AddNote;