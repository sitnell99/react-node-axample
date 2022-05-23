import {useQuery} from "@apollo/client";
import getPosts from "../../queries/getAllPosts";

const Test = () => {

    const { data } = useQuery(getPosts);
    console.log('data', data)

}
export default Test