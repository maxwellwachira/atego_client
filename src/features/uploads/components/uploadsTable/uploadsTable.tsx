import { Box, Group, Table } from "@mantine/core";

import { DeleteButton, DownloadButton, EditButton } from '../actionButtons';

interface CategoryData {
   type?: string;
   data: {
    id: string;
    count: number;
    fileName: string;
    fileExtension: string;
    type: string;
    size: number;
    createdAt: string;
   }[]
};

const UploadsTable = ({data, type}: CategoryData) => {
    const rows =  data.map((element)=> (
        <tr key={element.fileName}>
            <td>{element.count}</td>
            <td>{element.fileName}</td>
            <td>{element.type === "application" ? "Document" : element.type}</td>
            <td>{element.size} MB</td>
            <td>{element.createdAt}</td>
            <td>
                <Group>
                    <DownloadButton id={element.id} type="category" fileName={element.fileName} fileExtension={element.fileExtension} />
                    <Box style={{display: type === 'student' ? 'none' : ''}}>
                        <EditButton id={element.id} type="category"/>
                    </Box>
                    <Box style={{display: type !== 'admin' ? 'none' : ''}}>
                        <DeleteButton id={element.id} type="category" />
                    </Box>
                </Group>
            </td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Luddoc Uploads</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Uploaded At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default UploadsTable;