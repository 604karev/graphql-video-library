import { withStyles } from "@mui/styles";
import { compose } from "recompose";

import { styles } from "./styles";

export default compose(withStyles(styles as any)) as any;
