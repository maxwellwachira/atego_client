import { Group, Table } from "@mantine/core";

import { DeleteButton, EditButton, MoreButton } from '../actionButtons';

interface StudentData {
   data: {
        id: string;
        count: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
   }[];
   type: string;
};

const StudentsTable = ({data, type}: StudentData) => {

    const rows =  data.map((element)=> (
        <tr key={element.phoneNumber}>
            <td>{element.count}</td>
            <td>{element.firstName}</td>
            <td>{element.lastName}</td>
            <td>{element.phoneNumber}</td>
            <td>{element.email}</td>
            <td>
                <Group>
                    <EditButton id={element.id} type={type} />
                    <MoreButton id={element.id} type={type} />
                    <DeleteButton id={element.id} type={type} />
                </Group>
            </td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Luddoc {type}s</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default StudentsTable;