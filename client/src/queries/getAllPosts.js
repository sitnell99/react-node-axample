import { gql } from 'apollo-boost';

const getAllPosts = gql`
    query getAllPosts {
        getPosts {
            name
            content
            published
        }
    }
`;

export default getAllPosts;