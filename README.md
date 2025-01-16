# urql-expo-upload-image

This is a minimum recreation for what might be a bug when trying to upload files with urql in expo.

The app renders two buttons:

1. "Upload with urql" will upload an image with `useMutation`

   This crashes the entire app. No logs, no network request in devtools, and the request never reaches the server.

   I also stepped through with the debugger and urql's [`serializeBody`](https://github.com/urql-graphql/urql/blob/main/packages/core/src/internal/fetchOptions.ts#L123) that creates the FormData looks correct. It's still not clear what causes the app to crash.

2. "Upload with fetch" will upload an image with `fetch`

   This works as expected.

## Demo
