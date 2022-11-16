import { Box, Loader } from '@mantine/core';

import { colors } from '../../constants/colors';
import  styles from './PageLoader.module.css';

const PageLoader = () => {

    return (
        <Box className={styles["wrapper"]}>
            <Loader size="lg" variant="dots" color={colors.primaryColor}/>
        </Box>
    );
}

export default PageLoader;