import { Box, Button, ListItem, OrderedList, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';

const FriendRequest = () => {
    const { user } = ChatState();
    const toast = useToast();
    const [firendRequestList, setFriendRequestList] = useState([])
    useEffect(() => {
        fetchAllRequest();
    }, [])

    const fetchAllRequest = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            console.log("user", user);
            const { data } = await axios.get(
                `http://localhost:5000/api/message/get-all-friend-request?userId=${user?._id}`,
                config
            );
            console.log("data-->", data);
            setFriendRequestList(data)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    const acceptFriendRequest = async (request) => {
        console.log("request", request);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/message/accept-friend-request",
                {
                    requestId: request?._id
                },
                config
            );
            if (data) {
                fetchAllRequest()
            }
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    return (
        <Box d="flex" justifyContent="space-between" w="100%" h="20%" p="10px">
            <h1>Friend Request List</h1>
            <OrderedList>
                {
                    firendRequestList?.map((request) => {
                        return (
                            <>
                                <ListItem>{request?.from?.name} <Button onClick={() => acceptFriendRequest(request)}>Accept</Button></ListItem>

                            </>
                        )
                    })
                }
            </OrderedList>
        </Box>
    )
}

export default FriendRequest