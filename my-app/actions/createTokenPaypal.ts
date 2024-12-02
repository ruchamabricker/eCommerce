import axios from "axios";

export const generateToken = async () => {
  try {
    const { data } = await axios({
      method: "POST",
      url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      data: "grant_type=client_credentials",
      auth: {
        username: process.env.PAYPAL_CLIENT_ID!,
        password: process.env.PAYPAL_SECRET!,
      },
    });

    return data.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};
