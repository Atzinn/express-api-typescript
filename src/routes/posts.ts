// This file handle the different routes to the posts endpoint
import express from 'express';
import controller from '../controllers/posts';

const router = express.Router();

router.get('/', controller.getPosts);
router.get('/:id', controller.getPost);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);
router.post('/', controller.addPost);

export = router;