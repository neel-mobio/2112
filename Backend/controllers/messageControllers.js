import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";
import FriendRequest from "../models/friendRequest.js";

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    // Create the message without populating
    const message = await Message.create(newMessage);

    // Query for the message with population
    const populatedMessage = await Message.findById(message._id)
      .populate("sender", "name pic")
      .populate("chat");

    // Use User.populate for additional population
    const finalMessage = await User.populate(populatedMessage, {
      path: "chat.users",
      select: "name pic email",
    });

    // Update the latestMessage in the chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: finalMessage });

    res.json(finalMessage);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendFriendRequest = asyncHandler(async (req, res) => {
  try {
    const { from, to } = req.body;

    const existingRequest = await FriendRequest.findOne({
      from,
      to,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(200).json({ error: "Friend request already sent" });
    }

    const friendRequest = new FriendRequest({ from, to });
    await friendRequest.save();

    res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const acceptFriendRequest = asyncHandler(async (req, res) => {
  try {
    const { requestId } = req.body;

    const friendRequest = await FriendRequest.findById(requestId);

    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (friendRequest.status === 'accepted') {
      return res.status(400).json({ error: 'Friend request already accepted' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getAllFriendRequest = asyncHandler(async (req, res) => {
  const { userId } = req.query
  console.log("userId", userId);
  try {
    const friendRequests = await FriendRequest.find({
      to: userId,
      status: 'pending'
    }).populate('from to', 'name email');
    res.json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export { allMessages, sendMessage, sendFriendRequest, acceptFriendRequest, getAllFriendRequest };
