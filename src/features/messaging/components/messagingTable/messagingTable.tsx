import { useRef } from "react";
import { Group, Table } from "@mantine/core";

import  MoreButton  from '../actionButtons/moreButton';

interface MessageData {
   data: {
    topic: string;
    recipient: string;
    message: string;
   }[]
};

const MessagingTable = ({data}: MessageData) => {
 
    let count = useRef(0);
    const rows =  data.map((element)=> (
        <tr key={element.recipient}>
            <td>{count.current = count.current + 1}</td>
            <td>{element.topic}</td>
            <td>{element.recipient}</td>
            <td>{element.message}</td>
            <td>
                <Group>
                    <MoreButton id={1} />
                </Group>
            </td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Luddoc Sent SMS</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Topic</th>
                    <th>Recipient</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default MessagingTable;