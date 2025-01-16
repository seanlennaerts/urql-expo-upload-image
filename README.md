# urql-expo-upload-image

This is a minimum recreation for what might be a bug when trying to upload files with urql in expo.

The app renders two buttons:

1. "Upload with urql" will upload an image with `useMutation`

   This crashes the entire app. No logs, no network request in devtools, and the request never reaches the server.

   I also stepped through with the debugger and urql's [`serializeBody`](https://github.com/urql-graphql/urql/blob/main/packages/core/src/internal/fetchOptions.ts#L123) that creates the FormData looks correct. It's still not clear what causes the app to crash.

2. "Upload with fetch" will upload an image with `fetch`

   This works as expected.

## Demo

<video width=300 controls>
   <source src="https://private-user-images.githubusercontent.com/11897372/403793379-ec31ca56-fd57-453e-b8b0-ddab96e91c9f.mov?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzcwMjAyMTYsIm5iZiI6MTczNzAxOTkxNiwicGF0aCI6Ii8xMTg5NzM3Mi80MDM3OTMzNzktZWMzMWNhNTYtZmQ1Ny00NTNlLWI4YjAtZGRhYjk2ZTkxYzlmLm1vdj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTE2VDA5MzE1NlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTc2NmM3MWNjNTc4NjExMjk2ZGQ4OTBjYTRiNmU2Zjg5Mjc3NWVkMWExNTk5Mjk2ODMyMGM4NjFmM2NjZDM5NGQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.jCmuvgPSdBdoM0VgGO7zRQuwheOR8rudABujQ3sDTKY" type="video/mp4">
</video>
