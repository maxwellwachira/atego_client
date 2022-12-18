import { useState } from 'react';
import { Text, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons";

import { useStyles } from './actionButtons.styles';
import  AddCourseModal from '../addCourseModal/addCourseModal';
import AddCategoryModal from '../addCategoryModal/addCategoryModal';
import AddTopicModal from '../addTopicModal/addTopicModal';
import AddLessonModal from '../addLessonModal/addLessonModal';

interface UserID {
    id: number;
    type: string;
    courseId?: string;
    topicId?: string;
}

const selectData = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
];


const AddButton = ({id, type, courseId, topicId}: UserID) => {
    const [openAddCourse, setOpenAddCourse] = useState(false);
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [openAddTopic, setOpenAddTopic] = useState(false);
    const [openAddLesson, setOpenAddLesson] = useState(false);
    const { classes } = useStyles();

    const onClick = () => {
        type === 'Course' ? setOpenAddCourse(true) : type === 'Category' ?  setOpenAddCategory(true) : type === 'Topic' ? setOpenAddTopic(true) : setOpenAddLesson(true);
    } 

    const onClose = () => {
        type === 'Course' ? setOpenAddCourse(false) :type === 'Category' ?  setOpenAddCategory(false) : type === 'Topic' ? setOpenAddTopic(false) : setOpenAddLesson(false);
    }
    
    return (
       <>
            <Button 
                onClick={onClick} 
                className={`${classes.button} ${classes.addButton}`}
                leftIcon={<IconPlus />}
            >
                <Text size="xl">Add {type}</Text>
            </Button>
            <AddCourseModal open={openAddCourse}  selectData={selectData} onClose={onClose}/>
            <AddCategoryModal  open={openAddCategory} onClose={onClose}/>
            <AddTopicModal  open={openAddTopic} onClose={onClose} id={id} />
            <AddLessonModal open={openAddLesson} onClose={onClose} topicId={topicId} courseId={courseId}/>
        </>
    )
}

export default AddButton;