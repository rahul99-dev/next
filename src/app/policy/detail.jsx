"use client"; 
import React, {useState} from "react";


const Detail = (props) => {
  const posts =props.posts;
  return (
    <div><h5>Policy</h5>
   <div className="post-list">
      {posts.map((post, i) => (        
        <div key={post.id} className="post-listing">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
        </div>
      //   <div key={i} className="post-listing">
      //   <h3 className="post-title">{post.name}</h3>
      //   <p className="post-body">{post.city}</p>
      // </div>
      ))}
    </div>
    </div>
  );
};



export default Detail;