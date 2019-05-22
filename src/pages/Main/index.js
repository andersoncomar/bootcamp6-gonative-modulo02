import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";

import api from "~/services/api";

import RepositoryItem from "~/components/RepositoryItem";

import styles from "./styles";

export default class Main extends Component {
  static navigationOptions = {
    title: "GitIssues"
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired
  };

  state = {
    repositoryInput: "",
    repositories: [],
    loadingList: false,
    loadingButton: false,
    error: false,
    refreshing: false
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const repositories = JSON.parse(
      await AsyncStorage.getItem("@GitIssues:repositories")
    );

    this.setState({
      repositories: repositories || [],
      loadingList: false,
      refreshing: false
    });
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { repositories, refreshing } = this.state;

    return !repositories.length ? (
      <Text style={styles.empty}>Nenhum repositório adicionado</Text>
    ) : (
      <FlatList
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
        style={styles.listContainer}
      />
    );
  };

  handleAddRepository = async () => {
    const { repositoryInput, repositories, loadingList } = this.state;

    if (loadingList) return;

    this.setState({ loadingButton: true });

    if (!repositoryInput) {
      this.setState({ error: "Preencha o repositório", loadingButton: false });
      return;
    }

    if (
      repositories.find(repository => repository.full_name === repositoryInput)
    ) {
      this.setState({ error: "Repositório duplicado", loadingButton: false });
      return;
    }

    try {
      const { data } = await api.get(`/repos/${repositoryInput}`);

      const repository = {
        id: data.id,
        name: data.name,
        full_name: data.full_name,
        login: data.owner.login,
        avatar: data.owner.avatar_url
      };

      this.setState({
        repositoryInput: "",
        error: "",
        repositories: [...repositories, repository]
      });

      await AsyncStorage.setItem(
        "@GitIssues:repositories",
        JSON.stringify([...repositories, repository])
      );
    } catch (err) {
      this.setState({ repositoryInput: "", error: "Repositório inexistente" });
    } finally {
      this.setState({ loadingButton: false });
    }
  };

  render() {
    const { repositoryInput, loadingList, loadingButton, error } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.formInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Adicionar novo repositório"
              underlineColorAndroid="transparent"
              value={repositoryInput}
              onChangeText={text => this.setState({ repositoryInput: text })}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={this.handleAddRepository}
            >
              {loadingButton ? (
                <ActivityIndicator size="small" style={styles.formLoading} />
              ) : (
                <Icon name="plus" size={20} style={styles.formIcon} />
              )}
            </TouchableOpacity>
          </View>
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        {loadingList ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}
