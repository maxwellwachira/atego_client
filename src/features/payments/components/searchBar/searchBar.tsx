import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons';

import { useStyles } from './searchBar.styles';

const SearchBar = () => {
    const { classes } = useStyles();
    const form = useForm({
        initialValues: {
            search: ''
        }
    });

   return (
    <form onSubmit={form.onSubmit(() => {})}>
        <TextInput 
            icon={<IconSearch />}
            placeholder="Search..."
            value={form.values.search}
            onChange={(event) => form.setFieldValue('search', event.currentTarget.value)}
          
            className={classes.wrapper}
        />
    </form>
   )

}

export default SearchBar;