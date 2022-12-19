import { useRef } from "react";
import { Group, Table } from "@mantine/core";

import  MoreButton  from '../actionButtons/moreButton';

interface PaymentData {
   data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    amount: number;
   }[]
};

const PaymentsTable = ({data}: PaymentData) => {
 
    let count = useRef(0);
    const rows =  data.map((element)=> (
        <tr key={element.phoneNumber}>
            <td>{count.current = count.current + 1}</td>
            <td>{element.firstName}</td>
            <td>{element.lastName}</td>
            <td>{element.phoneNumber}</td>
            <td>{element.amount} KES</td>
            <td>
                <Group>
                    <MoreButton id={1} />
                </Group>
            </td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Luddoc Payments</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default PaymentsTable;