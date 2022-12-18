import { useState } from "react";
import { Group, Loader, Text, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/router";

import { urls } from "../../../../constants/urls";
import { useStyles } from './actionButtons.styles';

interface ID {
    type: string;
    courseId: string;
    topicId?: string;

}

const TopicButton = ({ courseId, topicId, type }: ID) => {
    const { classes } = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onClick = () => {
        setLoading(true);
        router.push(`${urls.frontEnd}/topics/${courseId}${type === "Lessons" ? `/lessons/${topicId}` : ''}`).then(() => setLoading(false));
    }

    return (
        <UnstyledButton className={`${classes.button} ${classes.topicButton}`} onClick={onClick} disabled={loading}>
            {loading ?
                <Group>
                    <Loader size="xs" />
                    <Text size="sm">{type}</Text>
                </Group>
                :
                <Text size="sm">{type}</Text>
            }
        </UnstyledButton>
    )
}

export default TopicButton;