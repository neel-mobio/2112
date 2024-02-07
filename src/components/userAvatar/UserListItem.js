import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ users, handleFunction }) => {
  const { user } = ChatState();
  const toast = useToast();
  const sendRequest = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/message/send-friend-request",
        {
          from: user?._id,
          to: users?._id,
        },
        config
      );
      if (data && data.error) {
        toast({
          title: data?.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return
      }
      toast({
        title: data?.message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to send the Request",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={users?.name}
        src={users?.pic}
      />
      <Box>
        <Text>{users?.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {users.email}
        </Text>
      </Box>
      <Button onClick={sendRequest}>Send Request</Button>
    </Box>
  );
};

export default UserListItem;
