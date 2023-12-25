import { compose } from "recompose";
import { graphql } from "@apollo/react-hoc";

import { deleteMovieMutation } from "./mutations";
import { moviesQuery } from "../MoviesTable/queries";
import { directorsQuery as directorQuery } from "../DirectorsTable/queries";

const withGraphqlDelete = graphql(deleteMovieMutation, {
  props: ({ mutate }: any) => ({
    deleteMovie: (id: any) =>
      mutate({
        variables: id,
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
});

export default compose(withGraphqlDelete) as any;
