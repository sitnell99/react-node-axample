import { gql } from '@apollo/client';

const RemoveNote = gql`
    mutation removeNote($id: ID!){
        removeNote(id: $id) {
            res
        }
    }
`;

export default RemoveNote;