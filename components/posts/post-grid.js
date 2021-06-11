import React from 'react';
import styles from './post-grid.module.css'
import PostItem from './post-item.js';

const PostsGrid = (props) => {
    const { posts } = props
    return (
        <ul className={styles.grid}>
            {
                posts?.map(post => (
                    <PostItem key={post.slug} post={post} />
                ))
            }
        </ul>
    )
}

export default PostsGrid
