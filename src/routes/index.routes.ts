import express from "express";

const router = express.Router();

const testPost: any = {
    _id: "abc123",
    title: "Test post!",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    thumbnail: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    thumbnailalt: "blah",
    author: "Elias",
    authorImg: "https://media-exp1.licdn.com/dms/image/C4D03AQGZpRFSFrpoIQ/profile-displayphoto-shrink_200_200/0/1604154349561?e=1617235200&v=beta&t=L4fji2zmJvTN_Jv7u1ndXVqzaKZLZIheFy0_58wKuAE",
    body: `## Testing testing!`
}

router.get("/", async (req: any, res: any) => {
    return res.render("pages/posts", {posts: [testPost]});
});

router.get("/post/:postId", async (req: any, res: any) => {
    return res.render("pages/post", {post: testPost});
});

router.get("/:test", async (req: any, res: any) => {
    return res.render("index", {title: "yoooo", message: req.params.test});
});

export default router;
