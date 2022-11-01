/* eslint-disable jsx-a11y/anchor-is-valid */
import { useGetPostByIdQuery } from "../api/postApi";

export default function PostDetails({ postId }) {
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [post, setPost] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await getPostById(postId);
  //       setPost(data);
  //       setError(null);
  //     } catch (error) {
  //       setError(error);
  //       setPost(null);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, [postId]);

  const { data: post, isLoading, error } = useGetPostByIdQuery(postId);


  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error fetching post: {error.error}
      </div>
    );
  }

  return (
    <article>
      <h1>{post.name}</h1>
      <p>{post.Last_name}</p>
    </article>
  );
}
