import { FriendRequest } from "../models/FriendRequest.js";



export const sendFriendRequest = async (req, res) => {
  try {
    const { from, to } = req.body;

    const existingRequest = await FriendRequest.findOne({ from, to, status: 'pending' });

    if (existingRequest) {
      return res.status(400).json({ error: 'Friend request already sent' });
    }

    const friendRequest = new FriendRequest({ from, to });
    await friendRequest.save();

    res.status(201).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getFriendRequest = async (req, res) => {
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
};
