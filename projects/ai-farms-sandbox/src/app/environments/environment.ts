export const environment = {
  production: false,
  INDEXDB: {
    SECRET_KEY: 'ai-fYqp4J7hHXrYJTJvbxfbNx5e8t2z6MFxHMwgaz6h',
    DATABASE_NAME: 'ai-database',
    TABLES: {
      USER: "ai-users"
    }
  },
  firebaseConfig: {
    apiKey: "AIzaSyCZ_vOFV8BpZcGnNlJZtEREPVx-_gjofQ0",
    authDomain: "agrodata-ai-dev.firebaseapp.com",
    databaseURL: "https://agrodata-ai-dev.firebaseio.com",
    projectId: "agrodata-ai-dev",
    storageBucket: "agrodata-ai-dev.appspot.com",
    messagingSenderId: "258004772057",
    appId: "1:258004772057:web:3a4cd2258fd27c0c0b8ac8"
  },
  TOKEN: {
    bearer: "Gv0D3p80MMRaqIDr03iU77wlV6ULYu"
  },
  BACKEND_APPS: 'https://backend-platform-zrouftsyjq-uc.a.run.app/apps/',
  BACKEND_AUTH: 'https://backend-platform-zrouftsyjq-uc.a.run.app/auth/',
}
