import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [allUsers, setAllUsers] = useState<any>(null);
  const [userById, setUserById] = useState<any>(null);
  const [newUserResult, setNewUserResult] = useState<any>(null);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [errorAll, setErrorAll] = useState<string | null>(null);
  const [errorOne, setErrorOne] = useState<string | null>(null);
  const [errorPost, setErrorPost] = useState<string | null>(null);
  const [id, setId] = useState("");

  async function loadAllUsers() {
    setLoadingAll(true);
    setErrorAll(null);
    setAllUsers(null);

    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const result = await response.json();
      setAllUsers(result);
    } catch (err) {
      setErrorAll("Unable to load /api/users");
    } finally {
      setLoadingAll(false);
    }
  }

  async function createUser() {
    setLoadingPost(true);
    setErrorPost(null);
    setNewUserResult(null);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example2.com",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || `Error ${response.status}`);
      }

      setNewUserResult(result);
    } catch (err) {
      setErrorPost("Unable to post /api/users");
    } finally {
      setLoadingPost(false);
    }
  }

  async function loadUserById() {
    setLoadingOne(true);
    setErrorOne(null);
    setUserById(null);

    if (!id.trim()) {
      setErrorOne("Enter an id to load");
      setLoadingOne(false);
      return;
    }

    try {
      const response = await fetch(`/api/users/${id.trim()}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }
      const result = await response.json();
      setUserById(result);
    } catch (err) {
      setErrorOne("Unable to load /api/users/{id}");
    } finally {
      setLoadingOne(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>API calls</Text>

      <View style={styles.box}>
        <Text style={styles.label}>GET /api/users</Text>
        <Button
          title="Load users"
          onPress={loadAllUsers}
          disabled={loadingAll}
        />
        {loadingAll && <Text style={styles.status}>Loading...</Text>}
        {errorAll && <Text style={styles.error}>{errorAll}</Text>}
        {allUsers !== null && (
          <Text style={styles.output}>{JSON.stringify(allUsers, null, 2)}</Text>
        )}

        <View style={styles.spacer} />

        <Text style={styles.label}>POST /api/users</Text>
        <Button
          title="Create sample user"
          onPress={createUser}
          disabled={loadingPost}
        />
        {loadingPost && <Text style={styles.status}>Posting...</Text>}
        {errorPost && <Text style={styles.error}>{errorPost}</Text>}
        {newUserResult !== null && (
          <Text style={styles.output}>
            {JSON.stringify(newUserResult, null, 2)}
          </Text>
        )}
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>GET /api/users/{"{id}"}</Text>
        <TextInput
          style={styles.input}
          placeholder="id"
          value={id}
          onChangeText={setId}
        />
        <Button
          title="Load user by id"
          onPress={loadUserById}
          disabled={loadingOne}
        />
        {loadingOne && <Text style={styles.status}>Loading...</Text>}
        {errorOne && <Text style={styles.error}>{errorOne}</Text>}
        {userById !== null && (
          <Text style={styles.output}>{JSON.stringify(userById, null, 2)}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  box: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  status: {
    marginTop: 10,
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    fontSize: 16,
    color: "#b00020",
  },
  output: {
    marginTop: 10,
    fontSize: 14,
    color: "#111",
    fontFamily: "monospace",
  },
  spacer: {
    height: 20,
  },
});
