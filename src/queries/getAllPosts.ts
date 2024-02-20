import { gql } from '@apollo/client';

const getAllPosts = gql`
    query getAllPosts {
        getAllPosts {
            authorName
            authorId
            title
            content
            published
            id
        }
    }
`;

export default getAllPosts;