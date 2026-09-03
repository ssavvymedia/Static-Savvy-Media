import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import { sanityClient, urlFor } from "../../utils/sanityClient";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
      .then(setPost);
  }, [slug]);

  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        return (
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || post?.title || ""}
            style={{ width: "100%", height: "auto", borderRadius: "8px", margin: "1.5rem 0" }}
          />
        );
      },
    },
  };

  if (!post) return <p>Loading...</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      {post.mainImage && (
        <img src={urlFor(post.mainImage).width(1200).url()} alt={post.title} />
      )}
      <PortableText value={post.body} components={portableTextComponents} />
    </article>
  );
}
