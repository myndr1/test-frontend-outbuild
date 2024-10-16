/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_VALID_USERNAME: string;
      REACT_APP_VALID_PASSWORD: string;
      REACT_APP_API_URL: string;
    }
  }