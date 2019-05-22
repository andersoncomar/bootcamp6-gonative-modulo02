import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    marginBottom: metrics.baseMargin / 2,
    marginHorizontal: metrics.baseMargin,
    marginTop: metrics.baseMargin,
    padding: metrics.basePadding / 2
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center"
  },

  buttonText: {
    color: colors.regular,
    fontSize: 14
  },

  activeFilter: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default styles;
