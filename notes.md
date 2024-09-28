THE MEGA PROJECT

Lets, Create React ->  Social Media App  ->  npm i create vite@latest 12-MegaProject

Third party packages :
 npm install
  1. Redux (state-management-library) -> @reduxjs/toolkit, react-redux 
  2. React-Router (client-side-routing) -> react-router-dom 
  3. Backend services (managing data and users) -> appwrite 
  4. thirdparty text editor -> @tinymce/tinymce-react 
  5. -> html-react-parser 
  6. Third-Party-From (From) -> react-hook-form
  7. Css (styles) -> Tailwind 

step-1 -> Creating Environment Variable as in outer global file as .env and .env.sample -> using appwrite services Ids

step-2 -> Creating new project in app-write.io platform ->
         1.project setting -> copy:endpoint for URL , copy:projectId for projectId -> paste.env
         2.creating database -> copy:databaseId for DatabaseId -> paste .env
         3.creating collection -> copy:col_id for collectionid -> paste .env ,and
           ->setting->update permission for manipulation of data
         4.creating attributes in collection as need like title,content, image, userid ,status
         5.creating index in collection like status attribute
         7.creating bucket in project->storage and copy:bucketId            

step-3 -> creating config folder -> conf.js creating conf object for appwriteIds : converting string value of path

step-4 -> creating appwrite folder for backend services -> 
    1.Authentication service ->  (referencd from appwrite docs)
     creating appwrite folder -> auth.js
     creating AutheService class and returning its authobject
     import ClientClass Accountclass and create its new objects for authobject
     writing its methods by asynchronously creating in try and catch sysntax
     thisObject-> account
     createAccount
     login
     logout
     getuser
    2.services ->  (referencd from appwrite docs)
     creating appwrite folder -> config.js
     creating other service class and returning its service object
     import ClientClass DatabseClass storageclass and create its new objects for sericeobject of passing this.client
     writing its methods by asynchronously creating in try and catch sysntax
     thisObject-> 
          creating post by database new document
          updating post by updating document
          deleting post 
          getpost
          getPosts for using query only active status


setp-5 -> creating store folder for redux state management
         creating store by configuredstore in store.js
         creating slic in authSlice.js
         initialstate -> status, userData
         creating reducers-> login -> !status, userdata.action.payload and logout-> as it is
         export in slic.actions
         and export reducers for store to export 
         then provider in main.js provides store

step-6 -> 
         