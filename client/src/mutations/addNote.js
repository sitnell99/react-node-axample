import { gql } from '@apollo/client';

const AddNote = gql`
    mutation ($theme: String!, $content: String!, $category: String!){
        addNote(theme: $theme, content: $content, category: $category){
            theme
            content
            category
        }
    }
`;

export default AddNote;