import { StyleSheet, View, Button, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Client,
  Provider,
  cacheExchange,
  fetchExchange,
  gql,
  useMutation,
} from "urql";
import { useState } from "react";

const url = "https://trygql.dev/graphql/uploads-mock";

export default function App() {
  const client = new Client({
    url,
    exchanges: [cacheExchange, fetchExchange],
  });

  return (
    <Provider value={client}>
      <View style={styles.container}>
        <UploadImageWithUrql />
        <UploadImageWithFetch />
      </View>
    </Provider>
  );
}

/**
 * Util that opens the image picker and returns the selected image.
 */
const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync();
  if (result.canceled) return;

  return result.assets[0];
};

const UploadMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

function UploadImageWithUrql() {
  const [_, upload] = useMutation(UploadMutation);

  return (
    <Button
      title="Upload with urql"
      onPress={async () => {
        const asset = await pickImage();
        if (!asset) return;

        const file = {
          uri: asset.uri,
          name: asset.fileName,
          type: asset.mimeType,
        };
        // Important so that this file passes urql's `instanceof File` check
        // which is needed to convert the request to multipart/form-data.
        file.__proto__ = File.prototype;

        if (file instanceof File) {
          console.error('file is NOT instance of File');
          return
        }

        // ❌ THIS CRASHES
        upload({ file });
      }}
    />
  );
}

function UploadImageWithFetch() {
  const [response, setResponse] = useState("");

  return (
    <>
      <Text>{response}</Text>
      <Button
        title="Upload with fetch"
        onPress={async () => {
          const asset = await pickImage();
          if (!asset) return;

          // building FormData according to jaydenseric/graphql-multipart-request-spec
          const formData = new FormData();

          formData.append(
            "operations",
            JSON.stringify({
              query: UploadMutation,
              variables: { file: null },
            })
          );

          formData.append("map", JSON.stringify({ 0: ["variables.file"] }));

          formData.append("0", {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.mimeType,
          });

          const response = await fetch(url, {
            method: "POST",
            body: formData,
          }).then((res) => res.text());

          console.log(response);

          setResponse(response);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
