import { Platform } from "react-native";
import {Account, Avatars, Client, OAuthProvider } from "react-native-appwrite"
import * as Linking from "expo-linking"
import { openAuthSessionAsync } from "expo-web-browser";

export const config ={
    platform : 'com.mst.restate',
    endpoint : process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login(){
    try {
        const redirectUri = Linking.createURL('/')
        const response = await account.createOAuth2Token(OAuthProvider.Google , redirectUri);
        if(!response) throw new Error("Failed to Login");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )
    } catch (error) {
        console.log(error);
        return false;
    }
}

