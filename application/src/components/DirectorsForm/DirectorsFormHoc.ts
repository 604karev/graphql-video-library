import { withStyles } from "@mui/styles";
import { compose } from "recompose";
import { graphql } from "@apollo/react-hoc";
import { addDirectorMutation, updateDirectorMutation } from "./mumations";
import { directorsQuery } from "../DirectorsTable/queries";
import { moviesQuery } from "../MoviesTable/queries";

import { styles } from "./styles";

const withGraphQL = compose(
  graphql(addDirectorMutation, {
    props: ({ mutate }: any) => ({
      addDirector: (director: any) =>
        mutate({
          variables: director,
          refetchQueries: [
            {
              query: directorsQuery,
              variables: { name: "" },
            },
          ],
        }),
    }),
  }),
  graphql(updateDirectorMutation, {
    props: ({ mutate }: any) => ({
      updateDirector: (director: any) =>
        mutate({
          variables: director,
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
  })
);

export default compose(withStyles(styles), withGraphQL) as any;
