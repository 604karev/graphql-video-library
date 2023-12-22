import { withStyles } from "@mui/styles";
import { compose } from "recompose";
import { graphql } from "react-apollo";
import { moviesQuery } from "./queries";

import { styles } from "./styles";

const withGraphQL = graphql(moviesQuery, {
  options: ({ name = "" }: any) => ({
    variables: { name },
  }),
});

export default compose(withStyles(styles as any), withGraphQL) as any;
