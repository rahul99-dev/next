const { default: Detail } = require("./detail");

// Next.js fetch API in action
async function loadPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  // const res = await fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8");
  return res.json();
}

const Page = async () => {
  const posts = [
    {
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
    {
      userId: 2,
      id: 2,
      title:
        "excepturi optio reprehenderit sunt aut facere repellat provident occaecati",
      body: "molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit",
    },
  ]; 
  // const posts = await loadPosts();
  console.log(posts)
  return <Detail posts={posts} />;
};

export default Page;
