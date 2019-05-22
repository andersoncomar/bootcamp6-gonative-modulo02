import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter
  },

  listContainer: {
    paddingHorizontal: metrics.basePadding
  },

  loading: {
    marginTop: metrics.baseMargin * 2
  },

  error: {
    color: colors.danger,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold"
  },

  empty: {
    color: colors.dark,
    marginTop: metrics.baseMargin * 2,
    textAlign: "center"
  }
});

export default styles;
