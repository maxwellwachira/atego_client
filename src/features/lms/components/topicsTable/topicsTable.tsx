import { Group, Table } from "@mantine/core";

import { DeleteButton, EditButton, MoreButton, TopicButton } from '../actionButtons';

interface TopicData {
   data: {
    id: string;
    count: number;
    topicName: string;
    courseId: string;
   }[]
};

const TopicsTable = ({data}: TopicData) => {
    const rows =  data.map((element)=> (
        <tr key={element.topicName}>
            <td>{element.count}</td>
            <td>{element.topicName}</td>
            <td><TopicButton type="Lessons" courseId={element.courseId} topicId={element.id}/></td>
            <td>
                <Group>
                    <EditButton id={element.id} type="topic" />
                    <MoreButton id={element.id} type="topic" />
                    <DeleteButton id={element.id} type="topic" />
                </Group>
            </td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={20}>
            <caption>Luddoc Topics</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Topic Name</th>
                    <th>Lessons</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default TopicsTable;