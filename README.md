# CRUD Snippets
This web application was a school assignment with the aim to manage code [snippets](https://en.wikipedia.org/wiki/Snippet_(programming)). The web application use the Node.js platform, Express as the application framework, and Mongoose as the object data modeling (ODM) library for MongoDB. The application is server-side rendered with Handlebars.

## The web application
The application offers users to register and login into the application with a username and password. 
Sessions are used for authentication and authorization. 

The web application have full CRUD functionality regarding snippets. Users can create, read, update, and delete snippets. Anonymous users scan only view snippets. In addition to view snippets, authenticated can also create, edit, and delete their snippets. No one but the owner, the creator, of a snippet, can edit and delete the said snippet. Users are notified of what is happening by flash messages. 
