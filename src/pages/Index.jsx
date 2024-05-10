import { useState, useEffect } from 'react';
import { Container, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, useDisclosure, Text, Box, IconButton, Flex } from '@chakra-ui/react';
import { FaTrash, FaSmile } from 'react-icons/fa';

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  const handleLogin = (username, password) => {
    // Placeholder for login logic
    setUser({ username });
    onClose();
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addPost = () => {
    const post = { ...newPost, id: Date.now(), date: new Date().toISOString(), author: user.username, reactions: {} };
    setPosts([post, ...posts]);
    setNewPost({ title: '', body: '' });
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const toggleReaction = (postId, emoji) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const count = post.reactions[emoji] || 0;
        post.reactions[emoji] = count ? 0 : 1;
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex justifyContent="space-between" mb={4}>
        <Text fontSize="2xl">Public Post Board</Text>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={onOpen}>Login</Button>
        )}
      </Flex>
      {user && (
        <VStack spacing={4} mb={4}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Body</FormLabel>
            <Input value={newPost.body} onChange={(e) => setNewPost({ ...newPost, body: e.target.value })} />
          </FormControl>
          <Button onClick={addPost}>Post</Button>
        </VStack>
      )}
      <VStack spacing={4}>
        {posts.map(post => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px">
            <Flex justifyContent="space-between">
              <Text fontSize="xl">{post.title}</Text>
              {post.author === user?.username && (
                <IconButton aria-label="Delete post" icon={<FaTrash />} onClick={() => deletePost(post.id)} />
              )}
            </Flex>
            <Text mt={4}>{post.body}</Text>
            <Flex mt={4}>
              <IconButton aria-label="React with smile" icon={<FaSmile />} onClick={() => toggleReaction(post.id, 'smile')} />
              <Text ml={2}>{post.reactions['smile'] || 0}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Enter username" />
              <FormLabel mt={4}>Password</FormLabel>
              <Input placeholder="Enter password" type="password" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleLogin('user', 'pass')}>
              Login
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;