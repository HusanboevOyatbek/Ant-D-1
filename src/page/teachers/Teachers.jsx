import React, { useState } from 'react';
import { Button, Flex, Form, Input, Modal, Space, Table, Tag } from 'antd';
import useGat from '../../hooks/useGat';
import axios from 'axios';
import { toast } from 'react-toastify';





const Teachers = () => {

    const { data: teachers, getData } = useGat("teachers");
    console.log(teachers);
    const [selected, setSelected] = useState(null)
    const [form] = Form.useForm();

    async function deletTeacher(id) {
        try {
            await axios.delete(`https://69149aa43746c71fe048ece9.mockapi.io/teachers/${id}`);
            getData();
            toast.success("O'qituvchi o'chirildi");

        } catch (err) {
            console.log(err);
            toast.error("Xatolik yuz berdi");
        }
    }


    function editTeacher(id) {
        const item = teachers && teachers.find(t => t.id === id || t.id == id);
        setSelected(id)
        if (item) {
            form.setFieldsValue({
                firstName: item.firstName,
                avatar: item.avatar,
                age: item.age,
            })
        }
        setIsModalOpen(true)
    }

    const columns = [

        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <img style={{ width: "70px", height: "70px", border: "2px solid yellowgreen", borderRadius: "50%", objectFit: "cover" }} src={text} alt="" />
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },


        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space size="middle">
                        <Button> {record.id}</Button>
                        <Button onClick={() => editTeacher(record.id)} style={{ padding: "5px", backgroundColor: "blue", borderRadius: "10px", color: "white", paddingLeft: "10px", paddingRight: "10px" }}>Edit</Button>
                        <Button onClick={() => deletTeacher(record.id)} style={{ padding: "5px", backgroundColor: "red", borderRadius: "10px", color: "white", paddingLeft: "10px", paddingRight: "10px" }} >Delete</Button>
                    </Space>
                </>
            ),
        },
    ];


    //**Modal str */
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setSelected(null);
        form.resetFields();
        setIsModalOpen(true);
    };


    //**Modal end */

    //** Add Teachers str */


    const onFinish = async (values) => {
        try {
            if (selected) {
                await axios.put(`https://69149aa43746c71fe048ece9.mockapi.io/teachers/${selected}`, values);
                toast.success("O'qituvchi yangilandi");
            } else {
                await axios.post(`https://69149aa43746c71fe048ece9.mockapi.io/teachers`, values);
                toast.success("Yangi o'qituvchi qo'shildi");
            }
            getData();
            setIsModalOpen(false);
            setSelected(null);
            form.resetFields();
        } catch (err) {
            console.log(err);
            toast.error("Xatolik yuz berdi");
        }
    }


    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    //** Add Teachers end */


    return (
        <>

            <Button type="primary" onClick={showModal}>
                Teachers add +
            </Button>
            <Modal
                title={selected ? "Edit Teacher" : "Add Teacher"}
                closable={true}
                maskClosable={true}
                open={isModalOpen}
                onCancel={() => { setIsModalOpen(false); setSelected(null); form.resetFields(); }}
                footer={[]}
            >
                <Form
                    form={form}
                    layout='vertical'
                    name="basic"
                    labelCol={{ span: 32 }}
                    wrapperCol={{ span: 32 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="ismingizni kiriting"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Rasim URL "
                        name="avatar"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        label="Yosh"
                        name="age"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                style={{ overflowY: "scroll", height: "90%", marginTop: "15px" }}
                columns={columns}
                dataSource={teachers}
            />
        </>
    );

};
export default Teachers;