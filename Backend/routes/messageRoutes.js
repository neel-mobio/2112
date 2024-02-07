import express from "express";
import { allMessages, sendMessage, sendFriendRequest, acceptFriendRequest,getAllFriendRequest } from "../controllers/messageControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/get-all-friend-request').get(getAllFriendRequest);
router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);
router.route('/send-friend-request').post(sendFriendRequest);
router.route('/accept-friend-request').post(acceptFriendRequest);


export default router;
