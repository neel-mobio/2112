import mongoose from "mongoose";



const friendRequestSchema = mongoose.Schema(
    {
        from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
    },
    { timestamps: true }
);
const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;