import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function UserDetail() {
  const params = useLocalSearchParams();
  const id = params.id as string | undefined;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!id) {
        setError("No id provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Unable to load /api/users/{id}");
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>GET /api/users/{id}</Text>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <Text style={styles.output}>{JSON.stringify(data, null, 2)}</Text>
      )}
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
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
  },
  error: {
    color: "#b00020",
    fontSize: 16,
  },
  output: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: "monospace",
    color: "#111",
  },
});
