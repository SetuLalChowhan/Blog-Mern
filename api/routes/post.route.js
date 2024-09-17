import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { createPost, getposts } from '../controller/post.controller.js';

const router = express.Router();

router.post("/create",verifyToken,createPost)
router.post("/getPosts",getposts)

export default router
