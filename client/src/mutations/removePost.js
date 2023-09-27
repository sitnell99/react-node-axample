import { gql } from '@apollo/client';

const RemovePost = gql`
    mutation removePost($id: ID!){
        removePost(id: $id) {
            res
        }
    }
`;

export default RemovePost;