import React from "react";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";

const RepositoryItem = ({ repository, navigation: { navigate } }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() =>
      navigate("Issues", {
        title: repository.name,
        full_name: repository.full_name
      })
    }
  >
    <Image style={styles.avatar} source={{ uri: repository.avatar }} />
    <View style={styles.infoContainer}>
      <Text style={styles.title}>{repository.name}</Text>
      <Text style={styles.author}>{repository.login}</Text>
    </View>
    <Icon style={styles.icon} name="chevron-right" size={16} />
  </TouchableOpacity>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    login: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired
};

export default withNavigation(RepositoryItem);
