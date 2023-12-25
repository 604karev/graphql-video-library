import { withStyles } from "@mui/styles";
import { compose } from "recompose";

import { moviesQuery } from "./queries";

import { styles } from "./styles";
import { graphql } from "@apollo/react-hoc";

const withGraphQL = graphql(moviesQuery, {
  options: ({ name = "" }: any) => ({
    variables: { name },
  }),
});

export default compose(withStyles(styles as any), withGraphQL) as any;
