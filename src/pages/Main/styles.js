import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighter
  },

  form: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    padding: metrics.basePadding
  },

  formInput: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    color: colors.darker,
    flex: 1,
    fontSize: 14,
    marginRight: metrics.baseMargin,
    padding: metrics.basePadding / 2
  },

  inputContainer: {
    alignItems: "center",
    flexDirection: "row"
  },

  listContainer: {
    padding: metrics.basePadding
  },

  loading: {
    marginTop: metrics.baseMargin * 2
  },

  formIcon: {
    color: colors.dark
  },

  empty: {
    color: colors.dark,
    marginTop: metrics.baseMargin * 2,
    textAlign: "center"
  },

  error: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: metrics.basePadding,
    textAlign: "center"
  }
});

export default styles;
