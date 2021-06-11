import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './post-item.module.css';

const PostItem = (props) => {
    const {title,image,excerpt,date,slug} = props.post;
    console.log(slug,"||", image)

    const formatedDate = new Date(date).toLocaleDateString("en-US",{
        day: "numeric",
        month: "long",
        year:  "numeric"
    });

    const imagePath = `/images/posts/${slug}/${image}`

    return (
        <li className={styles.post}>
          <Link href={`/posts/${slug}`}>
            <a>
              <div className={styles.image}>
                <Image src={imagePath} alt={title} width={300} height={200} layout="responsive" />
              </div>
              <div className={styles.content}>
                <h3>{title}</h3>
                <time>{formatedDate}</time>
                <p>{excerpt}</p>
              </div>
            </a>
          </Link>  
        </li>
    )
}

export default PostItem
