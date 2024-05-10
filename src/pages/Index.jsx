import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleLogin = () => {
    console.log('Login functionality to be implemented');
  };

  const handleLogout = () => {
    console.log('Logout functionality to be implemented');
  };

  const handlePost = () => {
    const newPost = {
      id: posts.length + 1,
      title,
      body,
      date: new Date().toISOString(),
      author: 'Current User', // Placeholder for user identification
      reactions: {}
    };
    setPosts([newPost, ...posts]);
    setTitle('');
    setBody('');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Public Post Board</Heading>
        <Button onClick={onOpen}>Login / Logout</Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login / Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleLogout} ml={4}>Logout</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box as="form" onSubmit={(e) => { e.preventDefault(); handlePost(); }}>
        <FormControl isRequired mb={4}>
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Body</FormLabel>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">Post</Button>
      </Box>
      <VStack spacing={4} align="stretch">
        {posts.map(post => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">{post.title}</Heading>
              <Button size="sm" onClick={() => handleDeletePost(post.id)}>Delete</Button>
            </Flex>
            <Text mt={4}>{post.body}</Text>
            <Text fontSize="sm">Posted on: {new Date(post.date).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;