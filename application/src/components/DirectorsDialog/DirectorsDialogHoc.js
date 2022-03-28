import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';
import { moviesQuery } from '../MoviesTable/queries';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
        deleteDirector: id => mutate({
            variables: id,
            refetchQueries: [{
                query: directorsQuery,
                variables: { name: '' }
            },
            {
                query: moviesQuery,
                variables: { name: '' }
            }],
        }),
    }),
});

export default compose(withGraphqlDelete);