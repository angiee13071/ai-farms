export const environment = {
  firebaseConfig: {
    apiKey: "AIzaSyCZ_vOFV8BpZcGnNlJZtEREPVx-_gjofQ0",
    authDomain: "agrodata-ai-dev.firebaseapp.com",
    databaseURL: "https://agrodata-ai-dev.firebaseio.com",
    projectId: "agrodata-ai-dev",
    storageBucket: "agrodata-ai-dev.appspot.com",
    messagingSenderId: "258004772057",
    appId: "1:258004772057:web:3a4cd2258fd27c0c0b8ac8",
    measurementId: "G-DWNQXJWJ6N"
  },
  production: false,
  INDEXDB: {
    SECRET_KEY: 'ai-fYqp4J7hHXrYJTJvbxfbNx5e8t2z6MFxHMwgaz6h',
    DATABASE_NAME: 'ai-database',
    TABLES: {
      USER: "ai-users"
    }
  },
  TOKEN: {
    bearer: "Gv0D3p80MMRaqIDr03iU77wlV6ULYu"
  },
  BACKEND_URL: 'https://backend-platform-zrouftsyjq-uc.a.run.app/',
  BACKEND_MICRO_URL: 'https://microservice-prices-zrouftsyjq-uc.a.run.app/',
  expires_cache: 120,
  location_time: 150,
  indexedDBCOnfig: {
    name: 'platform',
    version: 1,
    objectStoresMeta: [{
      store: 'request',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'body', keypath: 'body', options: { unique: false } },
        { name: 'create_date', keypath: 'create_date', options: { unique: false } },
        { name: 'expires_in', keypath: 'expires_in', options: { unique: false } },
        { name: 'request', keypath: 'request', options: { unique: false } },
      ]
    }]
  }
}
