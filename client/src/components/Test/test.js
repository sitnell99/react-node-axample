import {useQuery} from "react-apollo";
import getAllPosts from "../../queries/getAllPosts";

const Test = () => {
    const { data } = useQuery(getAllPosts);
    console.log('data', data)
}
export default Test