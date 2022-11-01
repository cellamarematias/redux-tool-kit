/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useGetPostQuery, useLazyGetPostQuery } from "../api/postApi";
import { getPosts } from "../api/posts";

export default function PostList({ setPostId }) {

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [posts, setPosts] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const data = await getPosts();
  //       setPosts(data);
  //       setError(null);
  //     } catch (error) {
  //       setError(error);
  //       setPosts(null);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // Destruc y nos trae la data, el "isLoading", el error is el isFetching
  // se reemplaza todo el cód anterior por:
  // almacen datos en cahcé por lo que al volver no vuelve a consultar el server - 

  // refetchOnMountOrArgChange - vuelve a validar los datos (auto-fetch) - puedo poner "true" o segundos
  //refetchOnFocus - cuando hace foco en la ventana revalida los datos - importante cuando usuario tiene más pestañas
  // refetchOnReconnect - cuando se vuelve a conectar, revalida - 
  // "skip" para evitar la consulta - 

    const { data: posts, isLoading, error } = useGetPostQuery(undefined, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
      );

    //console.log(posts)

    // esta versión lazy la usamos para busquedas... ej, botón de búsq

    // const [ getPosts, {
    //   data: posts, 
    //   isLoading, 
    //   error, 
    //   isFetching,
    //   isUninitialized
    // }] = useLazyGetPostQuery({
    //   // configs
    // })


    // if(isUninitialized) {
    //   return <button onClick={() => getPosts()}>Fetch Posts</button>
    // }

  if (isLoading) {
    return (
      <div>
        <span className="spinner-border"></span> Loading Posts...
      </div>
    );
  }

  if (error) {
    return (
      <section className="alert alert-danger">
        Error fetching posts: {error.error}
      </section>
    );
  }

  return (
    <section>
      <h2>Posts:</h2>
      <ul>
        {posts.map((post) => (
          <PostItem key={post.user_id} post={post} setPostId={setPostId} />
        ))}
      </ul>
    </section>
  );
}

function PostItem({ post, setPostId }) {
  return (
    <li>
      <a onClick={() => setPostId(post.user_id)} href="#">
        {post.name} {post.last_name}
      </a>
    </li>
  );
}
