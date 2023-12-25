import { compose } from "recompose";
import { graphql } from "@apollo/react-hoc";

import { deleteDirectorMutation } from "./mutations";
import { directorsQuery } from "../DirectorsTable/queries";
import { moviesQuery } from "../MoviesTable/queries";

const withGraphqlDelete = graphql(deleteDirectorMutation, {
  props: ({ mutate }: any) => ({
    deleteDirector: (id: any) =>
      mutate({
        variables: id,
        refetchQueries: [
          {
            query: directorsQuery,
            variables: { name: "" },
          },
          {
            query: moviesQuery,
            variables: { name: "" },
          },
        ],
      }),
  }),
});

export default compose(withGraphqlDelete) as any;
