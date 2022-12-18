import { Group, Table } from "@mantine/core";

import { DeleteButton, EditButton, TopicButton, MoreButton } from '../actionButtons';

interface CourseData {
   data: {
    id: string;
    count: number;
    courseTitle: string;
    categoryName: string;
    pricing: string;
   }[]
};

const CourseTable = ({data}: CourseData) => {
 
    const rows =  data.map((element)=> (
        <tr key={element.courseTitle}>
            <td>{element.count}</td>
            <td>{element.courseTitle}</td>
            <td>{element.categoryName}</td>
            <td>{element.pricing}</td>
            <td><TopicButton courseId={element.id} type="Topics" /></td>
            <td>
                <Group>
                    <EditButton id={element.id} type="course"/>
                    <MoreButton  id={element.id} type="course"/>
                    <DeleteButton  id={element.id} type="course"/>
                </Group>
            </td>
        </tr>
    ));
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Luddoc Courses</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Course Name</th>
                    <th>Category</th>
                    <th>Pricing</th>
                    <th>Topics</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default CourseTable;