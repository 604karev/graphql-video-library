import { withStyles } from "@mui/styles";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import { addMovieMutation, updateMovieMutation } from "./mutations";
import { moviesQuery } from "../MoviesTable/queries";
import { directorsQuery } from "./queries";
import { directorsQuery as directorQuery } from "../DirectorsTable/queries";

import { styles } from "./styles";

const withGraphQL = compose(
  graphql(addMovieMutation, {
    props: ({ mutate }: any) => ({
      addMovie: (movie: any) =>
        mutate({
          variables: movie,
          refetchQueries: [
            {
              query: moviesQuery,
              variables: { name: "" },
            },
            {
              query: directorQuery,
              variables: { name: "" },
            },
          ],
        }),
    }),
  }),
  graphql(updateMovieMutation, {
    props: ({ mutate }: any) => ({
      updateMovie: (movie: any) =>
        mutate({
          variables: movie,
          refetchQueries: [
            {
              query: moviesQuery,
              variables: { name: "" },
            },
            {
              query: directorQuery,
              variables: { name: "" },
            },
          ],
        }),
    }),
  }),
  graphql(directorsQuery, {
    options: ({ name = "" }: any) => ({
      variables: { name },
    }),
  })
);
export default compose(withStyles(styles), withGraphQL) as any;
