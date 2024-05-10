// Public Post Board Application
import { Container, VStack, Text, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Box, Flex, IconButton, Heading } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaSmile } from "react-icons/fa";
import React, { useState } from "react";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const handleLogin = (username, password) => {
    // Dummy login function
    setUser({ username });
    onClose();
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addPost = (title, body) => {
    const newPost = {
      id: posts.length + 1,
      title,
      body,
      date: new Date().toISOString(),
      author: user.username,
      reactions: {}
    };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const toggleReaction = (postId, emoji) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const reactions = post.reactions[emoji] || 0;
        post.reactions[emoji] = reactions ? 0 : 1;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Public Post Board</Heading>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={onOpen}>Login</Button>
        )}
      </Flex>
      {user && (
        <Box mb={4}>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => addPost("New Post", "Hello World!")}>
            New Post
          </Button>
        </Box>
      )}
      <VStack spacing={4}>
        {posts.map(post => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold">{post.title}</Text>
              {post.author === user?.username && (
                <IconButton aria-label="Delete post" icon={<FaTrash />} onClick={() => deletePost(post.id)} />
              )}
            </Flex>
            <Text mt={4}>{post.body}</Text>
            <Flex alignItems="center">
              <IconButton aria-label="React with smile" icon={<FaSmile />} onClick={() => toggleReaction(post.id, "smile")} />
              <Text ml={2}>{post.reactions["smile"] || 0}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Username" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type="password" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleLogin("user", "pass")}>
              Login
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;