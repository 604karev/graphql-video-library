import {withStyles} from '@material-ui/core/styles';
import {compose} from 'recompose';
import {graphql} from "react-apollo";
import {addMovieMutation, updateMovieMutation} from './mutations'
import {moviesQuery} from '../MoviesTable/queries'
import {directorsQuery} from './queries'
import {directorsQuery as directorQuery} from '../DirectorsTable/queries'

import {styles} from './styles';


const withGraphqlAdd = graphql(addMovieMutation, {
    props: ({mutate}) => ({
        addMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{query: moviesQuery}, {query: directorQuery}]
        })
    })

});
const withGraphqlUpdate = graphql(updateMovieMutation, {
    props: ({mutate}) => ({
        updateMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{query: moviesQuery}, {query: directorQuery}]
        })
    })

});
export default compose(withStyles(styles), withGraphqlAdd, withGraphqlUpdate, graphql(directorsQuery));
