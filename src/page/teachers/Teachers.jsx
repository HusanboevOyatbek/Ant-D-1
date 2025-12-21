import React from 'react';
import { Button, Flex, Space, Table, Tag } from 'antd';
import useGat from '../../hooks/useGat';
import axios from 'axios';
import { toast } from 'react-toastify';





const Teachers = () => {

    const { data: teachers , getData } = useGat("teachers");
    console.log(teachers);

    async function deletTeacher(id){
        try{
           await axios.delete(`https://69149aa43746c71fe048ece9.mockapi.io/teachers/${id}`); 
           getData();
           toast.success("O'qituvchi o'chirildi");
          
        }catch(err){
            console.log(err);
            toast.error("Xatolik yuz berdi");
        }
    }


    const columns = [

        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text) => <img width={80} src={text} alt="" />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
                        <Button style={{ padding: "5px", backgroundColor: "blue", borderRadius: "10px", color: "white", paddingLeft: "10px", paddingRight: "10px" }}>Edit</Button>
                        <Button onClick={() => deletTeacher(record.id)} style={{ padding: "5px", backgroundColor: "red", borderRadius: "10px", color: "white", paddingLeft: "10px", paddingRight: "10px" }} >Delete</Button>
                    </Space>
                </>
            ),
        },
    ];

    return <Table style={{overflow: "scroll", height: "100%"}} columns={columns} dataSource={teachers} />;
};
export default Teachers;