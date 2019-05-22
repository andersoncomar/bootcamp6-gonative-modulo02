import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text
} from "react-native";

import api from "~/services/api";

import styles from "./styles";

import Filter from "~/components/Filter";
import IssueItem from "~/components/IssueItem";

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
  });

  state = {
    activeFilter: "all",
    issues: [],
    loading: true,
    error: "",
    refreshing: false
  };

  componentDidMount() {
    this.loadIssues();
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const { activeFilter } = this.state;

    this.setState({ refreshing: true });

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam(
          "full_name"
        )}/issues?state=${activeFilter}`
      );

      this.setState({ issues: data });
    } catch (err) {
      this.setState({ error: "Erro ao recuperar as Issues" });
    } finally {
      this.setState({ loading: false, refreshing: false });
    }
  };

  renderListItem = ({ item }) => <IssueItem issue={item} />;

  renderList = () => {
    const { issues, refreshing } = this.state;

    return !issues.length ? (
      <Text style={styles.empty}>Nenhuma Issue encontrada</Text>
    ) : (
      <FlatList
        data={issues}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={refreshing}
        style={styles.listContainer}
      />
    );
  };

  changeFilter = async value => {
    const { navigation } = this.props;

    this.setState({ activeFilter: value });

    try {
      const { data } = await api.get(
        `/repos/${navigation.getParam("full_name")}/issues?state=${value}`
      );

      this.setState({ issues: data });
    } catch (err) {
      this.setState({ error: "Erro ao recuperar as Issues" });
    }
  };

  render() {
    const { loading, error, activeFilter } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Filter activeFilter={activeFilter} changeFilter={this.changeFilter} />

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
