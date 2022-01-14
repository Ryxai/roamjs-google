import { createConfigObserver } from "roamjs-components";
import axios from "axios";
import GoogleLogo from "./assets/Google.svg";

const scopes = [
    "tasks",
    "people"
]
  .map((s) => `https://www.googleapis.com/auth/${s}`)
  .join("%20");

createConfigObserver({
  title: `roam/ryxai/google`,
  config: {
    tabs: [
      {
        id: "home",
        fields: [
          {
            title: "oauth",
            type: "oauth",
            options: {
              service: "google",
              getPopoutUrl: () =>
                Promise.resolve(
                  `https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}auth=true&response_type=code&scope=${scopes}`
                ),
              getAuthData: (data: string) =>
                axios
                  .post(`${process.env.API_URL}/${process.env.GOOGLE_AUTH_ROUTE}`, {
                    ...JSON.parse(data),
                    grant_type: "authorization_code",
                  })
                  .then((r) => r.data),
              ServiceIcon: GoogleLogo,
            },
            description: "Log into Google to connect to your account to Roam!",
          },
        ],
      },
    ],
    versioning: true,
  },
});
