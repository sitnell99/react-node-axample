import { gql } from '@apollo/client';

const getAllPosts = gql`
    query getAllPosts {
        getAllPosts {
            name
            content
            published
        }
    }
`;

export default getAllPosts;