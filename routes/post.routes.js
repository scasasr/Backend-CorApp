import express from "express";
import {body} from 'express-validator';
import {getAllPosts,getAllPostsAvailables,getAllPostsDonation,getAllByPlaceId,getAllByProductId,getByPostId,addPost,removePost,updatePost, getByPostIdExtend} from "../controllers/post.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//GET           "/api/v1/posts/all"                  all posts 
//GET           "/api/v1/posts/all/availables"       all posts availables
//GET           "/api/v1/posts/all/donations"       all posts are donation
//GET           "/api/v1/posts/all/place/:pid"      all posts by place
//GET           "/api/v1/posts/all/partner/:pid"    all posts by partner
//GET           "/api/v1/posts/all/product/:pid"    all posts by product
//GET           "/api/v1/posts/:id"                  single post
//POST          "/api/v1/posts/add"                  create post
//DELETE        "/api/v1/posts/:id"                  remove post
//PATCH/PUT     "/api/v1/posts/:id"                  update post

router.get("/all",getAllPosts);
router.get("/all/availables",getAllPostsAvailables);
router.get("/all/donations",getAllPostsDonation);
router.get("/all/place/:pid",getAllByPlaceId);

// router.get("/all/partner/:pid",getAllByPartnerId);
router.get("/all/product/:pid",getAllByProductId);
router.get("/:id",getByPostId);
router.get("/extend/:id",getByPostIdExtend);
router.post("/add",addPost);
router.delete("/:id",removePost);
router.patch("/:id",updatePost);

export default router;