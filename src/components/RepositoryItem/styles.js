import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    flexDirection: "row",
    marginBottom: metrics.baseMargin,
    padding: metrics.basePadding
  },

  infoContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: metrics.baseMargin
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 3
  },

  author: {
    color: colors.regular,
    fontSize: 14
  },

  avatar: {
    height: 50,
    width: 50
  }
});

export default styles;
