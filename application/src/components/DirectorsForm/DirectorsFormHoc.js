import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import {graphql} from "react-apollo";
import {addDirectorMutation, updateDirectorMutation} from './mumations'
import {directorsQuery} from '../DirectorsTable/queries'
import {moviesQuery} from '../MoviesTable/queries'

import {styles} from './styles';

const withGraphqlAdd = graphql(addDirectorMutation, {
    props: ({mutate}) => ({
        addDirector: director => mutate({
            variables: director,
            refetchQueries: [{query: directorsQuery}]
        })
    })

});
const withGraphqlUpdate = graphql(updateDirectorMutation, {
    props: ({mutate}) => ({
        updateDirector: director => mutate({
            variables: director,
            refetchQueries: [{query: directorsQuery}, {query: moviesQuery}]
        })
    })

});

export default compose(withStyles(styles), withGraphqlAdd, withGraphqlUpdate);
