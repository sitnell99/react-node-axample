import { gql } from '@apollo/client';

const AddPost = gql`
    mutation addPost($authorId: ID!, $authorName: String!, $title: String!, $content: String!){
        addPost(title: $title, content: $content, authorName: $authorName, authorId: $authorId){
            title
            content
        }
    }
`;

export default AddPost;