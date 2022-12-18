import { useRef } from "react";
import { Group, Table } from "@mantine/core";

import { DeleteButton, EditButton, MoreButton } from '../actionButtons';

interface CategoryData {
   data: {
    id: string;
    count: number;
    categoryName: string;
    numberOfCourses: number | string;
   }[]
};

const CategoriesTable = ({data}: CategoryData) => {
    const rows =  data.map((element)=> (
        <tr key={element.categoryName}>
            <td>{element.count}</td>
            <td>{element.categoryName}</td>
            <td>{element.numberOfCourses}</td>
            <td>
                <Group>
                    <EditButton id={element.id} type="category" />
                    <MoreButton id={element.id} type="category" />
                    <DeleteButton id={element.id} type="category" />
                </Group>
            </td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Atego Categories</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Number of Courses</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default CategoriesTable;