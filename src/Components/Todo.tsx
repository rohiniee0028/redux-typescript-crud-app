import {
    Box, Button, Flex, Heading, Input, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Toast,
    useToast,
    Spinner,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { TodoTypes } from "../Redux/TodoReducer/ActionTypes";
import { deleteData, getAllTodo, postTodoData, toggleStatus, updateData } from "../Redux/TodoReducer/Action";
import { ITodo, ITodoDataReducer, ITodoPost } from "../@types/ItodoData";
import { AppState } from "../Redux/Store";


export const Todo: React.FC = (): any => {

    const [text, setText] = useState<string>("");
    const [updatedText, setUpdatedText] = useState<string>("");
    const [updatedId, setUpdatedId] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch: Dispatch<any> = useDispatch();
    const toast = useToast();

    const { todoData, isLoading, isError } = useSelector((store: AppState) => store.todo) as ITodoDataReducer;


    useEffect(() => {
        dispatch(getAllTodo());
    }, [])


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    // --------------------adding task-------------------------------

    const AddTodoData = async () => {
        let obj: ITodo = {
            id: nanoid(),
            title: text,
            status: false
        }
        if (text.length > 0) {
            await dispatch(postTodoData(obj))
            toast({
                title: `Your Task added successfully`,
                status: "success",
                duration: 4000,
                position: "bottom",
                isClosable: true,
            });
            await dispatch(getAllTodo());
        }
        else {
            toast({
                title: `please add some task`,
                status: "info",
                duration: 2000,
                position: "top",
                isClosable: true,
            });
        }
        setText("")
    }

    // --------delete----------------------------

    const handleDelete = async (id: string) => {
        await dispatch(deleteData(id));
        toast({
            title: `Task deleted successfully`,
            status: "success",
            duration: 4000,
            position: "bottom-right",
            isClosable: true,
        });
        await dispatch(getAllTodo());
    }

    // --------------update title (put)------------------------------//

    const handleUpdate = async (item: ITodo) => {
        setUpdatedId(item.id);
        onOpen();
    }

    const changeTitle = async () => {
        let obj: ITodoPost = {
            title: updatedText,
            status: false
        }
        await dispatch(updateData(updatedId, obj));
        toast({
            title: `Task updated successfully`,
            status: "success",
            duration: 4000,
            position: "top",
            isClosable: true,
        });
        await dispatch(getAllTodo());
        setUpdatedText("")
        onClose();
    }

    //------------------status toggle (patch)------------------------

    const handleToggle = async (item: ITodo) => {
        await dispatch(toggleStatus(item.id, item.status));
        await dispatch(getAllTodo());
    }


    if (isLoading) {
        return <Spinner
            thickness='4px'
            speed='0.35s'
            emptyColor='gray.200'
            color='green.500'
            size='xl'
        />
    }
    else if (isError) {
        return "...Something went wrong"
    }
    else {
        return (
            <>
                <br />
                <Heading>CRUD Application</Heading>
                <Box marginTop={"50px"}>
                    <Flex width={"50%"} margin={"auto"}>
                        <Input type='text' value={text} placeholder="enter todo" onChange={handleChange} />
                        <Button onClick={AddTodoData} bg={"green"} color={"white"} _hover={{ bg: "green" }}>Add</Button>
                    </Flex>
                    <br />
                    <br />
                    <TableContainer width={"95%"} margin={"auto"}>
                        <Table variant='simple'>
                            <TableCaption marginTop={"50px"}>Todo Task List</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Task</Th>
                                    <Th>Status</Th>
                                    <Th>Update</Th>
                                    <Th>Delete</Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    todoData && todoData.map((item: ITodo) => (
                                        <Tr key={item.id}>
                                            <Td>{item.title}</Td>
                                            <Td><Button onClick={() => handleToggle(item)} bg={"blue.300"} color={"white"} _hover={{ bg: "blue.300" }}>{!item.status ? "NOT DONE" : "DONE"}</Button></Td>
                                            <Td>
                                                <Button onClick={()=>handleUpdate(item)} bg={"orange"} color={"white"} _hover={{ bg: "orange" }}>Update</Button>
                                                <Modal
                                                    isOpen={isOpen}
                                                    onClose={onClose}
                                                >
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Update</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody pb={6}>
                                                            <FormControl>
                                                                <FormLabel>Title</FormLabel>
                                                                <Input placeholder='Update Title' value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
                                                            </FormControl>
                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme='blue' mr={3} onClick={changeTitle}>
                                                                Update
                                                            </Button>
                                                        </ModalFooter>
                                                    </ModalContent>
                                                </Modal>
                                            </Td>
                                            <Td>
                                                <Button onClick={() => handleDelete(item.id)} bg={"red.400"} color={"white"} _hover={{ bg: "red.400" }}>Delete</Button>
                                            </Td>
                                        </Tr>
                                    ))
                                }

                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>
            </>
        )
    }

}

// http://localhost:8000/todo